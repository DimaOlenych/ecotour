$(function() {
    $("#liststable").tablesorter({
        headers: {
            // assign the secound column (we start counting zero) 
            4: {
                // disable it by setting the property sorter to false 
                sorter: false
            },
        }
    });
    $(function() {
        // ready function    
        setNavActive("#nav-bar-pages");
    });
});