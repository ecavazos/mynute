require "paginator/pager"

module Paginator
  
  def self.included(base)
    base.extend ClassMethods
  end
  
  module ClassMethods
    def paginate(options = {})
      options = init_options(options)
      page = options.delete :page
      query = options.dup
    
      scope = scoped_query(options = {
        :limit => options[:limit],
        :offset => options[:offset],
        :order => [options[:order]]
      }.merge(query))
    
      collection = new_collection(scope)
      options.merge! :total => calculate_total_records(query), :page => page
      collection.class.send(:attr_accessor, :pager)
      collection.pager = Pager.new(options)
      collection
    end
  
    private
    
    def init_options(options)
      default = {
        :page => 1,
        :limit => 10,
        :order => :id.desc
      }
    
      options[:page] = options[:page].to_i > 0 ? options[:page] : default[:page]
      options[:limit] = (options[:limit] || default[:limit]).to_i
      options[:offset] = options[:limit] * (options[:page] - 1)
      options[:order] = options[:order] || default[:order]
      
      options
    end
    
    def calculate_total_records(query)
      query.delete :page
      query.delete :limit
      query.delete :offset
      collection = new_collection(scoped_query(query))
      collection.count.to_i
    end
  end
end