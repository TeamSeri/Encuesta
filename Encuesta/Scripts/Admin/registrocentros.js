document.addEventListener('DOMContentLoaded', () => {

    const contain = document.getElementById('containcentros');
    let tipoEnc = "", estact = 0, listenv = 0, ident = 0;

    datareg = (emp) => {
        try {
            $.ajax({
                url: "../Admin/RegistrosCentros",
                type: "POST",
                data: { empresa: emp },
                success: function (data) {
                    var estado = "";
                    valid = data.length;
                    if (valid > 0) {
                        for (var i = 0; i < data.length; i++) {
                            contain.innerHTML += `
                            <div class="col-lg-4 col-md-4 col-sm-6" style="margin-bottom:2em !important;">
                                <div class="card">
                                    <div class="text-right" style="margin-top:-1em !important; margin-left:15em; padding-top:0em !important;">
                                        <button onclick="feditcentro(${data[i].iIdCentroTrabajo},'${data[i].sCentroTrabajo}','${data[i].sUbicacionCentro}')" class="btn btn-sm btn-primary"> <i class="fas fa-edit"></i> </button>
                                    </div>
                                    <h5 class="text-center">
                                        <i class="fas fa-building fa-lg color-primary" style="margin-right:0.5em !important;"></i> <span><b>${data[i].sCentroTrabajo}</b></span>
                                    </h5>
                                    <hr style="height:2px !important;" />
                                    <div class="card-body">
                                        <ul class="list-group">
                                            <li class="list-group-item"> <i class="fas fa-map-marked-alt color-primary" style="margin-right:0.5em !important;"></i> ${data[i].sUbicacionCentro}</span>. </li>
                                        </ul>
                                    </div>
                                    <div class="text-center">
                                        <a href="/Admin/CentroTrabajo?registro=${data[i].iIdCentroTrabajo}&empresa=${emp}">
                                            <i class="fas fa-eye" style="margin-right:0.5em !important;"></i> Ver detalles
                                        </a>
                                    </div>
                                </div>
                            </div>`;
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
                        document.getElementById('btnnewregcentro').classList.add('mostbtn');
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

    fswalmsg = (element, type, msgtext, param) => {
        swal({
            text: msgtext,
            icon: type,
            closeOnClickOutside: false,
            closeOnEsc: false,
        }).then((acepta) => {
            if (param === 1) {
                location.reload();
            } else {
                element.focus();
            }
        });
    }

    const clvcentro = document.getElementById('clvcentro');
    const nomcent = document.getElementById('nomcent');
    const centron = document.getElementById('centro_nom');
    const centrou = document.getElementById('ubicacion_nom');
    const centronorg = document.getElementById('centron_org');
    const ubicacionorg = document.getElementById('ubicacionc_org');

    feditcentro = (centro, centronomb, centroubic) => {
        clvcentro.value = centro;
        nomcent.textContent = centronomb;
        centron.value = centronomb;
        centrou.value = centroubic;
        centronorg.value = centronomb;
        ubicacionorg.value = centroubic;
        $("#editcentro").modal("show");
    }

    flimpeditcent = () => {
        clvcentro.value = "";
        nomcent.textContent = "";
        centron.value = "";
        centrou.value = "";
        centronorg.value = "";
        ubicacionorg.value = "";
    }

    document.getElementById('btncloseeditcen').addEventListener('click', flimpeditcent);

    document.getElementById('btnsaveeditcent').addEventListener('click', () => {
        if (centron.value != "") {
            if (centrou.value != "") {
                if (clvempcentro.value != "" || clvempcentro.value != "0" || clvempcentro.value != 0) {
                    if (centron.value != centronorg.value || centrou.value != ubicacionorg.value) {
                        const dataEnv = { centro: clvcentro.value, nombrec: centron.value, ubicacionc: centrou.value };
                        const clvempdat = document.getElementById('clvempdat');
                        $.ajax({
                            url: "../Admin/EditarCentros",
                            type: "POST",
                            data: dataEnv,
                            success: function (data) {
                                if (data.resp == "correct") {
                                    contain.innerHTML = "";
                                    swal({
                                        title: "Correcto",
                                        text: "Datos actualizados",
                                        icon: "success",
                                        closeOnEsc: false,
                                        closeOnClickOutside: false
                                    }).then((acepta) => {
                                        $("#editcentro").modal("hide");
                                        flimpeditcent();
                                    });
                                    setTimeout(() => {
                                        datareg(clvempdat.value);
                                    }, 100);
                                } else if (data.resp == "incorrect") {
                                    swal({
                                        title: "Error",
                                        text: "No se actualizaron los datos, informe del problema",
                                        icon: "error",
                                        closeOnClickOutside: false,
                                        closeOnEsc: false
                                    }).then((acepta) => {
                                        location.reload();
                                    });
                                }
                            }, error: function (err) {
                                console.log(err);
                            }
                        });
                    } else {
                        swal({
                            text: "No hay nada que actualizar",
                            icon: "info",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then((acepta) => {
                            $("#editcentro").modal("hide");
                        });
                    }
                } else {
                    fswalmsg(clvempcentro,"error","El código ha sido modificado",1);
                }
            } else {
                fswalmsg(centrou, "warning", "Ingrese la ubicación del centro de trabajo",0);
            }
        } else {
            fswalmsg(centron,"warning","Ingrese el nombre del centro de trabajo",0);
        }
    });

    document.getElementById('btnregcentro').addEventListener('click', () => {
        const centrotra = document.getElementById('centrotra');
        const ubicacion = document.getElementById('ubicacion');
        if (centrotra.value != "") {
            if (ubicacion.value != "") {
                const nomempcentro = document.getElementById('nomempcentro');
                const clvempcentro = document.getElementById('clvempcentro');
                const dataEnv = { clvemp: clvempcentro.value, centro: centrotra.value, ubicacion : ubicacion.value };
                $.ajax({
                    url: "../Admin/CentroDeTrabajo",
                    type: "POST",
                    data: dataEnv,
                    success: function (data) {
                        if (data.resp == "correct") {
                            swal({
                                title: "Correcto",
                                text: "Datos registrados",
                                icon: "success",
                                closeOnClickOutside: false,
                                closeOnEsc: false
                            }).then((acepta) => {
                                location.reload();
                            });
                        } else if (data.resp == "incorrect") {
                            swal({
                                title: "Error",
                                text: "No se registro el centro de trabajo",
                                icon: "error",
                                closeOnClickOutside: false,
                                closeOnEsc: false
                            }).then((acepta) => {
                                centrotra.value = "";
                                ubicacion.value = "";
                            });
                        }
                    }, error: function (error) {
                        console.log(error);
                    }
                });
            } else {
                swal({
                    text: "Ingresa la ubicación del centro de trabajo",
                    icon: "warning",
                    closeOnClickOutside: false,
                    closeOnEsc: false
                }).then((acepta) => {
                    centrotra.focus();
                });
            }
        } else {
            swal({
                text: "Ingresa el nombre del centro de trabajo",
                icon: "warning",
                closeOnClickOutside: false,
                closeOnEsc: false
            }).then((acepta) => {
                centrotra.focus();
            });
        }
    });

});