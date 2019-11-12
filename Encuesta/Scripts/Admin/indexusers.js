document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('btnclepassuserc').addEventListener('click', () => {
        newpassuser = document.getElementById('newpassuserc').value = "";
        passconfirm = document.getElementById('passconfirmc').value = "";
    });

    document.getElementById('btnchangeuserpass').addEventListener('click', () => {
        const newpassuser = document.getElementById('newpassuserc');
        const passconfirm = document.getElementById('passconfirmc');
        if (newpassuser.value != "") {
            if (passconfirm.value != "") {
                if (newpassuser.value == passconfirm.value) {
                    const userpass = document.getElementById('clvpassuser');
                    const dataEnv = { user: userpass.value, pass: newpassuser.value };
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
                        text: "Las contraseñas no coinciden",
                        icon: "warning",
                        closeOnClickOutside: false,
                        closeOnEsc: false
                    }).then((acepta) => {
                        newpassuser.value = "";
                        passconfirm.value = "";
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
                    passconfirm.focus();
                });
            }
        } else {
            swal({
                text: "Introduce una contraseña",
                icon: "warning",
                closeOnClickOutside: false,
                closeOnEsc: false
            }).then((acepta) => {
                newpassuser.focus();
            });
        }
    });

});