document.addEventListener('DOMContentLoaded', () => {
    //Variables formulario
    const opcionselec     = document.getElementById('opcsel');
    const empresa         = document.getElementById('nom_empresa');
    const empleados       = document.getElementById('num_empleados');
    const aplicaciones    = document.getElementById('num_aplicaciones');
    const formData = document.getElementById('form_data');
    //Cambio de opciones
    opcionselec.addEventListener('change', () => {
        const divempresa   = document.getElementById('divempresa');
        const divempleados = document.getElementById('divempleados');
        const divbutton    = document.getElementById('divbutton');
        const divapp       = document.getElementById('divapp'); divapp
        if (opcionselec.value == 'new') {
            divempresa.classList.remove('d-none');
            divempleados.classList.remove('d-none');
            divapp.classList.remove('d-none');
            divbutton.classList.remove('d-none');
        } else if (opcionselec.value == 'exi') {
            divempresa.classList.remove('d-none');
            divempleados.classList.add('d-none');
            divbutton.classList.remove('d-none');
            divapp.classList.add('d-none');
            empleados.value = 0;
            document.getElementById('num_app').textContent = "";
            aplicaciones.value = "";
        } else if (opcionselec.value == "none") {
            divempresa.classList.add('d-none');
            divempleados.classList.add('d-none');
            divbutton.classList.add('d-none');
            divapp.classList.add('d-none');
            empresa.value = "0";
            empleados.value = 0;
            document.getElementById('num_app').textContent = "";
            aplicaciones.value = "";
        } else { location.reload(); }
    });
    //Datos de las empresas
    opcionselec.addEventListener('change', () => {
        //empresa.length = 0;
        empresa.innerHTML = "<option value='0'>Selecciona</option>";
        try {
            $.ajax({
                type: "POST",
                url: '../../EncuestaP/DatosEmpresas',
                data: {},
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        if (opcionselec.value == "new") {
                            if (data[i].iEmpleados == 0) {
                                empresa.innerHTML += `<option value="${data[i].iIdEmpresa}">${data[i].sNombre}</option>`;
                            }
                        } else if (opcionselec.value == "exi") {
                            if (data[i].iEmpleados > 0) {
                                empresa.innerHTML += `<option value="${data[i].iIdEmpresa}">${data[i].sNombre}</option>`;
                            }
                        }
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
    });
    //Numero de aplicaciones requeridas
    num_empleados.addEventListener('keyup', () => {
        try {
            val_emp    = num_empleados.value;
            const oper = ((val_emp * 9604) / 100) / ((25 * (val_emp - 1) + 9604) / 100);
            if (!isNaN(val_emp)) {
                if (val_emp > 50) {
                    document.getElementById('num_app').textContent = parseInt(oper);
                    aplicaciones.value = parseInt(oper);
                } else {
                    aplicaciones.value = 0;
                }
            } else {
                document.getElementById('num_app').textContent = "";
            }
        } catch (err) {
            if (err instanceof TypeError) {
                console.error("TypeError ", err.message);
            } else if (err instanceof RangeError) {
                console.error("RangeError ", err.message);
            } else if (err instanceof EvalError) {
                console.error("EvalError ", err.message);
            } else {
                console.error("Error ", err.message);
            }
        }
    });
    //Valores al cargar la página del formulario
    empresa.value      = "none";
    empleados.value    = "";
    aplicaciones.value = "";
    //Envio de datos
    formData.addEventListener('submit', (e) => {
        try {
            if (empresa.value != "0") {
                if (!isNaN(empleados.value)) {
                    if (opcionselec.value == "new") {
                        if (empleados.value > 0) {
                            formData.submit();
                        } else {
                            alert("Ingresa la cantidad de empleados");
                        }
                    } else {
                        formData.submit();
                    }
                } else {
                    location.reload();
                }
            } else {
                alert("Selecciona una empresa para continuar");
            }
        } catch (err) {
            if (err instanceof TypeError) {
                console.error("TypeError ", err.message);
            } else if (err instanceof RangeError) {
                console.error("RangeError ", err.message);
            } else if (err instanceof EvalError) {
                console.error("EvalError ", err.message);
            } else {
                console.error("Error ", err.message);
            }
        }
        e.preventDefault();
    });
});