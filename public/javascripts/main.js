var Mynute = function () {
  var formName = "time-entry";
  this.form = $("#" + formName);
};

Mynute.prototype = {

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
    $.ajax({
      url: $(this).attr("href"),
      success: function (entry) {
        var form = $("#time-entry");
        if (form.css("display") != "block") form.show();
        form.attr("action", "/time/" + entry.id);
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
    $.ajax({
      url: $(this).attr("href"),
      type: "DELETE",
      success: function (result) {
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
  },
  
  postSuccess: function (result) {
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
  var mynute = new Mynute();
  
  $(".add-time").bind("click", mynute, mynute.showNewForm);
  $(".discard").bind("click", mynute, mynute.discardForm);
  $("#time-entry").bind("submit", mynute, mynute.submitForm);
  $(".edit").bind("click", mynute, mynute.showEditForm);
  $(".delete").bind("click", mynute, mynute.deleteTimeEntry);

});