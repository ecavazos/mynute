var Mynute = Mynute || {};

Mynute.loader = {
  show: function (elementToCover) {
    
    // clean-up any lingering garbage
    this.remove();
    
    // markup needs to be added to dom first
    $("body").append('<div id="curtain"></div>'
      + '<div id="loader">'
      + '<img src="/images/ajax-loader.gif" alt="loading" />'
      + '</div>');
    
    var curtain = $("#curtain");
    var loader  = $("#loader");
    
    var dim = {
      top: elementToCover.offset().top,
      left: elementToCover.offset().left,
      width: elementToCover.outerWidth(), 
      height: elementToCover.outerHeight()
    };
    
    function left() {
      return dim.left + (dim.width - loader.outerWidth()) / 2;
    }
    
    function top() {
      return dim.top + (dim.height - loader.outerHeight()) / 2;
    }
      
    $("#loader").css({
      background: "#fff",
      border: "solid 1px #bebebe",
      padding: "4px 0 0 4px",
      position: "absolute",
      width: "36px",
      height: "36px",
      "z-index": 100
    }).css({
      left: left(),
      top: top()
    });
    
    $("#curtain").css({
      background: "#000",
      position: "absolute",
      left: dim.left,
      top: dim.top,
      width: dim.width,
      height: dim.height,
      opacity: 0.4,
      "z-index": 99
    });
  },
  
  remove: function() {
    $("#curtain").remove();
    $("#loader").remove();
  }
};