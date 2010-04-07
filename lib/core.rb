module Mynute
  module Core
    def pager_json(pager)
      {
        :total     => pager.total,
        :page      => pager.page,
        :limit     => pager.limit,
        :pageCount => pager.page_count
      }.to_json
    end

    def pager_html(pager)
      json  = "<script>var pagerJson = #{pager_json(pager)}; </script>"
    end

    def page_clicked_json(grid, pager)
      "{ \"grid\":#{grid},"\
      + "\"pager\":#{pager_json(pager)}}"
    end
  end
end
