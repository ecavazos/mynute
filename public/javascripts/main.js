$(function () {
  $(".add-time").click(function () {
    $("#time-entry").toggle();
    return false;
  });
  
  $(".discard").click(function () {
    $("#time-entry").toggle();
    $("input[id!=submit]").val("");
    $("textarea").text("");
    $("option").attr("selected", false)
    return false;
  });
});