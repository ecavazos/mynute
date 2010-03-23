require "rubygems"
require "sinatra"
require "haml"
require "sass"
require "dm-core"

dir = File.dirname(__FILE__) + "/models/"
$:.unshift(dir)
Dir[File.join(dir, "*.rb")].each { |file| require File.basename(file) }

set :haml, {:format => :html5 }

configure do
  DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/mynute.db")
end

get "/" do
  @entries = TimeEntry.all
  haml :home
end