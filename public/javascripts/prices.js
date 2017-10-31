$(function () {
    $("#showr").click(function () {  
        $(".card").each(function(i){
            $(this).delay(500*(i+1)).show("slow");            
        })        
    });
});

$("#hider").click(function () {    
    $($(".card").get().reverse()).each(function(i){
        $(this).delay(500*(i+1)).hide("slow");            
    })        
});
            