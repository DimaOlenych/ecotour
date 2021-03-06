$(function() {
    $("#countrystable").tablesorter({
        headers: {
            // assign the secound column (we start counting zero) 
            5: {
                // disable it by setting the property sorter to false 
                sorter: false
            },
            // assign the third column (we start counting zero) 
            6: {
                // disable it by setting the property sorter to false 
                sorter: false
            }
        }
    });

    $.getJSON("/api/v1/countrys", function(data) {
        $('#countrystable tbody').append(
            $.map(data, function(item, index) {
                let dataStr = `<td>${item._id}</td><td>${item.country}</td><td>${item.capital}</td><td>${item.content}</td>`;
                let btnStr1 = `<td><button type="button" data-id="${item._id}" class="btn btn-default edtButton">Edit</button></td>`;
                let btnStr2 = `<td><button type="button" data-id="${item._id}" class="btn btn-default delButton">Delete</button></td>`;
                return "<tr>" + dataStr + btnStr1 + btnStr2 + "</tr>";
            }).join());

        $("#countrystable").trigger("update"); 

        $('button.edtButton').on('click', function() {
            var id = $(this).attr('data-id');
            var countryModal = $('#countryModal');

            $.getJSON(`/api/v1/country/${id}`, function(data) {
                console.log(data);
                $('#dlgCountrys').html(data.country);
                $('#dlgCapital').html(data.capital);
                $('#dlgContent').html(data.content);
            });

            // and finally show the modal
            capitalModal.modal({ show: true });
            return false;
        }); 

        $('button.delButton').on('click', function() {
            var id = $(this).attr('data-id');
            alert("Del " + id);

            return false;
        }); 
    });

});