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
                            console.log(data[i]);
                            contain.innerHTML += `
                            <div class="col-lg-4 col-md-4 col-sm-6">
                                <div class="card">
                                    <h5 class="text-center">
                                        <i class="fas fa-circle fa-lg color-primary" style="margin-right:0.5em !important;"></i> <span><b>${data[i].sCentroTrabajo}</b></span>
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