class User
  include DataMapper::Resource
  
  property :id,         Serial
  property :first_name, String
  property :last_name,  String
  
  def fullname
    first_name + " " + last_name
  end
end