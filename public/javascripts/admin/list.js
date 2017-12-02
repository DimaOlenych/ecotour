$('#btnAdd').on('click', function() {
    console.log(data);
    $.ajax({
        method: "POST",
        url: "/api/v1/lists",
        data: {
            company: "Test",
            representative: "Test",
            adress: "Test",
            valid: "Test"
        }
    })
}); 