require "spec/spec_helper"
require "dm-core"
require "lib/models.rb"
require "lib/core"

describe Mynute::Core do

  let :core do
    Class.new do
      extend Mynute::Core
    end
  end

  describe "to_csv" do

    it "should convert a time entry record into CSV" do
      entry = TimeEntry.new
      entry.user = User.new(:first_name => "DJ", :last_name => "Lance")
      entry.project = Project.new(:name => "blah", :client => Client.new(:name => "moono"))
      entry.entry_type = "Task"
      core.to_csv([entry]).should == ["DJ Lance,Task,"]
    end

  end

end
