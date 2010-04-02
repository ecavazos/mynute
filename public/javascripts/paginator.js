var Mynute = Mynute || {};

Mynute.paginator = {

  paginate: function(params) {
    
    // params = { total: 14, page: 1, limit: 5, pageCount: 3 }; 
    var _params = params || {},
        _window = 5,
        _table  = $(".entries"), 
        _pages  = [];

    function startVal(end) {
      if (_params.pageCount < 10 || end - 10 < 0)
        return 1;
        
      return end - 10;
    }

    function endVal() {
      if (_params.pageCount < 10) return _params.pageCount;
      var end = (_params.page < _window) ? 10 : _params.page + _window;
      return (end > _params.pageCount) ? _params.pageCount : end;
    }

    function firstLink() {
      if (_params.page > 0)
        return '<a href="">First</a>';

      return '<span>First</span>';
    }

    function prevLink() {
      if (_params.page > 0)
        return '<a href="">« Previous</a>';

      return '<span>« Previous</span>';
    }

    function link(page) {
      if (page == _params.page)
        return '<span class="current">' + page + '</span>';

      return '<a href="">' + page + '</a>';
    }

    function nextLink() {
      if (_params.pageCount <= _params.page + 1)
        return '<span>Next »</span>';

      return '<a href="">Next »</a>';
    }

    function lastLink() {
      if (_params.pageCount <= _params.page)
        return '<span>Last</span>';

      return '<a href="">Last</a>';
    }

    function pagerClickHandler(e) {
        var page = $(this).text();

        if (page.match(/first/i)) {
            page = 0;
        } else if (page.match(/previous/i)) {
            page = _params.page - 1;
        } else if (page.match(/next/i)) {
            page = _params.page + 1;
        } else if (page.match(/last/i)) {
            page = _params.numberOfPages - 1;
        } else {
            page = page - 1;
        }

        var postData = {
            'sort-by': _params.sortBy,
            'alpha': _params.alpha,
            'page': page,
            'page-size': _params.pageSize
        };

        var url = '/entries?' + $.param(postData);
        location.href = url;

        e.preventDefault();
    }

    function statusMarkup() {
      return '<div id="status">Showing page ' + _params.page + ' of ' + _params.pageCount + '</div>';
    }

    function pagerMarkup(pages) {
      if (_params.pageCount == 1) return '<div id="pager"></div>';

      return '<div id="pager">' + pages.join(' ') + '</div>';
    }

    function init() {

      if (_params.total == 0) {
        // _table.replaceWith('<div id="no-results">no results</div>');
        return;
      }

      var end = endVal();
      var start = startVal(end);

      _pages.push(firstLink());
      _pages.push(prevLink());

      for (var i = start; i <= end; i++)
        _pages.push(link(i));

      _pages.push(nextLink());
      _pages.push(lastLink());

      _table.after(pagerMarkup(_pages));
      $("#pager").after(statusMarkup());

      $("#pager a").bind("click", pagerClickHandler);
    }

    init();
  }
};