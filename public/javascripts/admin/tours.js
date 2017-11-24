$(function() {    
    $.getJSON( "/api/v1/tours", function( data ) {        
        $('#tourstable tbody').append(
            $.map(data, function (item, index) {                
                let dataStr = `<tr><td>${item._id}</td><td>${item.country_uk}</td><td>${item.price}</td><td>${item.days}</td>`;
                let btnStr1 = `<td><button type="button" data-id="${item._id}" class="btn btn-default edtButton">Edit</button></td>`;
                let btnStr2 = `<td><button type="button" data-id="${item._id}" class="btn btn-default delButton">Delete</button></td>`;
                return dataStr+btnStr1+btnStr2;                
        }).join());               
        $("#tourstable").trigger("update"); 
        $('button.edtButton').on('click', function() {
            var id = $(this).attr('data-id');

            var myModal = $('#myModal');            
            // now get the values from the table
            var firstName = $(this).closest('tr').find('item_id').html();
            var lastName = $(this).closest('tr').find('td.lastName').html();
            //....
        
            // and set them in the modal:
            $('.firstName', myModal).val(firstName);
            $('.lastNameName', myModal).val(lastName);
            //....
        
            // and finally show the modal
            myModal.modal({ show: true });
        
            return false;
        }); 
      });

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