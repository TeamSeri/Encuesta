document.addEventListener('DOMContentLoaded', () => {

    const contain = document.getElementById('contain_reg');
    const btndesc = document.getElementById('btndesc');
    btndesc.disabled = true;
    let tipoEnc = "", estact = 0, listenv = 0, ident = 0;

    datareg = (emp) => {
        try {
            $.ajax({
                url: "../Admin/DetallesRegistros",
                type: "POST",
                data: { empresa: emp },
                success: function (data) {
                    var estado = "";
                    valid = data.length;
                    if (valid > 0) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].sTipoEncuesta == 'E1') {
                                tipoEnc = 'Encuesta 1';
                            } else if (data[i].sTipoEncuesta == 'E2') {
                                tipoEnc = 'Encuesta 2';
                            }
                            if (data[i].iActivo == 1) {
                                estado = 'Activo';
                                estact = 1;
                                descdiv = `
                                    <div class="text-center">
                                            <form>
                                                <div class="form-group">
                                                    <input class="margin-radio" type="checkbox" value="${data[i].iIdRegistroEmpresas}" id="desc" />
                                                    <label class="form-check-label text-danger" style="margin-left:1em !important;">Desactivar</label>
                                                </div>
                                            </form>
                                        </div>
                                `;
                            } else if (data[i].iActivo == 0) {
                                estado = 'Inactivo';
                                descdiv = '';
                            }
                            contain.innerHTML += `
                            <div class="col-lg-4 col-md-4 col-sm-6">
                                <div class="card">
                                    <h5 class="text-center">
                                        <i class="fas fa-calendar fa-lg color-primary" style="margin-right:0.5em !important;"></i> <span><b>${data[i].sMes} - ${data[i].sFechaAnio}</b></span>
                                    </h5>
                                    <hr style="height:2px !important;" />
                                    <div class="card-body">
                                        <ul class="list-group">
                                            <li class="list-group-item">Empleados: <span class="badge badge-primary" id="empleados">${data[i].iEmpleados}</span> </li>
                                            <li class="list-group-item">Aplicaciones requeridas: <span class="badge badge-primary" id="requeridas">${data[i].iAplicacionesReq}</span> </li>
                                            <li class="list-group-item">Aplicaciones restantes: <span class="badge badge-primary" id="restantes">${data[i].iAplicacionesReq - data[i].iAplicacionesRealizadas}</span> </li>
                                            <li class="list-group-item">Tipo de encuesta: <span class="badge badge-primary" id="tipo">${tipoEnc}</span></li>
                                            <li class="list-group-item">Codigo: <span class="badge badge-primary" id="codigo">${data[i].sCodigoEmpresa}</span> </li>
                                             <li class="list-group-item">Estado: <span class="badge badge-primary" id="codigo">${estado}</span> </li>
                                        </ul>
                                    </div>
                                    ${descdiv}
                                    <hr/>
                                    <div class="row text-center">
                                        <div class="col-lg-12">
                                            <b>
                                                <i class="fas fa-external-link-alt color-primary" style="margin-right:0.5em;"></i>
                                                <a href="/Admin/DetallesRegistrosEncuesta?registro=${data[i].iIdRegistroEmpresas}&empresa=${emp}&tipo=${data[i].sTipoEncuesta}">Detalles registro</a>
                                            </b>
                                        </div>
                                     </div>
                                </div>
                            </div>`;
                            const desc = document.getElementById('desc');
                            if (desc) {
                                desc.addEventListener('click', () => {
                                    const dcheck = desc.checked;
                                    if (dcheck) {
                                        btndesc.disabled = false;
                                        btndesc.classList.remove('animatdesc');
                                        btndesc.classList.add('animat');
                                        listenv = 1;
                                    } else {
                                        btndesc.disabled = true;
                                        btndesc.classList.remove('animat');
                                        btndesc.classList.add('animatdesc');
                                        listenv = 0;
                                    }
                                });
                            }
                        }
                    } else {
                        contain.innerHTML = `
                            <div>
                                <br/><br/>
                                <h3 class="text-center"><b> <i class="fas fa-info color-primary" style="margin-right:0.5em !important;"></i> Añada un nuevo registro para continuar</b></h3>
                                <br/>
                                <div style="padding:3em !important">
                                    <p style="font-size:20px;" class="text-center"> Complete todos los campos del formulario <span class="color-primary">Nuevo Registro</span>, asegurese de desactivar las encuestas que su fecha de realización ya haya pasado, cualquier duda o problema reporte a sistemas <i class="fas fa-headset color-primary" style="margin-lef:0.5em !important;"></i>.</p>
                                </div>
                            </div>
                       `;
                        document.getElementById('btnnewreg').classList.add('mostbtn');
                    }
                },
                error: function (xhr, status) {
                    console.error(xhr);
                }
            });
        } catch (err) {
            if (err instanceof TypeError) {
                console.error("TypeError ", err);
            } else if (err instanceof RangeError) {
                console.error("RangeError ", err);
            } else if (err instanceof EvalError) {
                console.error("EvalError ", err);
            } else {
                console.err("Error ", err);
            }
        }
    }

    btndesc.addEventListener('click', () => {
        if (btndesc.disabled == false) {
            if (listenv == 1) {
                const reg = desc.value;
                swal({
                    title: "Atención",
                    text: "Desea continuar?",
                    buttons: {
                        cancel: {
                            text: "Cancelar",
                            visible: true,
                            closeModal: true,
                            value: false
                        },
                        confirm: {
                            text: "Confirmar",
                            visble: true,
                            value: true
                        }
                    }
                }).then((acepta) => {
                    if (acepta) {
                        $.ajax({
                            url: "/Admin/DesactivaRegistro",
                            type: "POST",
                            data: { clvreg: reg },
                            success: function (data) {
                                if (data.estado == "success") {
                                    swal({
                                        title: "Correcto",
                                        text: "Registro desactivado",
                                        icon: "success",
                                        closeOnClickOutside: false,
                                        closeOnEsc: false,
                                        buttons: {
                                            confirm: {
                                                text: "Ok",
                                                closeModal: true
                                            }
                                        }
                                    }).then((acepta) => {
                                        location.reload();
                                    });
                                } else if (data.estado == "error") {
                                    swal({
                                        title: "Error al desactivar",
                                        text: "Intente más tarde",
                                        icon: "error",
                                        closeOnClickOutside: false,
                                        closeOnEsc: false,
                                        buttons: {
                                            confirm: {
                                                text: "Aceptar",
                                                closeModal: true
                                            }
                                        }
                                    }).then((acepta) => {
                                        location.reload();
                                    });
                                } else {
                                    swal({
                                        title: "Error",
                                        text: "Contacte a sistemas",
                                        icon: "error",
                                        closeOnClickOutside: false,
                                        closeOnEsc: false,
                                        buttons: {
                                            confirm: {
                                                text: "Aceptar",
                                                closeModal: true
                                            }
                                        }
                                    }).then((acepta) => {
                                        location.reload();
                                    });
                                }
                            },
                            error: function (err) {
                                console.error('Ocurrio un problema');
                            }
                        });
                    }
                });
            }
        }
    });

    const regdatos = document.getElementById('regDatosEmpresa');

    const nomemp = document.getElementById('nomemp');
    const empleados = document.getElementById('empleados');
    const requeridas = document.getElementById('requeridas');
    const tipo = document.getElementById('tipo');
    const codigo = document.getElementById('codigo');
    const mes = document.getElementById('mes');
    const anio = document.getElementById('anio');

    const codp = Math.round(Math.random() * (10 - 1) + 1);
    const code = Math.round(Math.random() * (9999 - 2) + 1);

    let formatcode = "";

    for (var i = 19; i < 31; i++) {
        anio.innerHTML += `<option value="20${i}">20${i}</option>`;
    }

    empleados.addEventListener('keyup', () => {
        try {
            val_emp = empleados.value;
            const oper = ((val_emp * 9604) / 100) / ((25 * (val_emp - 1) + 9604) / 100);
            if (!isNaN(val_emp)) {
                if (val_emp >= 50) {
                    requeridas.value = parseInt(oper);
                    tipo.value = "E1";
                    formatcode = nomemp.value + String(val_emp) + String(requeridas.value) + tipo.value + 'TE' + String(code) + String(codp);
                    codigo.value = formatcode;
                } else {
                    requeridas.value = val_emp;
                    tipo.value = "E2";
                    formatcode = nomemp.value + String(val_emp) + String(requeridas.value) + tipo.value + 'TE' + String(code) + String(codp);
                    codigo.value = formatcode;
                }
            }
            if (val_emp == "") {
                tipo.value = "";
                codigo.value = "";
            }
        } catch (err) {
            console.error(err);
        }
    });

    limpform = () => {
        empleados.value = "";
        mes.value = "none";
        anio.value = "none";
        requeridas.value = "";
        tipo.value = "";
        codigo.value = "";
    }

    document.getElementById('btnclreg').addEventListener('click', limpform);
    document.getElementById('icoclreg').addEventListener('click', limpform);

    const btnsareg = document.getElementById('btnsareg');

    btnsareg.addEventListener('click', () => {
        if (empleados.value > 0) {
            if (mes.value != "none") {
                if (anio.value != "none") {
                    let dataenv = {
                        "empresa": document.getElementById('clvemp').value,
                        "empleados": empleados.value,
                        "requeridas": requeridas.value,
                        "tipo": tipo.value,
                        "codigo": codigo.value,
                        "mes": mes.value,
                        "anio": anio.value
                    }
                    $.ajax({
                        url: "/Admin/RegDetallesEmpresa",
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
                            } else if (data.mensaje == "errorins") {
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
                            } else if (data.mensaje == "errorval") {
                                swal({
                                    title: "Atención!",
                                    text: "Desactive las encuestas anteriores para proceder con el registro",
                                    icon: "warning",
                                    closeOnClickOutside: false,
                                    closeOnEsc: false
                                }).then((acepta) => {
                                    limpform();
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
                        text: "Selecciona un año",
                        icon: "warning",
                        closeOnClickOutside: false,
                        closeOnEsc: false
                    }).then((acepta) => {
                        anio.focus();
                    });
                }
            } else {
                swal({
                    text: "Selecciona un mes",
                    icon: "warning",
                    closeOnClickOutside: false,
                    closeOnEsc: false
                }).then((acepta) => {
                    mes.focus();
                });
            }
        } else {
            swal({
                text: "Ingresa la cantidad de empleados",
                icon: "warning",
                closeOnClickOutside: false,
                closeOnEsc: false
            }).then((acepta) => {
                empleados.focus();
            });
        }
    });
   
});