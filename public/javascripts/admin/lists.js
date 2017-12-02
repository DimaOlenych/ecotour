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
                let btnStr1 = `<td><button type="button" data-id="${item._id}" data-company="${item.company}" data-representative="${item.representative}" data-adress="${item.adress}" data-valid="${item.valid}" class="btn btn-default edtButton">Edit</button></td>`;
                let btnStr2 = `<td><button type="button" data-id="${item._id}" data-company="${item.company}" data-representative="${item.representative}" data-adress="${item.adress}" data-valid="${item.valid}" class="btn btn-default delButton">Delete</button></td>`;
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
                $('#dlgId').val(id);
                $('#dlgCompany').val(data.company);
                $('#dlgRepresentative').val(data.representative);
                $('#dlgAdress').val(data.adress);
                $('#dlgValid').val(data.valid);
            });

            // and finally show the modal
            myModal.modal({ show: true });
            return false;
        }); 

        $('button.delButton').on('click', function() {
            var id = $(this).attr('data-id');
            var company = $(this).attr('data-company');
            var representative = $(this).attr('data-representative');
            var adress = $(this).attr('data-adress');
            var valid = $(this).attr('data-valid');
            $('#dellistmodal').modal({ show: true })

            $('#hid').val(id);
            $('#company').val(company);
            $('#representative').val(representative);
            $('#adress').val(adress);
            $('#valid').val(valid);

            $('#btnDel').on('click', function() {
                $.ajax({
                        method: "DELETE",
                        url: `/api/v1/list/${id}`,
                    })
                    .done(function(msg) {
                        alert("успешно Удалено: " + " " + company + " " + representative + " " + adress + " " + valid);
                    });
                $("#dellistmodal").modal('toggle');
            });
        }); 



        $('#btnSave').on('click', function() {
            var id = $("#dlgId").val();
            $.ajax({
                    method: "PUT",
                    url: `/api/v1/list/${id}`,
                    data: {
                        company: $('#dlgCompany').val(),
                        representative: $('#dlgRepresentative').val(),
                        adress: $('#dlgAdress').val(),
                        valid: $('#dlgValid').val()
                    }
                })
                .done(function(msg) {
                    $("#listmodal").modal('toggle');
                });
            return false;
        }); 

        $('#btnNew').on('click', function() {
            var myModal2 = $('#addlistmodal');
            myModal2.modal({ show: true });
            return false;
        }); 

        $('#btnAdd').on('click', function() {
            $.ajax({
                    method: "POST",
                    url: "/api/v1/lists",
                    data: {
                        company: $('#company').val(),
                        representative: $('#representative').val(),
                        adress: $('#adress').val(),
                        valid: $('#valid').val()
                    },
                })
                .done(function(msg) {
                    $("#addlistmodal").modal('toggle');
                });
        }); 
    });
});