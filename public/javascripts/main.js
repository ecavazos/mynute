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
    self.showLoad();
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
  
  showLoad: function () {
    $("body").append('<div id="curtain"></div>'
      + '<div id="loader">'
      + '<img src="/images/ajax-loader.gif" alt="loading" />'
      + '</div>');
      
    var pos = this.form.offset();
    var dim = { width: this.form.outerWidth(), height: this.form.outerHeight() };
    
    $("#loader").css({
      background: "#fff",
      border: "solid 1px #bebebe",
      padding: "4px 0 0 4px",
      position: "absolute",
      width: "36px",
      height: "36px",
      "z-index": 100
    });
    
    $("#loader").css({
      left: pos.left + (dim.width - $("#loader").outerWidth()) / 2,
      top: pos.top + (dim.height - $("#loader").outerHeight()) / 2
    });
    
    $("#curtain").css({
      background: "#000",
      position: "absolute",
      left: pos.left,
      top: pos.top,
      width: dim.width,
      height: dim.height,
      opacity: 0.4,
      "z-index": 99
    });
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