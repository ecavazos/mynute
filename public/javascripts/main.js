$(function () {
  var app = new Mynute.App();
  Mynute.paginator.paginate(pagerJson);
  $(".add-time").bind("click", app, app.showNewForm);
  $(".discard").bind("click", app, app.discardForm);
  $("#time-entry").bind("submit", app, app.submitForm);
  $(".edit").bind("click", app, app.showEditForm);
  $(".delete").bind("click", app, app.deleteTimeEntry);
});