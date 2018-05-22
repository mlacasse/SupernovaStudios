#!/usr/bin/env ruby
# © You i Labs Inc. 2000-2017. All rights reserved.

require 'optparse'
require 'ostruct'

class ReinstallOptions
    def self.parse(args)
        options = OpenStruct.new
        options.config = "Debug"
        options.build_directory = nil
        options.target = nil
        options.app_name = "EmptySample"
        options.start = false
        options.package = "tv.youi.EmptySample"
        options.uninstall_first = false
        
        configurationList = ["Debug","Release"]

        options_parser = OptionParser.new do |opts|
            opts.on("-b", "--build_directory DIRECTORY", String,
                "(REQUIRED) The directory containing the built application.",
                "  (For Android builds, this must be the folder where the generated Android Studio project exists.",
                "  (For iOS builds, this will be the same build directory given to the 'generate.rb' and 'build.rb' scripts when they are run.)") do |directory|

                unless Dir.exist?(directory)
                    puts "ERROR: The given build directory '#{directory}' does not exist. Make sure you run the 'generate.rb' script first."
                    exit 1
                end

                options.build_directory = directory
            end

            opts.on("-c", "--config CONFIGURATION", String,
                "The configuration type #{configurationList} to install to the device.") do |config|
                if configurationList.any? { |s| s.casecmp(config)==0 }
                    options.config = config
                else
                    puts "ERROR: \"#{config}\" is an invalid configuration type."
                    puts opts
                    exit 1
                end
            end

            opts.on("-s", "--start", 
                "Attempts to auto-start the application on the device after it has been installed.",
                "  (For iOS builds, the application will be launched with the LLDB debugger.)",
                "  (For Android builds, the application will be launched through an intent.)") do
                options.start = true
            end

            opts.on("-p", "--package_name PACKAGE", String,
                "The name of the package used by the application.",
                "  (Only used on iOS platform during uninstallation. If omitted, defaults to 'tv.youi.<project_name>'.)") do |package|
                options.package = package
            end

            opts.on("--appname NAME",
                "The name of the .app folder.", String,
                "  (This argument is only required when using out of source builds on the iOS platform.)",
                "  (If omitted, defaults to the name of the folder this script exists in. This is usually the name of the project itself.)") do |app_name|
                options.app_name = app_name
            end

            opts.on("-u", "--uninstall_first",
                "Uninstalls the application on the device before attempting to install the new application.") do
                options.uninstall_first = true
            end

            opts.on_tail("-h", "--help", "Show usage and options list") do
                puts opts
                exit 1
            end            
        end

        if args.count == 0
            puts options_parser
            exit 1
        end

        begin
            options_parser.parse!(args)
            mandatory = [ :build_directory ]
            missing = mandatory.select { |param| options[param].nil? }
            raise OptionParser::MissingArgument, missing.join(', ') unless missing.empty?

            options
        rescue OptionParser::ParseError => e
            puts e
            puts ""
            puts options_parser
            exit 1
        end
    end

    def self.reinstall(options)
        case RUBY_PLATFORM
        when /mswin|msys/i
            gradle_prefix = ""
            gradle_suffix = ".bat"
        else
            gradle_prefix = "./"
            gradle_suffix = ""    
        end

        gradle_filename = File.join(options.build_directory, "project", "#{gradle_prefix}gradlew#{gradle_suffix}")
        if File.exist?(gradle_filename)
            options.build_directory = File.join(options.build_directory, "project")
            options.gradle_filename = gradle_filename
            options.gradle_prefix = gradle_prefix
            options.gradle_suffix = gradle_suffix
            
            ReinstallOptions.reinstall_android(options)
        else
            cache_file = File.join(options.build_directory, "CMakeCache.txt")
            unless File.exist?(cache_file)
                puts "The specified build directory '#{options.build_directory}' does not contain a generated CMake project."
                puts "Run generate.rb to create a project."
                abort
            end

            cache_contents = File.read(cache_file)
            unless cache_contents.match(/^(YI_PLATFORM:)[A-Z]+(=ios)$/i)
                puts "ERROR: Only iOS and Android can use the reinstall.rb script."
                abort
            end

            script_path = File.join(__dir__, "build.rb")
            unless system("ruby \"#{script_path}\" -b #{options.build_directory} -c #{options.config}")
                abort
            end

            ReinstallOptions.reinstall_ios(options)
        end
    end

    def self.reinstall_android(options)
        Dir.chdir(options.build_directory) {
            if options.uninstall_first
                command = "#{options.gradle_prefix}gradlew#{options.gradle_suffix} uninstall#{options.config}"
                if system(command) == false
                    abort
                end
            end

            command = "#{options.gradle_prefix}gradlew#{options.gradle_suffix} install#{options.config}"

            if system(command) == false
                abort
            end

            if options.start
                command = "#{options.gradle_prefix}gradlew#{options.gradle_suffix} startApplication"
                if system(command) == false
                    abort
                end
            end
        }
    end

    def self.reinstall_ios(options)
        base_path = File.join(options.build_directory, "#{options.config}-iphoneos")
        bundle_pathname = File.join(base_path, "#{options.app_name}.app")

        unless Dir.exist?(bundle_pathname)
            puts "ERROR:"
            puts "The '#{options.app_name}.app' does not exist within '#{base_path}'."
            puts "Check the location of the .app that you are trying to deploy and make sure it has been built properly."
            puts ""
            puts "If the project has been built out of source, make sure to pass the application name using the '--appname' argument."
            abort
        end

        pid = Process.spawn("ios-deploy -V > /dev/null")
        Process.waitpid(pid)

        unless $?.exitstatus == 0
            puts "Installing the 'ios-deploy' tool with HomeBrew..."

            unless system("brew install ios-deploy")
                abort
            end
        end

        # Check for connected devices
        pid = Process.spawn("ios-deploy -c|grep Found")
        Process.waitpid(pid)

        unless $?.exitstatus == 0
            puts "---- No devices connected"
            abort
        end

        # Uninstalling the application from the device.
        if options.uninstall_first
            puts "Attempting to uninstall application with package name '#{options.package}' from device..."
            pid = Process.spawn("ios-deploy --uninstall_only -1 #{options.package}")
            Process.waitpid(pid)

            unless $?.exitstatus == 0
                abort
            end
        end

        # Installing the application to the device.
        command = "ios-deploy"
        command << " --bundle #{bundle_pathname}"

        if options.start
            command << " --debug"
        end

        pid = Process.spawn(command)
        Process.waitpid(pid)

        unless $?.exitstatus == 0
            abort
        end
    end
end

options = ReinstallOptions.parse(ARGV)
ReinstallOptions.reinstall(options)
