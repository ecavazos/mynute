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

    it "should convert a time entry record into CSV format" do
      entry = TimeEntry.new
      entry.user = User.new(:first_name => "DJ", :last_name => "Lance")
      entry.project = Project.new(:name => "Blah", :client => Client.new(:name => "Moono"))
      entry.entry_type = "Task"
      entry.billing_type = "Billable"
      entry.date = Date.new(2010, 4, 13)
      entry.duration = 5.5
      entry.desc = "I like \"bugz\"!"

      expected = "\"DJ Lance\",\"Task\",\"Moono\",\"Blah\",\"Billable\","\
                 "\"04/13/2010\",\"5.5\",\"I like \"\"bugz\"\"!\"\n"

      core.to_csv([entry]).should == expected
    end

    it "should convert a collection of time entry records into CSV format"
  end
  
  describe "escape_csv" do
    it "should escape quotation marks" do
      core.escape_csv("I \"love\" codez!").should == "\"I \"\"love\"\" codez!\""
    end
  end

end
