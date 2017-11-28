$(function() {
    // Replace the <textarea id="editor1"> with a CKEditor
    // instance, using default configuration.
    CKEDITOR.replace('editor1');
    $.getJSON("/api/v1/pages", function(data) {
        $('#selectPage').append(
            $.map(data, function(item, index) {
                return `<option value="${item._id}">${item.name}</option>`;
            }).join());
        $('#selectPage').change(function() {
            var id = $(this).val();
            $.getJSON(`/api/v1/page/${id}`, function(data) {
                $('#editor1').append(data.main_text);
            });
        });
    });
})