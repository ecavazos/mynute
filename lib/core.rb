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

    def to_csv(entries)
      csv = ""
      entries.each do |e|
        csv += "#{escape_csv(e.user.fullname)},"\
        "#{escape_csv(e.entry_type)},"\
        "#{escape_csv(e.project.client.name)},"\
        "#{escape_csv(e.project.name)},"\
        "#{escape_csv(e.billing_type)},"\
        "#{escape_csv(e.display_date)},"\
        "#{escape_csv(e.duration)},"\
        "#{escape_csv(e.desc)}\n"\
      end
      csv.to_s
    end

    def escape_csv(value)
      "\"#{value.to_s.gsub(/"/, '""')}\""
    end
  end
end
