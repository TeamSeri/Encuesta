document.addEventListener('DOMContentLoaded', () => {

    floaddatausers = () => {
        try {
            $.ajax({
                url: "../Admin/ListadoUsuarios",
                data: {},
                type: "POST",
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        console.log(data[i]);
                    }
                },
                error: function (jxhr) {
                    console.log(jxhr.status);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }


    setTimeout(() => {
        $("#tabusers").DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
        });
    }, 100);

});