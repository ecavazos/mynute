require "rubygems"
require "spec"
require "spec/autorun"
require "spec/interop/test"
require "sinatra"
require "rack/test"
require "mynute"

# set test environment
set :environment, :test
set :run, false
set :raise_errors, true
set :logging, false
set :views, 'views'

