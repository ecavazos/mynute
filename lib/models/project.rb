class Project
  include DataMapper::Resource
  
  property :id,   Serial
  property :name, String
  property :code, String

  belongs_to :client
end