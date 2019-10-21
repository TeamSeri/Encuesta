document.addEventListener('DOMContentLoaded', () => {

    const conttable = document.getElementById('conttable');
    const contain = document.getElementById('contain_reg');
    const empresa = document.getElementById('empresasel');
    const empleado = document.getElementById('empleado');
    const puesto = document.getElementById('puesto');
    const codigoasc = document.getElementById('codigoasc');

    loaddataencopc = () => {
        try {
            $.ajax({
                url: "../Admin/DetallesEncuestaOpc",
                type: "POST",
                data: {},
                success: function (data) {
                    lengt = data.length;
                    let estado = '';
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].iEstadoEncOpc == 1) {
                            estado = "Contestada";
                        } else {
                            estado = "Sin contestar";
                        }
                        console.log(data[i]);
                        conttable.innerHTML += `
                            <tr>
                                <td> <i class="fas fa-user"></i> ${data[i].sNombreEmpleadoOpc} </td>
                                <td> ${data[i].sEmpresa} </td>
                                <td> ${data[i].sPuestoEmOpc} </td>
                                <td> ${data[i].sCodigoAcOpc} </td>
                                <td> ${estado} </td>
                                <td> <i class="fas fa-external-link-alt color-primary" style="margin-right:0.5em;"></i>
                                     <a href="/Admin/DetallesRegistroEncuestaOpc?registro=${data[i].iIdRegistroOpc}">Detalles registro</a> </td>
                            </tr>
                         `;
                    }
                }
            });
        } catch (err) {
            console.error('Error ', err);
        }
    }

    loaddataencopc();

    setTimeout(() => {
        $('#tablaus').DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
        });
    }, 100);

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

    const code = Math.round(Math.random() * (99999 - 2) + 1);

    puesto.addEventListener('keyup', () => {
        if (empresa.value != "none") {
            if (empleado.value != "") {
                txtempresa = $('select[name="empresasel"] option:selected').text();
                subempl = empleado.value;
                formatcode = txtempresa.substr(0, 4) + "EOPC" + subempl.substr(0, 4) + "AD" + String(code) + "PS";
                codigoasc.value = formatcode;
            } else {
                swal({
                    text: "Ingrese el nombre de empleado",
                    icon: "warning"
                });
                puesto.value = "";
                codigoasc.value = "";
            }
        } else {
            swal({
                text: "Seleccione una empresa",
                icon: "warning"
            });
            puesto.value = "";
            codigoasc.value = "";
        }
    });

    document.getElementById('btnsaregopc').addEventListener('click', () => {
        try {
            if (empresa.value != "none") {
                if (empleado.value != "") {
                    if (puesto.length != "") {
                        let dataenv = {
                            "empresa": empresa.value,
                            "empleado": empleado.value,
                            "puesto": puesto.value,
                            "codigo": codigoasc.value,
                        }
                        $.ajax({
                            url: "/Admin/RegEncuestaOpcional",
                            type: "POST",
                            dataType: "json",
                            contentType: "application/json; charset=utf-8",
                            data: JSON.stringify(dataenv),
                            success: function (data) {
                                if (data.mensaje == "success") {
                                    dataenv = {};
                                    swal({
                                        title: "Correcto",
                                        text: "Datos registrados",
                                        icon: "success",
                                        closeOnClickOutside: false,
                                        closeOnEsc: false
                                    }).then((acepta) => {
                                        location.reload();
                                    });
                                } else if (data.mensaje == "error") {
                                    dataenv = {};
                                    swal({
                                        title: "Error!",
                                        text: "Contacte al administrador del sistema",
                                        icon: "error",
                                        closeOnClickOutside: false,
                                        closeOnEsc: false
                                    }).then((acepta) => {
                                        location.reload();
                                    });
                                } else {
                                    location.reload
                                }
                            }, error: function (xhr, status) {
                                console.error(xhr);
                            }
                        });
                    } else {
                        swal({
                            text: "Ingrese el puesto",
                            icon: "warning"
                        });
                    }
                } else {
                    swal({
                        text: "Ingrese el nombre de empleado",
                        icon: "warning"
                    });
                }
            } else {
                swal({
                    text: "Seleccione una empresa",
                    icon: "warning"
                });
            }
        } catch (e) {
            console.error('Error ', e);
        }
    });

});