var Mynute = Mynute || {};

Mynute.app = {
  
  form: $("#time-entry"),

  initAjaxCallbacks: function () {
    $("body")
      .ajaxStop(function () {
        Mynute.loader.remove();
      })
      .ajaxError(function (event, xhr, ajaxOptions, thrownError) {
        $("#error").remove();
        $("body").prepend('<div id="error"></div>');
        $("#error").text(xhr.responseText)
          .fadeOut(4000, function () {
            $("#error").remove();
          });
      });
  },

  initEvents: function () {
    $(".add-time").live("click", Mynute.app.showNewForm);
    $(".discard").live("click", Mynute.app.discardForm);
    $("#time-entry").live("submit", Mynute.app.submitForm);
    $(".edit").live("click", Mynute.app.showEditForm);
    $(".delete").live("click", Mynute.app.deleteTimeEntry);
  },

  showNewForm: function (event) {
    var form = Mynute.app.form;
    if (form.css("display") == "block") {
      $("#warning").remove();
      $("body").prepend('<div id="warning"></div>');
      $("#warning").text("You must submit or discard your changes before adding a new time entry")
        .fadeOut(5000, function () {
          $("#warning").remove();
        });
      
      return false;
    }
    form.attr("action", "/time");
    form.show();
    Mynute.app.setDate();
    event.preventDefault();
  },
  
  showEditForm: function (event) {
    if (Mynute.app.form.css("display") != "block") Mynute.app.form.show();
    Mynute.loader.show(Mynute.app.form);
    $.ajax({
      url: $(this).attr("href"),
      success: function (entry) {
        Mynute.app.form.attr("action", "/time/" + entry.id);
        $("#user_id").val(entry.user.id);
        $("#entry_type").val(entry.entry_type);
        $("#project_id").val(entry.project.id);
        $("#billing_type").val(entry.billing_type);
        $("#date").val(Mynute.app.setDate(new Date(entry.date)));
        $("#duration").val(entry.duration);
        $("#desc").val(entry.desc);
      }
    });
    event.preventDefault();
  },
  
  discardForm: function (event) {
    Mynute.app.form.hide();
    Mynute.app.resetFormValues();
    event.preventDefault();
  },
  
  submitForm: function (event) {
    Mynute.loader.show(Mynute.app.form);
    $.ajax({
      url: $(this).attr("action"),
      type: "POST",
      data: $(this).serialize(),
      dataType: "html",
      success: function (result) {
        // TODO: get back paged results
        Mynute.app.postSuccess(result);
      }
    });
    event.preventDefault();
  },
  
  deleteTimeEntry: function (event) {
    Mynute.loader.show($(".entries"));
    $.ajax({
      url: $(this).attr("href"),
      type: "DELETE",
      success: function (result) {
        Mynute.loader.remove();
        $(result).replaceAll(".entries");
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

  setDate: function (date) {
    if (date) {
      date.setDate(date.getDate() + 1)
    } else {
      date = new Date();
    }
    var dt = (date.getMonth() + 1)
           + "/" + date.getDate()
           + "/" + date.getFullYear();
    $("#date").val(dt);
  }
};
