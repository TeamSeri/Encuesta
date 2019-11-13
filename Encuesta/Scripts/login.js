document.addEventListener('DOMContentLoaded', () => {

    const formData = document.getElementById('formLogin');
    formData.addEventListener('submit', (e) => {
        const user = document.getElementById('user').value;
        const pass = document.getElementById('pass');
        if (user != "") {
            if (pass.value != "") {
                $.ajax({
                    url: "./ValidarLogin",
                    type: "POST",
                    data: { user: user.toLowerCase(), pass: pass.value },
                    success: function (data) {
                        if (data.sMensaje == 'success') {
                            if (data.iEstado == 1) {
                                swal({
                                    title: "Datos correctos",
                                    text: "Redirigiendo...",
                                    icon: "success",
                                    closeOnClickOutside: false,
                                    closeOnEsc: false,
                                    buttons: false
                                });
                                setTimeout(() => {
                                    location.href = '../../Admin/Index';
                                }, 2000);
                            } else {
                                swal({
                                    title: "Atención",
                                    text: "Tu cuenta ha sido bloqueada",
                                    icon: "warning",
                                    closeOnClickOutside: false,
                                    closeOnEsc: false
                                }).then((acepta) => {
                                    user.value = "";
                                    pass.value = "";
                                });
                            }
                        } else {
                            swal({
                                text: "Los datos ingresados son incorrectos",
                                icon: "warning",
                                closeOnEsc: false,
                                closeOnClickOutside: false
                            }).then((acepta) => {
                                user.value = "";
                                pass.value = "";
                                pass.focus();
                            });

                        }
                    },
                    error: function (xhr, status) {
                        console.log(xhr.message);
                    }
                });
            } else {
                swal("", "Por favor ingresa la contraseña de acceso", "warning");
            }
        } else {
            swal("", "Por favor ingresa un nombre de usuario!", "warning");
        }
        e.preventDefault();
    });

});