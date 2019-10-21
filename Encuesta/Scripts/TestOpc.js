document.addEventListener('DOMContentLoaded', () => {

    const empresa = document.getElementById('nom_empresa');
    const codigo = document.getElementById('codigo');
    const puesto = document.getElementById('puesto');
    const formData = document.getElementById('form_data');
    const dloader = document.getElementById('divloader');
    const dbutton = document.getElementById('divbutton');

    try {
        $.ajax({
            type: "POST",
            url: '../EncuestaP/DatosEmpresas',
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    empresa.innerHTML += `<option value="${data[i].iIdEmpresa}">${data[i].sNombre}</option>`;
                }
            },
            error: function (xhr, status) {
                console.error(xhr.message);
            }
        });
    } catch (err) {
        if (err instanceof TypeError) {
            console.error("TypeError ", err.message);
        } else if (err instanceof RangeError) {
            console.error("RangeError ", err.message);
        } else if (err instanceof EvalError) {
            console.error("EvalError", err.message);
        } else {
            console.error("Error ", err.message);
        }
    }

    formData.addEventListener('submit', (e) => {
        if (empresa.value != "0") {
            if (codigo.value != "") {
                if (puesto.value != "") {
                    dloader.classList.remove('d-none');
                    dbutton.classList.add('d-none');
                    setTimeout(() => {
                        dloader.classList.add('d-none');
                        $.ajax({
                            url: "../EncuestaP/DatosEncuestaOpc",
                            type: "POST",
                            data: { empresa: empresa.value, codigo: codigo.value, puesto: puesto.value },
                            success: function (data) {
                                if (data.mensaje == "success") {
                                    swal({
                                        title: "Correcto",
                                        text: "Redirigiendo...",
                                        icon: "success",
                                        buttons: false,
                                        closeOnClickOutside: false,
                                        closeOnEsc: false
                                    });
                                    setTimeout(() => {
                                        formData.submit();
                                    }, 2000);
                                } else {
                                    swal({
                                        title: "Error!",
                                        text: "Es probable que ya haya realizado esta encuesta y por eso el acceso es denegado, en caso de que no sea así verifique sus datos de acceso, si cree que se trata de un error informe a sistemas.",
                                        icon: "error",
                                        closeOnClickOutside: false,
                                        closeOnEsc: false
                                    }).then((acepta) => {
                                        if (acepta) {
                                            location.reload();
                                        }
                                    });
                                }
                            },
                            error: function (xhr, status) {
                                console.error(xhr.message);
                            }
                        });
                    }, 3000);
                }
            } else {
                swal("", "Ingresa el código de empresa", "warning");
            }
        } else {
            swal("", "Selecciona una empresa", "warning");
        }
        e.preventDefault();
    });

});