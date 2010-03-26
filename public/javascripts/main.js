$(function () {
  $(".add-time").click(function (event) {
    var form = $("#time-entry");
    if (form.css("display") == "block") return false;
    form.attr("action", "/time");
    form.show();
    setDateToToday();
    event.preventDefault();
  });
  
  $(".discard").click(function (event) {
    $("#time-entry").hide();
    $("input[id!=submit], textarea").val("");
    $("option").attr("selected", false);
    event.preventDefault();
  });
  
  $("#time-entry").submit(function (event) {
    $.ajax({
      url: $(this).attr("action"),
      type: "POST",
      data: $(this).serialize(),
      dataType: "html",
      success: function (result){
        $(result).replaceAll(".entries");
      }
    });
    event.preventDefault();
  });
  
  $(".edit").click(function (event) {
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
  });
  
  $(".delete").click(function (event) {
    $.ajax({
      url: $(this).attr("href"),
      type: "DELETE",
      success: function (result) {
        $(result).replaceAll(".entries");
      }
    });
    event.preventDefault();
  })
  
  function setDateToToday() {
    var today = new Date();
    var dt = (today.getMonth() + 1)
           + "/" + today.getDate()
           + "/" + today.getFullYear();
    $("#date").val(dt);
  }
});