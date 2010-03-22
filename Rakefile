require "rubygems"
require "dm-core"

dir = File.dirname(__FILE__) + "/models/"
$:.unshift(dir)
Dir[File.join(dir, "*.rb")].each { |file| require File.basename(file) }

task :migrate do
  DataMapper.auto_migrate!
end
