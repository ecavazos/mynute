require "rubygems"
require "dm-core"
require "lib/models"

task :migrate do
  DataMapper::Logger.new($stdout, :debug)
  DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/mynute.db")
  DataMapper.auto_migrate!
  
  user1 = User.new({
    :first_name => "DJ",
    :last_name  => "Lance"
  })
  user1.save
  
  user2 = User.new({
    :first_name => "Bro",
    :last_name  => "Bee"
  })
  user2.save
  
  client1 = Client.new({
    :name => "Nike"
  })
  client1.save
  
  client2 = Client.new({
    :name => "Coke"
  })
  client2.save
  
  project1 = Project.new({
    :name   => "Website",
    :code   => "NWeb",
    :client => client1
  })
  project1.save
  
  project2 = Project.new({
    :name   => "Mobile App",
    :code   => "CMob",
    :client => client2
  })
  project2.save
  
  TimeEntry.new({
    :desc         => "Creating seed data",
    :date         => Date.today,
    :duration     => 1.5,
    :entry_type   => EntryType::Task,
    :billing_type => BillingType::Billable,
    :project      => project1,
    :user         => user1
  }).save
  
  TimeEntry.new({
    :desc         => "Working on spike code",
    :date         => Date.today,
    :duration     => 4.5,
    :entry_type   => EntryType::Task,
    :billing_type => BillingType::Billable,
    :project      => project2,
    :user         => user2
  }).save
end
