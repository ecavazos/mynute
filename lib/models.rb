dir = "lib/models/"
$:.unshift(dir)
Dir[File.join(dir, "*.rb")].each { |file| require File.basename(file) }