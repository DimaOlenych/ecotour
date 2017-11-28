$(function() {
    $("#liststable").tablesorter({
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

    $.getJSON("/api/v1/lists", function(data) {
        $('#liststable tbody').append(
            $.map(data, function(item, index) {
                let dataStr = `<td>${item._id}</td><td>${item.company}</td><td>${item.representative}</td><td>${item.adress}</td><td>${item.valid}</td>`;
                let btnStr1 = `<td><button type="button" data-id="${item._id}" class="btn btn-default edtButton">Edit</button></td>`;
                let btnStr2 = `<td><button type="button" data-id="${item._id}" class="btn btn-default delButton">Delete</button></td>`;
                return "<tr>" + dataStr + btnStr1 + btnStr2 + "</tr>";
            }).join());

        $("#liststable").trigger("update"); 

        $('button.edtButton').on('click', function() {
            var id = $(this).attr('data-id');
            var myModal = $('#listmodal');

            $.getJSON(`/api/v1/list/${id}`, function(data) {
                console.log(data);
                // Problem: 
                // Uncaught TypeError: Cannot read property 'company' of null
                // at Object.success (lists.js:37)
                $('#dlgCompany').html(data.company);
                $('#dlgRepresentative').html(data.representative);
                $('#dlgAdress').html(data.adress);
                $('#dlgValid').html(data.valid);
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