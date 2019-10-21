document.addEventListener('DOMContentLoaded', () => {

    const regEmpresa = document.getElementById('regEmpresa');
    const icocle     = document.getElementById('icocle');
    const empresa    = document.getElementById('empresa');
    const btncle     = document.getElementById('btncle');
    const btnsae     = document.getElementById('btnsae');

    icocle.addEventListener('click', () => {
        empresa.value = "";
    });

    btncle.addEventListener('click', () => {
        empresa.value = "";
    });

    btnsae.addEventListener('click', () => {
        if (empresa.value != "") {
            $.ajax({
                url: "/Admin/EmpresaRegistro",
                type: "POST",
                data: {empresa : empresa.value},
                success: function (data) {
                    console.log(data.mensaje);
                    if (data.mensaje == "erroremp") {
                        swal({
                            title: "Atencion",
                            text: "La empresa que ingreso ya esta registrada",
                            icon: "warning",
                            closeOnClickOutside: false
                        }).then((acepta) => {
                            empresa.value = "";
                            setTimeout(() => {
                                empresa.focus();
                            },1500);
                        });
                    } else if (data.mensaje == "errorins") {
                        swal({
                            title: "Opps...",
                            text: "Ocurrio un problema al insertar, intente mas tarde",
                            icon: "error"
                        });
                    } else if (data.mensaje == "success") {
                        swal({
                            title: "Correcto",
                            text: "Datos registrados!",
                            icon: "success",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then((acepta) => {
                            empresa.value = "";
                            location.href = "/Admin/Detalles?empresa="+data.empresa+"";
                        });
                    }
                }, error: function (xhr, status) {
                    console.error(xhr);
                }
            });
        } else {
            swal({
                title: "Atencion",
                text: "Ingresa un nombre de empresa",
                icon: "warning"
            }).then((acepta) => {
                empresa.focus();
            });
        }
    });

});