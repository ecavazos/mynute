$(function () {
  $(".add-time").click(function () {
    // TODO: gaurd against consecutive clicks
    var box = $("#time-entry");
    if (box.css("display") == "block") return false;
    box.show();
    setDateToToday();
    return false;
  });
  
  $(".discard").click(function () {
    $("#time-entry").hide();
    $("input[id!=submit], textarea").val("");
    $("option").attr("selected", false);
    return false;
  });
  
  $("#time-entry").submit(function (event) {
    $.ajax({
      url: "/time",
      type: "POST",
      data: $(this).serialize(),
      dataType: "html",
      success: function (result){
        $(result).replaceAll(".entries");
      }
    });
    event.preventDefault();
  });
  
  $(".delete").click(function (event) {
    $.ajax({
      url: $(this).attr("href"),
      type: "DELETE",
      success: function (result){
        console.log(result);
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