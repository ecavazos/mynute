var Mynute = Mynute || {};

// require: loader.js

Mynute.paginator = {

  paginate: function(params) {
    
    // params = { total: 14, page: 1, limit: 5, pageCount: 3 }; 
    var _params = params || {},
        _self   = this,
        _window = 5,
        _table  = ".entries", 
        _status = "#status",
        _pager  = "#pager",
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
      if (_params.page > 1)
        return '<a href="">First</a>';

      return '<span>First</span>';
    }

    function prevLink() {
      if (_params.page > 1)
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

    function validatePageNumber(page) {
      if (page.match(/first/i)) {
        return 1;
      } else if (page.match(/previous/i)) {
        return _params.page - 1;
      } else if (page.match(/next/i)) {
        return _params.page + 1;
      } else if (page.match(/last/i)) {
        return _params.pageCount;
      } else {
        return page;
      }
    }

    function unescapeHtml(html) {
      var node = document.createElement('div');
      node.innerHTML = html;
      if (node.innerText) return node.innerText; // ie
      return node.textContent; // real browsers
    }

    function pagerClickHandler(e) {
      e.preventDefault();
      var page = validatePageNumber($(this).text());

      Mynute.loader.show($(_table));

      var data = {
        page: page,
        limit: 5
      };

      $.get("/entries", data, function (data, textStatus) {
        $([_pager, _status].join(",")).remove();
        $(unescapeHtml(data.grid)).replaceAll(_table);
        _params = data.pager;
        init();
      });
    }

    function statusMarkup() {
      return '<div id="status">Showing page ' + _params.page + ' of ' + _params.pageCount + '</div>';
    }

    function pagerMarkup(pages) {
      if (_params.pageCount == 1) return '<div id="pager"></div>';

      return '<div id="pager">' + pages.join(' ') + '</div>';
    }

    function init() {
      _pages = [];

      var end = endVal();
      var start = startVal(end);

      _pages.push(firstLink());
      _pages.push(prevLink());

      for (var i = start; i <= end; i++)
        _pages.push(link(i));

      _pages.push(nextLink());
      _pages.push(lastLink());

      $(_table).after(pagerMarkup(_pages));
      $(_pager).after(statusMarkup());

      $("#pager a").bind("click", pagerClickHandler);
    }

    init();
  }
};
