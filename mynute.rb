require "rubygems"
require "sinatra"
require "haml"
require "sass"
require "dm-core"
require "lib/models"
require "lib/helpers"

VERSION = "0.0.1"

set :haml, {:format => :html5 }

configure do
  DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/mynute.db")
end

helpers do
  include Mynute::Helpers
end

get "/" do
  @entries = TimeEntry.all
  haml :home
end

get "/time/:id" do
  TimeEntry.get(params[:id])
end

post "/time" do
  entry = TimeEntry.new(params)
  if entry.save
    entry
  else
    "fail"
  end
end

post "/time/:id" do
  entry = TimeEntry.get(params[:id])
  entry.update(params)
  if entry.save
    entry
  else
    "fail"
  end
end

delete "/time/:id" do
  entry = TimeEntry.get(params[:id])
  entry.destroy!
end

get '/css/:stylesheet.css' do
  content_type 'text/css', :charset => 'utf-8'
  sass :"stylesheets/#{params[:stylesheet]}", :style => :compact
end