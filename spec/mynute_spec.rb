require 'spec/spec_helper'
require 'base64'
require 'mocha'

describe "Mynute" do
  include Rack::Test::Methods

  before(:each) do
    DataMapper.setup(:default, "sqlite3::memory:")
    DataMapper.auto_migrate!
  end

  def app
    @app ||= Sinatra::Application
  end

  it 'should respond to /' do
    get '/', {}, auth_block('admin', 'admin')
    last_response.should be_ok
    last_response.status.should == 200
  end

  it 'should protect /' do
    get '/'
    last_response.should_not be_ok
    last_response.status.should == 401
  end

  it 'should get time by id' do
    get '/time/1', {}, auth_block('admin', 'admin')
    last_response.should be_ok
  end

  it 'should protect /time/:id' do
    get '/time/1'
    last_response.status.should == 401
  end
end

private

def auth_block(username, password)
  {'HTTP_AUTHORIZATION'=> encode_credentials(username, password)}
end

def encode_credentials(username, password)
  "Basic " + Base64.encode64("#{username}:#{password}")
end
