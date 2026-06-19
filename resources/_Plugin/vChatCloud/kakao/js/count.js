$(function() {
    $('#content').keyup(function(e) {
        if ($(this).text().length > 100) {
            openError("글자수는 100자로 이내로 제한됩니다.");
            $(this).text(($(this).text()).substring(0, 100));
        }
        $('#counter').html(($(this).text()).length + '/100');
    });
    $('#content').keyup();
});