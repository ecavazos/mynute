require "spec/spec_helper"
require "dm-core"
require "lib/paginator"

class Poop
  include DataMapper::Resource
  include Paginator
  property :id, Serial
  property :num, Integer
end

DataMapper.setup(:default, "sqlite3::memory:")
Poop.auto_migrate!

describe Paginator do
  before(:all) do
    Poop.all.destroy!
    77.times{|i| Poop.create(:num => i + 1)}
  end
  
  it "should get number of total (unpaged) records" do
    Poop.paginate.pager.total.should == 77
  end
  
  it "should get first page when no page is specified" do
    Poop.paginate.pager.page.should == 1
  end
  
  it "should get page 3" do
    Poop.paginate(:page => 3).pager.page.should == 3
  end

  it "should limit by 10 when limit is not specified" do
    Poop.paginate.pager.limit.should == 10
  end
  
  it "should have a limit of 5" do
    Poop.paginate(:page => 2, :limit => 5).pager.limit.should == 5
  end
  
  it "should set offset to 20" do
    Poop.paginate(:page => 3).pager.offset.should == 20
  end
  
  it "should order by id.desc when no order is specified" do
    page = Poop.paginate(:limit => 3)
    page[0].id.should == 77
    page[1].id.should == 76
    page[2].id.should == 75
  end
  
  it "should order by num asc" do
    page = Poop.paginate(:order => :num.asc, :limit => 3)
    page[0].num.should == 1
    page[1].num.should == 2
    page[2].num.should == 3
  end
  
  it "should have 8 pages" do
    Poop.paginate.pager.page_count.should == 8
  end
  
  it "should have 7 items on last page" do
    Poop.paginate(:page => 8).count.should == 7
  end
  
  it "should have 1 as the previous page when current page is 2" do
    Poop.paginate(:page => 2).pager.prev_page.should == 1
  end
  
  it "should have nil previous page when on first page" do
    Poop.paginate.pager.prev_page.should be_nil
  end
  
  it "should have 6 as the next page when current page is 5" do
    Poop.paginate(:page => 5).pager.next_page.should == 6
  end
  
  it "should have nil next page when on last page" do
    Poop.paginate(:page => 8).pager.next_page.should be_nil
  end
end