document.addEventListener('DOMContentLoaded', () => {

    const formData = document.getElementById('formLogin');

    formData.addEventListener('submit', (e) => {
        const user = document.getElementById('user');
        const pass = document.getElementById('pass');
        console.log(user.value);
        console.log(pass.value);
        if (user.value != "") {
            if (pass.value != "") {
                $.ajax({
                    url: "./ValidarLogin",
                    type: "POST",
                    data: { user: user.value, pass: pass.value },
                    success: function (data) {
                        console.log(data.sMensaje);
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