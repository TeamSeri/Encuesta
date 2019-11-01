document.addEventListener('DOMContentLoaded', () => {

    const formData = document.getElementById('formLogin');
    formData.addEventListener('submit', (e) => {
        const user = document.getElementById('user');
        const pass = document.getElementById('pass');
        if (user.value != "") {
            if (pass.value != "") {
                $.ajax({
                    url: "./ValidarLogin",
                    type: "POST",
                    data: { user: user.value, pass: pass.value },
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
                                    location.reload();
                                });
                            }
                        } else {
                            swal("Los datos ingresados son incorrectos");
                            user.value = "";
                            pass.value = "";
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