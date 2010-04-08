require "rubygems"
require "sinatra"
require "haml"
require "sass"
require "json"
require "dm-core"
require "dm-serializer/to_json"
require "lib/models"
require "lib/core"
require "lib/helpers"

VERSION = "0.0.4"

set :haml, {:format => :html5 }

configure do
  DataMapper::Logger.new($stdout, :debug)
  DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/mynute.db")
end

helpers do
  include Mynute::Core
  include Mynute::Helpers
end

get "/" do
  @entries = TimeEntry.page_default
  @pager_json = pager_html(@entries.pager)
  haml :home
end

get "/time/:id" do
  content_type :json
  TimeEntry.get(params[:id]).to_json(:methods => [:user, :project])
end

post "/time" do
  entry = TimeEntry.new(params)
  if entry.save
    @entries = TimeEntry.page_default
    haml :_grid, :layout => false
  else
    error 500, "Save or update failed"
  end
end

post "/time/:id" do
  entry = TimeEntry.get(params[:id])
  params[:user] = User.get(params.delete("user_id"))
  params[:project] = Project.get(params.delete("project_id"))
  if entry.update(params)
    @entries = TimeEntry.page_default
    haml :_grid, :layout => false
  else
    error 500, "Save or update failed"
  end
end

delete "/time/:id" do
  entry = TimeEntry.get(params[:id])
  entry.destroy!
  @entries = TimeEntry.all(:order => :date.desc)
  haml :_grid, :layout => false 
end

get "/entries" do
  content_type :json
  @entries = TimeEntry.paginate(:page => params[:page], :limit => params[:limit], :order => :date.desc)
  grid = escape_html(haml(:_grid, :layout => false)).to_json
  page_clicked_json(grid, @entries.pager)
end

get "/css/:stylesheet.css" do
  content_type "text/css", :charset => "utf-8"
  sass :"stylesheets/#{params[:stylesheet]}", :style => :compact
end

