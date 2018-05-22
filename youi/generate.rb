#!/usr/bin/env ruby
# © You i Labs Inc. 2000-2017. All rights reserved.

require 'optparse'
require 'ostruct'

class GenerateOptions
    def self.parse(args)
        options = OpenStruct.new
        options.platform = nil
        options.build_directory = nil
        options.defines = { "YI_LOCAL_JS" => "0", "YI_LOCAL_JS_INLINE" => "0" }

        platformList = ["Android", "Ios", "Linux", "Osx", "Ps4", "Roku4201en", "Tizen-Nacl", "Tvos", "Uwp", "Vs2013"]
        configurationList = ["Debug","Release"]

        unless File.exist?(File.join("#{__dir__}", "CMakeLists.txt"))
            puts "ERROR: The directory '#{__dir__}' does not contain a CMakeLists.txt file."
            exit 2
        end

        options_parser = OptionParser.new do |opts|
            opts.banner = "Usage: generate.rb [options]"

            opts.separator ""
            opts.separator "Arguments:"

            opts.on("-p", "--platform PLATFORM", String,
                "(REQUIRED) The name of the platform to generate the project for.",
                "  Supported platforms: #{platformList}") do |platform|
                if platformList.any? { |s| s.casecmp(platform)==0 }
                    options.platform = platform
                    options.defines["YI_PLATFORM:INTERNAL"] = platform
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
                "Roku4201EN:",
                "  - Ninja (default if installed)",
                "  - Unix Makefiles (default without ninja)",
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

            opts.on("-c", "--config CONFIGURATION", String,
                "The configuration type #{configurationList} to send to the generator.",
                "  (This is only required for generators that do not support multiple configurations.)") do |config|
                if configurationList.any? { |s| s.casecmp(config)==0 }
                    options.defines["CMAKE_BUILD_TYPE"] = config
                else
                    puts "ERROR: \"#{config}\" is an invalid configuration type."
                    puts opts
                    exit 1
                end
            end

            opts.on("-v", "--version major.minor.patch.tweak", String,
                "The version number of the project",
                "  (Uses the format 'major[.minor[.patch[.tweak]]]')") do |version|
                options.defines["YI_VERSION_NUMBER"] = version
            end

            opts.on("-l", "--local",
                "If included, JS bundles will be packaged locally, instead of fetched from a yarn server.") do
                options.defines["YI_LOCAL_JS"] = "1"
            end
                
            opts.on("-i", "--inline",
                "If included, JS bundles will be compiled directly into source code, instead of fetched from a yarn server.") do
                options.defines["YI_LOCAL_JS"] = "1"
                options.defines["YI_LOCAL_JS_INLINE"] = "1"
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

            return options
        rescue OptionParser::ParseError => e
            puts e
            puts ""
            puts options_parser
            exit 1
        end
    end

    def self.find_engine_dir_in_list(dirs)
        if dirs == nil || dirs.length == 0
            puts "ERROR: A non-empty list of directories must be passed to 'find_engine_dir_in_list'."
            abort
        end

        dirs.each { |d|
            config_filepath = File.absolute_path(File.join(d, "YouiEngineConfig.cmake"))
            if File.exist?(config_filepath)
                return d
            end
        }

        return nil
    end

    def self.get_engine_dir()
        engine_dir = ""
        unless ENV.has_key?("YOUIENGINE_HOME")
            engine_dir = find_engine_dir_in_list([
                File.join(__dir__, ".."),
                File.join(__dir__, "..", ".."),
                File.join(__dir__, "..", "..", ".."),
                File.join(__dir__, "..", "..", "..", "..")
            ])

            unless engine_dir != nil
                puts "ERROR: Could not locate an installation of You.i Engine. Please add the"
                puts "YOUIENGINE_HOME variable to your environment and point it to the installation"
                puts "of You.i Engine you would like to use."
                abort
            end
        else
            engine_dir = find_engine_dir_in_list([ ENV["YOUIENGINE_HOME"] ])

            unless engine_dir != nil
                puts "ERROR: Could not locate the installation of You.i Engine at '#{ENV["YOUIENGINE_HOME"]}'. Ensure that"
                puts "the path provided in the YOUIENGINE_HOME environment variable is correct."
                abort
            end
        end

        return File.absolute_path(engine_dir)
    end

    def self.create_command(options)
        case options.platform
        when /Android/i
            return GenerateOptions.create_android_command(options)
        end

        return GenerateOptions.create_cmake_command(options)
    end

    def self.create_android_command(options)
        engine_dir = GenerateOptions.get_engine_dir()
        source_dir = "#{__dir__}"
        build_dir = File.join("#{source_dir}", "build", "#{options.platform.downcase}")
        if !options.build_directory.nil?
            build_dir = options.build_directory
        end
        build_dir = File.absolute_path(build_dir)

        unless options.defines.has_key?("YI_PROJECT_NAME")
            options.defines["YI_PROJECT_NAME"] = File.basename(File.expand_path("#{__dir__}/../"))
        end

        command = "cmake"
        command << " -DYouiEngine_DIR=\"#{engine_dir}\""
        command << " -DYI_PROJECT_DIR=\"#{source_dir}\""
        command << " -DYI_OUTPUT_DIR=\"#{build_dir}\""
        command << " -DYI_JAVA_SOURCE_DIR=\"" << File.join("#{source_dir}", "build", "android") << "\""
        command << " -DYI_JNI_LIBS_DIRS=\"" << File.join(engine_dir, "react", "react-native-youiengine", "dist", "android", "jniLibs") << "\""
        
        cmake_defines = ""
        options.defines.each do |key,value|
            cmake_defines << " -D#{key}=\"#{value}\""
        end
        command << "#{cmake_defines}"

        command << " -P \"#{File.join("#{engine_dir}", "cmake", "Modules", "YiGenerateAndroidStudioProject.cmake")}\""
        return command
    end

    def self.create_cmake_command(options)
        engine_dir = GenerateOptions.get_engine_dir()

        case options.platform
        when /ps4/i
            # PS4 uses the built-in version of CMake, so we need to reference that
            # version instead of the standard one installed on the host machine.
            command = "\"#{File.absolute_path(File.join(engine_dir, "tools", "build", "cmake", "bin", "cmake.exe"))}\""
        else
            command = "cmake "
        end

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
            when /roku4201en/i
                ninja = system('ninja', [:out, :err] => File::NULL)
                make = system('make', [:out, :err] => File::NULL)
                if ninja != nil
                    options.generator = "Ninja"
                elsif make != nil
                    options.generator = "Unix Makefiles"
                else
                    puts "Could not find ninja or unix make. One of these generators must be installed to generate for Roku4201EN."
                    exit 1
                end
            end
        end

        unless options.generator.match(/(Visual Studio)|Xcode/)
            unless options.defines.has_key?("CMAKE_BUILD_TYPE")
                options.defines["CMAKE_BUILD_TYPE"] = "Debug"
            end
        end

        source_dir = "#{__dir__}"
        build_dir = File.join("#{source_dir}", "build", "#{options.platform.downcase}")

        if !options.build_directory.nil?
            build_dir = options.build_directory
        elsif !options.generator.match(/(Visual Studio)|Xcode/)
            build_dir = File.join(build_dir, "#{options.defines["CMAKE_BUILD_TYPE"]}")
        end
        build_dir = File.absolute_path(build_dir)

        command << "\"-B#{build_dir}\" \"-H#{source_dir}\""

        unless options.generator.nil?
            command << " -G \"#{options.generator}\""
        end

        if options.platform.match(/vs2013/i)
            command << " -T v120"
        end

        unless options.defines.has_key?("CMAKE_TOOLCHAIN_FILE")
            toolchain_platform = ""
            platform_sub_values = options.platform.split("-")

            platform_sub_values.each do |value|
                toolchain_platform << value.capitalize
            end

            toolchain_subpath = File.join("cmake", "Toolchain", "Toolchain-" + toolchain_platform + ".cmake")

            toolchain_file = File.join(__dir__, toolchain_subpath)
            unless File.exist?(toolchain_file)
                toolchain_file = File.join(engine_dir, toolchain_subpath)
            end

            if File.exist?(toolchain_file)
                options.defines["CMAKE_TOOLCHAIN_FILE"] = toolchain_file
            end
        end

        cmake_defines = ""
        options.defines.each do |key,value|
            cmake_defines << " -D#{key}=\"#{value}\""
        end
        command << "#{cmake_defines}"

        return command
    end
end

options = GenerateOptions.parse(ARGV)
command = GenerateOptions.create_command(options)

puts "#=============================================="
puts "CMake Generator command line:"
puts "  #{command}"
puts ""
puts "Platform: #{options.platform}"

if !options.generator.nil?
    puts "Generator: #{options.generator}"
end
puts ""

if options.defines.length > 0
    puts "Defines:"
    options.defines.each do |key,value|
        puts "  - #{key}: #{value}"
    end
end

puts "#=============================================="

command_result = system(command)
if command_result == false || command_result == nil
    if command_result == nil
        puts "Generation failed -- could not execute cmake command. Ensure that cmake is installed and available in your PATH."
    end
    abort()
end
