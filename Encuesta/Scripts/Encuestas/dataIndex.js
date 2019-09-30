document.addEventListener('DOMContentLoaded', () => {
    //Variables formulario
    const empresa      = document.getElementById('nom_empresa');
    const empleados    = document.getElementById('num_empleados');
    const aplicaciones = document.getElementById('num_aplicaciones');
    const formData = document.getElementById('form_data');
    //Datos de las empresas
    try {
        $.ajax({
            type: "POST",
            url: '../../EncuestaP/DatosEmpresas',
            data: {},
            error: function (err) {
                console.log(err);
            },
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    empresa.innerHTML += `<option value="${data[i].iIdEmpresa}">${data[i].sNombre}</option>`;
                }
            }
        });
    } catch (err) {
        console.log(err);
    }
    //Numero de aplicaciones requeridas
    num_empleados.addEventListener('keyup', () => {
        try {
            val_emp = num_empleados.value;
            const oper = ((val_emp * 9604) / 100) / ((25 * (val_emp - 1) + 9604) / 100);
            if (!isNaN(val_emp)) {
                document.getElementById('num_app').textContent = parseInt(oper);
                aplicaciones.value = parseInt(oper);
            } else {
                location.reload();
            }
        } catch (err) {
            console.log(err);
        }
    });
    //Valores al cargar la página del formulario
    empresa.value = "none";
    empleados.value = "";
    aplicaciones.value = "";
    //Envio de datos
    formData.addEventListener('submit', (e) => {
        try {
            if (empresa.value != "0") {
                if (!isNaN(empleados.value)) {
                    formData.submit();
                } else {
                    alert("Ingresa la cantidad de empleados");
                }
            } else {
                alert("Selecciona una empresa para continuar");
            }
        } catch (err) {
            console.log(err);
        }
        e.preventDefault();
    });
});