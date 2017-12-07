$(function() {
    $("#moneytable").tablesorter({
        headers: {
            5: {
                sorter: false
            },
            6: {
                sorter: false
            }
        }
    });

    $.getJSON("/api/v1/money", function(data) {
        $('#moneytable tbody').append(
            $.map(data, function(item, index) {
                let dataStr = `<td>${item._id}</td><td>${item.currencyName}</td><td>${item.currencyPrice}</td><td>${item.date}</td>`;
                let btnStr1 = `<td><button type="button" data-id="${item._id}" class="btn btn-default edtButton">Edit</button></td>`;
                let btnStr2 = `<td><button type="button" data-id="${item._id}" class="btn btn-default delButton">Delete</button></td>`;
                return "<tr>" + dataStr + btnStr1 + btnStr2 + "</tr>";
            }).join());

        $("#moneytable").trigger("update"); 

        $('#addCurrency').on('click', function() {
            var myModal = $('#myModal');

            myModal.modal({ show: true });
            return false;
        });

        $('button.edtButton').on('click', function() {
            var id = $(this).attr('data-id');
            var myModal = $('#myModalmod');

            $.getJSON(`/api/v1/currency/${id}`, function(data) {
                $('#hidMod').val(id);
                $('#modcurrencyName').val(data.currencyName);
                $('#modcurrencyPrice').val(data.currencyPrice);
            });

            myModal.modal({ show: true });
            return false;
        }); 

        $('button.delButton').on('click', function() {
            var myModal = $('#myModaldel');
            var id = $(this).attr('data-id');

            $.getJSON(`/api/v1/currency/${id}`, function(data) {
                $('#hidDel').val(id);
            });
            myModal.modal({ show: true });
            return false;
        });

        $('#addbtn').on('click', function() {
            $.ajax({
                method: "POST",
                url: "/api/v1/money",
                data: {
                    currencyName: $('#addcurrencyName').val(),
                    currencyPrice: $('#addcurrencyPrice').val(),
                    date: ($('#adddate').val() == "") ? Date.now : $('#adddate').val()
                }
            });
            // $('#myModal').modal('toggle');
            location.reload();
        });

        $('#modbtn').on('click', function() {
            var id = $('#hidMod').val();
            $.ajax({
                method: "PUT",
                url: `/api/v1/currency/${id}`,
                data: {
                    currencyName: $('#modcurrencyName').val(),
                    currencyPrice: $('#modcurrencyPrice').val()
                }
            });
            // $('#myModalmod').modal('toggle');
            location.reload();
        });

        $('#delModalbtn').on('click', function() {
            var id = $('#hidDel').val();
            $.ajax({
                method: "DELETE",
                url: `/api/v1/currency/${id}`
            });
            // $('#myModaldel').modal('toggle');
            location.reload();
        });
    });

});