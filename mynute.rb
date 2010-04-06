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

VERSION = "0.0.2"

set :haml, {:format => :html5 }

include Mynute::Core

configure do
  DataMapper::Logger.new($stdout, :debug)
  DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/mynute.db")
end

helpers do
  include Mynute::Helpers
end

get "/" do
  @entries = TimeEntry.paginate(:limit => 5, :order => :date.desc)
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
    @entries = TimeEntry.all(:order => :date.desc)
    haml :_grid, :layout => false
  else
    "fail"
  end
end

post "/time/:id" do
  entry = TimeEntry.get(params[:id])
  entry.user = User.get(params.delete(:user_id))
  entry.project = Project.get(params.delete(:project_id))
  entry.update(params)
  if entry.save
    @entries = TimeEntry.all(:order => :date.desc)
    haml :_grid, :layout => false
  else
    "fail"
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
  "{"\
  + "\"grid\":#{grid},"\
  + "\"pager\":#{pager_json(@entries.pager)}"\
  + "}"
end

get "/css/:stylesheet.css" do
  content_type "text/css", :charset => "utf-8"
  sass :"stylesheets/#{params[:stylesheet]}", :style => :compact
end
