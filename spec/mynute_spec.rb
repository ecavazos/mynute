require 'spec/spec_helper'
require 'base64'

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

  it 'test' do
    get '/', {}, auth_block('admin', 'admin')
    puts last_response.body
    puts @app.instance_variable_get(:@entries).nil?
    # @entries.nil?
  end

  it 'should protect /' do
    get '/'
    last_response.should_not be_ok
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
