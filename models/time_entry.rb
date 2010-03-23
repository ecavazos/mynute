class TimeEntry
  include DataMapper::Resource
  
  property :id,           Serial
  property :desc,         String
  property :date,         Date
  property :duration,     Float
  property :created_at,   DateTime
  property :entry_type,   String
  property :billing_type, String
  
  belongs_to :user
  belongs_to :project
end