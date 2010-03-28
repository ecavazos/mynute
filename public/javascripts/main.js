var Mynute = Mynute || {};

Mynute.App = function () {
  this.form = $("#time-entry");
};

Mynute.App.prototype = {

  showNewForm: function (event) {
    var self = event.data;
    var form = self.form;
    if (form.css("display") == "block") return false;
    form.attr("action", "/time");
    form.show();
    self.setDate();
    event.preventDefault();
  },
  
  showEditForm: function (event) {
    var self = event.data;
    if (self.form.css("display") != "block") self.form.show();
    Mynute.loader.show(self.form);
    $.ajax({
      url: $(this).attr("href"),
      success: function (entry) {
        Mynute.loader.remove();
        self.form.attr("action", "/time/" + entry.id);
        $("#user_id").val(entry.user.id);
        $("#entry_type").val(entry.entry_type);
        $("#project_id").val(entry.project.id);
        $("#billing_type").val(entry.billing_type);
        $("#date").val(entry.date);
        $("#duration").val(entry.duration);
        $("#desc").val(entry.desc);
      }
    });
    event.preventDefault();
  },
  
  discardForm: function (event) {
    var self = event.data;
    self.form.hide();
    self.resetFormValues();
    event.preventDefault();
  },
  
  submitForm: function (event) {
    var self = event.data;
    Mynute.loader.show(self.form);
    $.ajax({
      url: $(this).attr("action"),
      type: "POST",
      data: $(this).serialize(),
      dataType: "html",
      success: function (result) {
        self.postSuccess.call(self, result);
      }
    });
    event.preventDefault();
  },
  
  deleteTimeEntry: function (event) {
    var self = event.data;
    Mynute.loader.show($(".entries"));
    $.ajax({
      url: $(this).attr("href"),
      type: "DELETE",
      success: function (result) {
        Mynute.loader.remove();
        $(result).replaceAll(".entries");
        self.bindEditAndDelete();
      }
    });
    event.preventDefault();
  },
  
  bindEditAndDelete: function () {
    $(".edit").bind("click", this, this.showEditForm);
    $(".delete").bind("click", this, this.deleteTimeEntry);
  },
  
  resetFormValues: function () {
    $("input[id!=submit], textarea").val("");
    $("option").attr("selected", false);
    this.setDate();
  },
  
  postSuccess: function (result) {
    Mynute.loader.remove();
    $(result).replaceAll(".entries");
    this.resetFormValues();
    this.bindEditAndDelete();
  },
  
  setDate: function () {
    var today = new Date();
    var dt = (today.getMonth() + 1)
           + "/" + today.getDate()
           + "/" + today.getFullYear();
    $("#date").val(dt);
  }
};

$(function () {
  var app = new Mynute.App();
  $(".add-time").bind("click", app, app.showNewForm);
  $(".discard").bind("click", app, app.discardForm);
  $("#time-entry").bind("submit", app, app.submitForm);
  $(".edit").bind("click", app, app.showEditForm);
  $(".delete").bind("click", app, app.deleteTimeEntry);
});