require "rubygems"
require "sinatra"
require "haml"
require "sass"
require "dm-core"
require "lib/models"
require "lib/helpers"

set :haml, {:format => :html5 }

configure do
  DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/mynute.db")
end

get "/" do
  @entries = TimeEntry.all
  haml :home
end