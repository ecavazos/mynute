require "lib/paginator"

class TimeEntry
  include DataMapper::Resource
  include Paginator
  
  property :id,           Serial
  property :desc,         String
  property :date,         Date
  property :duration,     Float
  property :created_at,   DateTime
  property :entry_type,   String
  property :billing_type, String
  
  belongs_to :user
  belongs_to :project
  
  def display_date
    self.date.strftime("%m/%d/%Y")
  end
  
  def parse_date(date)
    self.date = date and return if date.is_a?(Date)
    date.gsub!(/-/, "/")
    if date.match(/\d{1,2}\/\d{1,2}\/\d{2}$/)
      fmt = "%m/%d/%y"
    else
      fmt = "%m/%d/%Y"
    end
    self.date = Date.strptime(date, fmt)
  end
  
  before :save do
    parse_date(self.date)
  end
end