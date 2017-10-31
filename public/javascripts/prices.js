$(function() {
    // ready function    
    setNavActive("#nav-prices");
    $("#btnShow").click(function() {
        $(".card").each(function(i) {
            //console.log(i);
            $(this).delay(300 * i).show("slow");
        })
    });
    $("#btnHide").click(function() {
        $(
            $(".card").get().reverse()
        ).each(function(i) {
            $(this).delay(300 * i).hide("slow");
        })
    });
});