require "rubygems"
require "dm-core"
require "lib/models"

DataMapper::Logger.new($stdout, :debug)
DataMapper.setup(:default, "sqlite3://#{File.dirname(__FILE__)}/mynute.db")
DataMapper.auto_migrate!

user1 = User.create({
  :first_name => "DJ",
  :last_name  => "Lance"
})

user2 = User.create({
  :first_name => "Bro",
  :last_name  => "Bee"
})

client1 = Client.create({
  :name => "Nike"
})

client2 = Client.create({
  :name => "Coke"
})

project1 = Project.create({
  :name   => "Website",
  :code   => "NWeb",
  :client => client1
})

project2 = Project.create({
  :name   => "Mobile App",
  :code   => "CMob",
  :client => client2
})

TimeEntry.create({
  :desc         => "Creating seed data",
  :date         => Date.today,
  :duration     => 1.5,
  :entry_type   => EntryType::Task,
  :billing_type => BillingType::Billable,
  :project      => project1,
  :user         => user1
})

TimeEntry.create({
  :desc         => "Working on spike code",
  :date         => Date.today,
  :duration     => 4.5,
  :entry_type   => EntryType::Task,
  :billing_type => BillingType::Billable,
  :project      => project2,
  :user         => user2
})

