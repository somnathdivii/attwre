$(document).ready(function () {

    $("#form").submit(function (event) {
        event.preventDefault();

        $.ajax({
            type: 'POST',
            url: '/',
            data: $('#form').serialize(),
            dataType: "json",
            success: function (response) {
                //alert("a");
                //console.log(response.Success);
                $('#form')[0].reset();

                document.getElementById("check").innerHTML = response.Success;
                //ADD THIS CODE
                setTimeout(function () {
                    document.getElementById("check").innerHTML = "";
                }, 3000);
                if (response.Success == "Success!") {
                
                    document.getElementById("loginaa").click();
                };
            },
            error: function () {
            }
        })
    });

});