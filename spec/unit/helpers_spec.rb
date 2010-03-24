require "spec/spec_helper"
require "lib/helpers"
require "ostruct"

describe Mynute::Helpers do
  
  let :helper do
    Class.new do
      extend Mynute::Helpers
    end
  end
  
  it "should read the constatnts of class into option tags" do
    helper.should_receive(:haml_tag).exactly(3).times
    helper.constants_to_options(BillingType)
  end
  
  describe "lookup_options" do
    let :mock_entity_class do
      Class.new do
        def self.all
          [OpenStruct.new({:id => 1, :name => "foo", :name2 => "bar"}),
           OpenStruct.new({:id => 2, :name => "bar", :name2 => "foo"})
          ]
        end
      end
    end
  
    it "should read all records into option tags" do
      helper.should_receive(:haml_tag).with(:option, "foo", {:value => 1})
      helper.should_receive(:haml_tag).with(:option, "bar", {:value => 2})
      helper.lookup_options(mock_entity_class)
    end
    
    it "should accept a custom attribute name for display text" do
      helper.should_receive(:haml_tag).with(:option, "bar", {:value => 1})
      helper.should_receive(:haml_tag).with(:option, "foo", {:value => 2})
      helper.lookup_options(mock_entity_class, :name2)
    end
  end
  
end