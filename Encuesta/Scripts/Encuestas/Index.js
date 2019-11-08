document.addEventListener('DOMContentLoaded', () => {
    const empresa = document.getElementById('nom_empresa');
    const codigo = document.getElementById('codigo');
    const formData = document.getElementById('form_data');
    const dloader = document.getElementById('divloader');
    const dbutton = document.getElementById('divbutton');
    try {
        $.ajax({
            type: "POST",
            url: '../../EncuestaP/DatosEmpresas',
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

    const centrotra = document.getElementById('centro_tra');
    const txterror = document.getElementById('txterror');
    const envform = document.getElementById('envform');
    centrotra.disabled = true;
    centrotra.innerHTML += '<option value="0">Selecciona</option>';
    let validcent = 0;

    fchangecentrotra = () => {
        let valenv = { empresa: empresa.value };
        centrotra.innerHTML = '<option value="0">Selecciona</option>';
        console.log(valenv);
        try {
            $.ajax({
                url: "../../EncuestaP/DatosCentroTrabajo",
                type: "POST",
                data: valenv,
                success: function (data) {
                    validcent = data.length;
                    if (validcent > 0) {
                        centrotra.disabled = false;
                        envform.disabled = false;
                        txterror.textContent = '';
                        setTimeout(() => {
                            for (var i = 0; i < data.length; i++) {
                                centrotra.innerHTML += `<option value="${data[i].iIdCentroTrabajo}">${data[i].sCentroTrabajo}</option>`;
                            }
                        }, 200);
                    } else {
                        centrotra.disabled = true;
                        envform.disabled = true;
                        txterror.textContent = 'La empresa seleccionada no tiene ningun centro de trabajo registrado, verifica tus datos.';
                    }
                }, error: function (xhr, status) {
                    console.error(xhr.message);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    empresa.addEventListener('change', fchangecentrotra);

    formData.addEventListener('submit', (e) => {
        if (empresa.value != "0") {
            if (codigo.value != "") {
                dloader.classList.remove('d-none');
                dbutton.classList.add('d-none');
                setTimeout(() => {
                    dloader.classList.add('d-none');
                    $.ajax({
                        url: "../../EncuestaP/DatosEmpresa",
                        type: "POST",
                        data: { empresa: empresa.value, centro: centrotra.value, codigo: codigo.value },
                        success: function (data) {
                            if (data.sMensaje == "success") {
                                if (data.iAplicacionesRealizadas == data.iAplicacionesReq) {
                                    swal({
                                        title: "Atención",
                                        text: "Se ha alcanzado el limite maximo para responder la encuesta",
                                        icon: "warning"
                                    });
                                    dbutton.classList.remove('d-none');
                                    empresa.value = "0";
                                    codigo.value = "";
                                } else {
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
                                }
                            } else {
                                swal("Atención","Puede ser que la encuesta se encuentre inactiva o verifique sus datos...","error");
                                dbutton.classList.remove('d-none');
                                empresa.value = "0";
                                codigo.value = "";
                            }
                        },
                        error: function (xhr, status) {
                            console.error(xhr.message);
                        }
                    });
                }, 3000);
            } else {
                swal("", "Ingresa el código de empresa", "warning");
            }
        } else {
            swal("", "Selecciona una empresa", "warning");
        }
        e.preventDefault();
    });
});