// require: mynute.js
// require: loader.js
// require: paginator.js

$(function () {
  Mynute.app.initAjaxCallbacks();
  Mynute.app.initEvents();
  Mynute.paginator.paginate(pagerJson);
});
