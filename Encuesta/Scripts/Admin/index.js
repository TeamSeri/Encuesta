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

    document.getElementById('btnpassupdate').addEventListener('click', () => {
        const newpassuser = document.getElementById('newpassuser');
        const confnewpass = document.getElementById('confnewpass');
        if (newpassuser.value != "") {
            if (confnewpass.value != "") {
                if (newpassuser.value == confnewpass.value) {
                    const dataEnv = { user: document.getElementById('keyuserpass').value, pass: newpassuser.value }
                    $.ajax({
                        url: "../Admin/CambiarContrasena",
                        type: "POST",
                        data: dataEnv,
                        success: function (data) {
                            if (data.resp == "correct") {
                                swal({
                                    title: "Correcto",
                                    text: "Contraseña actualizada",
                                    icon: "success",
                                    closeOnClickOutside: false,
                                    closeOnEsc: false
                                }).then((acepta) => {
                                    location.reload();
                                });
                            } else if (data.resp == "incorrect") {
                                swal({
                                    title: "Error",
                                    text: "La contraseña no se actualizo",
                                    icon: "error",
                                    closeOnClickOutside: false,
                                    closeOnEsc: false
                                }).then((acepta) => {
                                    newpassuser.value = "";
                                    passconfirm.value = "";
                                });
                            }
                        }, error: function (error) {
                            console.log(error);
                        }
                    });
                } else {
                    swal({
                        text: "Las contraseñas no coinciden verifique",
                        icon: "warning",
                        closeOnClickOutside: false,
                        closeOnEsc: false
                    }).then((acepta) => {
                        newpassuser.focus();
                    });
                }
            } else {
                swal({
                    text: "Repite la nueva contraseña",
                    icon: "warning",
                    closeOnClickOutside: false,
                    closeOnEsc: false
                }).then((acepta) => {
                    newpassuser.focus();
                });
            }
        } else {
            swal({
                text: "Ingresa una contraseña",
                icon: "warning",
                closeOnClickOutside: false,
                closeOnEsc: false
            }).then((acepta) => {
                newpassuser.focus();
            });
        }
    });

    floadnotifreport = () => {
        try {
            $.ajax({
                url: "../Admin/NotificaReportesRes",
                type: "POST",
                data: { clvuser: 0, tipo: 'AllAdmin'},
                success: function (data) {
                    let cant = data.length;
                    if (cant > 0) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].sMensaje == "success") {
                                document.getElementById('repnotif').textContent = cant;
                            }
                        }
                    } else {
                        if (document.getElementById('repnotif')) {
                            document.getElementById('repnotif').textContent = 0;
                        }
                    }
                }, error: function (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    floadnotifreport();

});