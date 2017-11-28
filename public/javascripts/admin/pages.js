$(function() {
    // Replace the <textarea id="editor1"> with a CKEditor
    // instance, using default configuration.
    CKEDITOR.replace('editor1');
    $.getJSON("/api/v1/pages", function(data) {
        $('#selectPage').append(
            $.map(data, function(item, index) {
                return `<option value="${item._id}">${item.name}</option>`;
            }).join());
    });

    $('#selectPage').change(function() {
        var id = $(this).val();
        $.getJSON(`/api/v1/page/${id}`, function(data) {
            CKEDITOR.instances.editor1.setData(data.main_text, function() {
                this.checkDirty(); // true
            });
        });
    });
    $('#saveBtn').click(function() {
        //alert(CKEDITOR.instances.editor1.getData());
        let id = $('#selectPage').val();
        let name = $('#selectPage option:selected').text();
        console.log(name);
        $.ajax({
                method: "PUT",
                url: `/api/v1/page/${id}`,
                data: { name: name, main_text: CKEDITOR.instances.editor1.getData() }
            })
            .done(function(msg) {
                alert("Data Saved: " + msg);
            });

    });
})