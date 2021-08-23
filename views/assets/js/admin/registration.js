$(document).ready(function () {
    $("#form1").submit(function (event) {
        event.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/registration',
            data: $('#form1').serialize(),
            dataType: "json",
            success: function (response) {
                //alert("a");
                //console.log(response.Success);
                $('#form1')[0].reset();

                document.getElementById("check").innerHTML = response.Success;
                //ADD THIS CODE
                setTimeout(function () {
                    document.getElementById("check").innerHTML = "";
                }, 3000);
                if (response.Success == "You are regestered,You can login now.") {
                    document.getElementById("loginaa").click();
                };
            },
            error: function () {
            }
        })
    });
});