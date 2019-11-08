document.addEventListener('DOMContentLoaded', () => {

    const conttable = document.getElementById('conttable');
    const contain = document.getElementById('contain_reg');
    const empresa = document.getElementById('empresasel');
    const empleado = document.getElementById('empleado');
    const puesto = document.getElementById('puesto');
    const codigoasc = document.getElementById('codigoasc');

    let arrusers = [], satencion = 0, natencion = 0;

    loaddataencopc = (param1, param2) => {
        let dataEnv = { type : param1, key : param2 };
        if (param1 != 1) {
            dataEnv = { type : param1, key : param2 };
        }
        console.log(dataEnv);
        try {
            $.ajax({
                url: "../Admin/DetallesEncuestaOpc",
                type: "POST",
                data: dataEnv,
                success: function (data) {
                    lengt = data.length;
                    let estado = '', resatencion = '';
                    for (var i = 0; i < data.length; i++) {
                        arrusers.push(data);
                        if (data[i].sDiagnosticoOpcDetalle != "") {
                            resatencion = data[i].sDiagnosticoOpcDetalle;
                        } else {
                            resatencion = "Sin resultado";
                        }
                        if (data[i].iEstadoEncOpc == 1) {
                            estado = "Contestada";
                        } else {
                            estado = "Sin contestar";
                        }
                        conttable.innerHTML += `
                            <tr>
                                <td> <i class="fas fa-user"></i> ${data[i].sNombreEmpleadoOpc} </td>
                                <td>
                                    <a href="/Admin/Detalles?empresa=${data[i].iIdEmpresaOpc}"> 
                                        <i class="fas fa-external-link-alt" style="margin-right:0.5em !important;"></i>
                                        ${data[i].sEmpresa} 
                                    </a>
                                </td>
                                <td> ${data[i].sPuestoEmOpc} </td>
                                <td> ${data[i].sCodigoAcOpc} </td>
                                <td> ${estado} </td>
                                <td> ${resatencion} </td>
                                <td> 
                                    <i class="fas fa-external-link-alt color-primary" style="margin-right:0.5em;"></i>
                                     <a href="/Admin/DetallesRegistroEncuestaOpc?registro=${data[i].iIdRegistroOpc}">
                                        Detalles
                                    </a>
                                </td>
                            </tr>
                         `;
                    }
                }
            });
        } catch (err) {
            console.error('Error ', err);
        }
    }

    fdatacharts = (keyEmp) => {
        console.log(keyEmp)
        try {
            $.ajax({
                url: "../Admin/GraficaEncuestaOpcionalPorEmpresa",
                type: "POST",
                data: { key : keyEmp },
                success: function (data) {
                    if (data.estado == "success") {
                        satencion = data.siatencion;
                        natencion = data.noatencion;
                    }
                },
                error: function (err) {
                    console.error(err);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    loaddatachart = () => {
        try {
            $.ajax({
                url: "../Admin/GraficaEncuestaOpcional",
                type: "POST",
                data: {},
                success: function (data) {
                    if (data.estado == "success") {
                        satencion = data.siatencion;
                        natencion = data.noatencion;
                    }
                }, 
                error: function (err) {
                    console.error(err);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    //loaddatachart();

    google.charts.load('current', { 'packages': ['bar'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Resultado', 'Personas', { role: 'style' }],
            ['Si requieren atención clinica', parseInt(satencion), 'stroke-color: #000000; stroke-width: 1; fill-color: #000000'],
            ['No requieren atención clinica', parseInt(natencion), 'stroke-color: #703593; stroke-width: 4; fill-color: #C5A5CF']
        ]);

        var options = {
            is3D: true,
            width: 550,
            chart: {
                title: 'Grafica',
                subtitle: ' !Importante¡ Solo toma los valores de los usuarios que han contestado las encuestas',
            },
            bars: 'vertical'
        };

        var chart = new google.charts.Bar(document.getElementById('piechart'));

        chart.draw(data, google.charts.Bar.convertOptions(options));
    }

    ffilas = () => {
        let filas = '', estado = '', resatencion = '', colres = '';
        for (var i = 0; i < arrusers.length; i++) {
            if (arrusers[i][i].sDiagnosticoOpcDetalle != "") {
                resatencion = arrusers[i][i].sDiagnosticoOpcDetalle;
            } else {
                resatencion = "Sin resultado";
            }
            if (resatencion == "Requiere atención clínica") {
                colres = 'red !important';
            } else if (resatencion == "No requiere valoración clínica") {
                colres = 'rgb(51, 162, 255) !important';
            } else { colres = '#000'; }
            if (arrusers[i][i].iEstadoEncOpc == 1) {
                estado = 'Contestada';
            } else {
                estado = 'Sin contestar';
            }
            filas += `
                <tr style="font-size:12px !important;">
                    <td> ${arrusers[i][i].sNombreEmpleadoOpc}. </td> 
                    <td> ${arrusers[i][i].sEmpresa}. </td>
                    <td> ${arrusers[i][i].sPuestoEmOpc}. </td>
                    <td> ${arrusers[i][i].sFechaEncOpc} </td>
                    <td> <span style="color:${colres};">${resatencion}.</span> </td>
                    <td> ${estado}. </td>
                </tr>
            `;
        }
        return filas;
    }

    fimprimirtab = () => {
        const chart = document.getElementById('piechart');
        var ventana = window.open('', '_blank');
        ventana.document.head.innerHTML = (`<style> 
            body { font-family: sans-serif !important; }
            .list-n { list-style: none !important; }
            .mli { margin-left:20px !important; color:red !important; }
            .mti { margin-top:10px !important; }
            table { border-collapse:collapse; border-radius:40%; }

        </style>`);
        ventana.document.body.innerHTML += `
            <br/>
            <br/>
            <h3 style="text-align:center;">Cuestionario acontecimientos traumáticos severos.</h3>
            <hr style="height:2px !important;" /><br/>
            `;
        ventana.document.body.innerHTML += '<div style="margin-left:6em !important;">' + chart.innerHTML +'</div>';
        ventana.document.body.innerHTML += `
            <table width="100%" border="1" style="margin-top:40px;">
                <thead style="padding:40px; text-align:left; font-size:14px;">
                    <tr>
                        <th style="padding:7px;"> Nombre </th>
                        <th style="padding:7px;"> Empresa </th>
                        <th style="padding:7px;"> Puesto </th>
                        <th style="padding:7px;"> Asignación </th>
                        <th style="padding:7px;"> Diagnostico </th>
                        <th style="padding:7px;"> Estado </th>
                    </tr>
                </thead>  
                <tbody style="padding:30px !important;">
                    ${ffilas()}
                </tbody>
            </table>
        `;
        ventana.document.title = '';
        ventana.print();
        ventana.close();
    }

    document.getElementById('btnprint').addEventListener('click', () => {
        fimprimirtab();
    });

    //document.getElementById('btnmostgraph').addEventListener('click', () => {
    //    $("#divtabla").hide(1000);
    //});

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
        if (puesto.value == '') {
            codigoasc.value = "";
        }
        if (empresa.value != "none") {
            if (empleado.value != "") {
                //txtempresa = $('select[name="empresasel"] option:selected').text();
                txtempresa = document.getElementById('empsel').value;
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