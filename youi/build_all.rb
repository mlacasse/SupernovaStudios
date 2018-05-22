#!/usr/bin/env ruby
# © You i Labs Inc. 2000-2017. All rights reserved.

require 'optparse'
require 'ostruct'

class BuildAllOptions
    def self.parse(args)
        options = OpenStruct.new
        options.platform = nil
        options.build_directory = nil
        options.defines = {}
        options.target = nil
        options.version = nil
        options.args = Array.new
        
        platformList = ["Android", "Ios", "Linux", "Osx", "Ps4", "Roku4201en", "Tizen-Nacl", "Tvos", "Uwp", "Vs2013"]

        unless File.exist?("#{__dir__}/CMakeLists.txt")
            puts "ERROR: The directory '#{__dir__}' does not contain a CMakeLists.txt file."
            exit 2
        end

        options_parser = OptionParser.new do |opts|
            opts.banner = "Usage: build_all.rb [options]"

            opts.separator ""
            opts.separator "Arguments:"
            
            opts.on("-p", "--platform PLATFORM", String,
                    "(REQUIRED) The name of the platform to generate the project for.",
                    "  Supported platforms: #{platformList}") do |platform|
                if platformList.any? { |s| s.casecmp(platform)==0 }
                    options.platform = platform
                else
                    puts "ERROR: \"#{platform}\" is an invalid platform."
                    puts opts
                    exit 1
                end
            end

            opts.on("-g", "--generator GENERATOR", String,
                "The name of the generator to use.",
                "  (If omitted, the default generator for the host machine will be used.)",
                "  (When 'AndroidStudio' is specified for the generator and 'Android' is set for the platform, ",
                "   an Android Studio project will be generated.)",
                "Supported generators by platform:",
                "Android:",
                "  - AndroidStudio (default)",
                "iOS/tvOS:",
                "  - Xcode (default)",
                "PS4:",
                "  - Visual Studio 11 [2012]",
                "  - Visual Studio 12 [2013]",
                "  - Visual Studio 14 [2015] (default)",
                "  Note: The PS4 SDK including the Visual Studio plugin for the selected generator must be installed.",
                "Tizen-NaCl:",
                "  - Eclipse CDT4 - Ninja (default if installed)",
                "  - Eclipse CDT4 - Unix Makefiles (default without ninja)",
                "UWP:",
                "  - Visual Studio 14 Win64 [2015] (default)",
                "VS2013:",
                "  - Visual Studio 12 Win64 [2013] (default)",
                "  - Visual Studio 14 Win64 [2015]",
                "  - Visual Studio 15 Win64 [2017]",
                "Linux/OSX:",
                "  - Any generator supported by CMake. See cmake --help for details.",
                "  - OSX Default: Xcode",
                "  - Linux Default: Unix Makefiles") do |generator|
                options.generator = generator
            end

            opts.on("-b", "--build_directory DIRECTORY", String,
                "The directory in which the generated project files will be placed.") do |directory|
                options.build_directory = directory
            end

            opts.on("-t", "--target TARGET", String,
                "The target to execute during the build.",
                "  (If omitted, the ALL_BUILD target will be used by CMake.)",
                "  Standard targets for a You.i Engine project:",
                "    CMake Built-in:",
                "      - ALL_BUILD: Executes all targets unless the target has explictly been excluded from ALL_BUILD.",
                "      - ZERO_CHECK: Runs the CMake generation.",
                "    You.i Engine:",
                "      - CopyAssets: Copies the assets from the project's AE assets directory to the location required by the platform for execution.",
                "      - CleanAssets: Cleans up the assets which were copied by the CopyAssets target.",
                "      - ProcessLocalizationData: Processes localization data for the project by generating the translation files required by the project.",
                "      - Package: Packages the application for the specific platform. This target is only available for platforms which require a packaged application."
                ) do |target|
                options.target = target
            end

            opts.on("-d", "--define NAME=VALUE", String,
                "Add a defined variable and its value to pass along to CMake.") do |define_pair|
                
                key_value_pair = define_pair.split(/\s*=\s*/)
                if key_value_pair.length != 2
                    puts "Invalid format for -d: #{define_pair}"
                    puts opts
                    exit 1
                end

                options.defines[key_value_pair[0]] = key_value_pair[1]
            end

            opts.on("-v", "--version major.minor.patch.tweak", String,
                "The version number of the project",
                "  (Uses the format 'major[.minor[.patch[.tweak]]]')") do |version|
                options.version = version
            end

            opts.on("-a", "--arg BUILD_ARGUMENT", String,
                "Custom argument that can be passed to CMake when building.",
                "  (Multiple arguments on the command line are supported. They will be added after the '--' section",
                "   that will be passed to CMake.)") do |arg|
                options.args << arg
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
            mandatory = [:platform]
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
end

options = BuildAllOptions.parse(ARGV)

build_configs = [ "Debug", "Release" ]

if options.generator.nil?
    case options.platform
    when /osx/i
        options.generator = "Xcode"
    when /ios|tvos/i
        options.generator = "Xcode"
    when /UWP/i
        options.generator = "Visual Studio 14 Win64"
    when /vs2013/i
        options.generator = "Visual Studio 12 Win64"
    when /ps4/i
        options.generator = "Visual Studio 14"
    when /linux/i
        options.generator = "Unix Makefiles"
    when /Tizen-NaCl/i
        ninja = system('ninja', [:out, :err] => File::NULL)
        make = system('make', [:out, :err] => File::NULL)
        if ninja != nil
            options.generator = "Eclipse CDT4 - Ninja"
        elsif make != nil
            options.generator = "Eclipse CDT4 - Unix Makefiles"
        else
            puts "Could not find ninja or unix make. One of these generators must be installed to generate for Tizen-NaCl."
            exit 1
        end
    end
end

build_configs.each {|config|
    command = "ruby \"#{__dir__}/generate.rb\" -p #{options.platform} -c #{config}"

    if options.platform.match(/Android/i)
        options.generator = "AndroidStudio"
    end

    if !options.generator.nil?
        command << " -g \"#{options.generator}\""
    end

    source_dir = "#{__dir__}"
    if !options.build_directory.nil?
        build_dir = options.build_directory
    else
        build_dir = File.join("#{source_dir}", "build", "#{options.platform.downcase}")
    end

    if !options.generator.nil?
        unless options.generator.match(/(Visual Studio)|(AndroidStudio)|Xcode/)
            build_dir = File.join(build_dir, "#{config}")
        end
    end

    build_directory = " -b " << "\"#{File.absolute_path(build_dir)}\""
    command << build_directory

    if !options.version.nil?
        command << " -v #{options.version}"
    end

    defines_list = ""
    options.defines.each do |key,value|
        defines_list << "-d #{key}=\"#{value}\" "
    end
    command << " #{defines_list}"

    if system(command) == false
        abort()
    end

    puts ""
    puts ""

    command = "ruby \"#{__dir__}/build.rb\" -c #{config}"
    command << build_directory

    if !options.target.nil?
        command << " -t #{options.target}"
    end

    if options.args.length > 0
        options.args.each { |arg|
            command << " -a \"#{arg}\""
        }
    end

    if system(command) == false
        abort()
    end
}
