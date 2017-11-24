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

    $.getJSON("/api/v1/tours", function(data) {
        $('#tourstable tbody').append(
            $.map(data, function(item, index) {
                let dataStr = `<td>${item._id}</td><td>${item.country_uk}</td><td>${item.price}</td><td>${item.days}</td>`;
                let btnStr1 = `<td><button type="button" data-id="${item._id}" class="btn btn-default edtButton">Edit</button></td>`;
                let btnStr2 = `<td><button type="button" data-id="${item._id}" class="btn btn-default delButton">Delete</button></td>`;
                return "<tr>" + dataStr + btnStr1 + btnStr2 + "</tr>";
            }).join());

        $("#tourstable").trigger("update"); 

        $('button.edtButton').on('click', function() {
            var id = $(this).attr('data-id');
            var myModal = $('#myModal');

            $.getJSON(`/api/v1/tour/${id}`, function(data) {
                console.log(data);
                $('#dlgCountry').html(data.country_uk);
                $('#dlgDays').html(data.days);
                $('#dlgPrice').html(data.price);
            });

            // and finally show the modal
            myModal.modal({ show: true });
            return false;
        }); 

        $('button.delButton').on('click', function() {
            var id = $(this).attr('data-id');
            alert("Del " + id);

            return false;
        }); 
    });

});