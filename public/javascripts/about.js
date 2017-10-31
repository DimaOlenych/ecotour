$(function() {
    // ready function    
    setNavActive("#nav-about");
    $("#btnIn").click(function() {
        $("img").fadeTo(400, 1);
    });
    $("#btnOut").click(function() {
        $("img").fadeTo(400, 0.33);
    });

    $("#btnSize").click(function() {
        $("#srcText").animate({ width: "200px" }, "slow");
    });
});