module Mynute
  module Core
    def pager_json(pager)
      json  = "<script>"\
            + "var pagerJson = { "\
            + "total: #{pager.total}, "\
            + "page: #{pager.page}, "\
            + "limit: #{pager.limit}, "\
            + "pageCount: #{pager.page_count} "\
            + "}; </script>"
    end 
  end
end