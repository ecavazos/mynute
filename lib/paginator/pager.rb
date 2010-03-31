module Paginator
  class Pager
    attr_reader :total, 
                :page, 
                :limit, 
                :offset, 
                :page_count, 
                :next_page,
                :prev_page

    def initialize(options = {})
      @total = options[:total].to_i
      @page = options[:page].to_i
      @limit = options[:limit].to_i
      @offset = options[:offset].to_i
      @page_count = calculate_page_count
      @next_page = page + 1 unless page == page_count
      @prev_page = page - 1 unless page == 1
    end

    private

    def calculate_page_count
      (total.to_i / limit.to_f).ceil
    end
  end
end