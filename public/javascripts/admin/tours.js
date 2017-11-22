$(function() {
    $("#tourstable").tablesorter({
        headers: {
            // assign the secound column (we start counting zero) 
            3: {
                // disable it by setting the property sorter to false 
                sorter: false
            },
            // assign the third column (we start counting zero) 
            4: {
                // disable it by setting the property sorter to false 
                sorter: false
            }
        }
    });

});