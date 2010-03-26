require "spec/spec_helper"
require "lib/models/time_entry"

describe TimeEntry do
  describe "parse_date" do
    let :entry do
      TimeEntry.new
    end
    
    it "should parse USA date string (mm/dd/yyyy) into a valid Date object" do
      entry.parse_date("3/25/2010")
      entry.date.should == Date.new(2010, 3, 25)
    end
  
    it "should parse USA date string (mm/dd/yy) into a valid Date object" do
      entry.parse_date("3/25/10")
      entry.date.should == Date.new(2010, 3, 25)
    end
    
    it "should set and return without parsing when given a date object" do
      dt = Date.new(2010, 3, 25)
      entry.parse_date(dt)
      entry.date.should eql(dt)
    end
  end
end