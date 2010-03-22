require "rubygems"
require "sinatra"
require "haml"
require "sass"
require "time"
require "dm-core"

set :haml, {:format => :html5 }

configure do
  DataMapper.setup(:default, "sqlite3::memory:")
end