document.addEventListener('DOMContentLoaded', () => {

    const msjreport = document.getElementById('msjreport');
    const clvrep = document.getElementById('clvrep');
    const btnreport = document.getElementById('btnreport');

    fmsjswal = (title, element, type, text, param) => {
        swal({
            title: title,
            text: text,
            icon: type,
            closeOnClickOutside: false,
            closeOnEsc: false
        }).then((acepta) => {
            if (param == 0) {
                element.focus();
            } else if (param == 1) {
                location.href = '/Admin/Index';
            }
        });
    }

    fgetCleanedString = (cadena) => {
        // Definimos los caracteres que queremos eliminar
        const specialChars = "!@#$^&%*();+=-[]\/{}|:<>?,.";

        // Los eliminamos todos
        for (var i = 0; i < specialChars.length; i++) {
            cadena = cadena.toString().replace(new RegExp("\\" + specialChars[i], 'gi'), '');
        }

        // Lo queremos devolver limpio en minusculas
        cadena = cadena.toLowerCase();

        // Quitamos espacios y los sustituimos por _ porque nos gusta mas asi
        //cadena = cadena.replace(/ /g, "_");

        // Quitamos acentos y "ñ". Fijate en que va sin comillas el primer parametro
        cadena = cadena.replace(/á/gi, "a");
        cadena = cadena.replace(/é/gi, "e");
        cadena = cadena.replace(/í/gi, "i");
        cadena = cadena.replace(/ó/gi, "o");
        cadena = cadena.replace(/ú/gi, "u");
        cadena = cadena.replace(/ñ/gi, "n");
        return cadena;
    }

    btnreport.addEventListener('click', () => {
        try {
            if (msjreport.value.length > 0) {
                if (msjreport.value.length > 20 && msjreport.value.length <= 500) {
                    const code = Math.round(Math.random() * (999999 - 2) + 1);
                    const formatcode = "CR" + code;
                    const dataEnv = { keyreport: clvrep.value, msjreport: fgetCleanedString(msjreport.value), code: formatcode };
                    $.ajax({
                        url: "../Admin/EnvReportProblema",
                        type: "POST",
                        data: dataEnv,
                        success: function (data) {
                            if (data.resp == "success") {
                                fmsjswal("Correcto!", msjreport, "success", "Reporte enviado", 1);
                            } else if (data.resp == "error") {
                                fmsjswal("Error!", msjreport, "error", "Reporte no enviado, intente más tarde", 1);
                            } else {
                                console.log(data);
                            }
                        }, error: function (error) {
                            console.error(error);
                        }
                    });
                } else {
                    fmsjswal("Atención!", msjreport, "warning", "La descripción del problema de ser mayor de 20 caracteres y menor que 501 caracteres.", 0);
                }
            } else {
                fmsjswal("Atención!", msjreport, "warning", "Introduce la descripción del problema", 0);
            }
        } catch (error) {
            console.error(error);
        }

    });

    floadnotifreportcards = () => {
        const clvrep = document.getElementById('clvrep');
        const contrep = document.getElementById('contrep');
        try {
            $.ajax({
                url: "../Admin/NotificaReportesRes",
                type: "POST",
                data: { clvuser: clvrep.value, tipo: 'All' },
                success: function (data) {
                    let cant = data.length;
                    if (cant > 0) {
                        for (var i = 0; i < data.length; i++) {
                            if (data[i].iEstadoReporte == 0) {
                                contrep.innerHTML += `
                                    <div class="col-md-6">
                                        <div class="text-center card">
                                            <b class="text-center"> Código: <span>${data[i].sCodigoReporte}</span> </b> <hr/>
                                            <b> Estado: <i class="fas fa-check-circle" style="color:green !important;"></i> Resuelto </b>   <hr/>
                                            <p style="margin-top:1em !important; font-size:12px;"> <i class="fas fa-comments"></i> <b> Problema: </b> ${data[i].sContenidoReporte}  </p>
                                            <p style="margin-top:1em !important; font-size:12px;"> <i class="fas fa-comment"></i> <b> Mensaje: </b> ${data[i].sMensajeReporte}  </p>
                                        </div>
                                    </div>
                                `;
                            } else {
                                contrep.innerHTML += `
                                    <div class="col-md-6">
                                        <div class="text-center card">
                                            <b class="text-center"> Código: <span>${data[i].sCodigoReporte}</span> </b> <hr/>
                                            <b> Estado: <i class="fas fa-clock" style="color:yellow !important;"></i> Pendiente </b>   <hr/>
                                            <p style="margin-top:1em !important; font-size:12px;"> <i class="fas fa-comments"></i> <b> Problema: </b> ${data[i].sContenidoReporte}  </p>
                                        </div>
                                    </div>
                                `;
                            }
                        }
                    } else {
                        contrep.innerHTML += `
                            <h2 class="text-center text-primary" style="margin-top:2em !important;"> Aún no ha generado ningun reporte. </h2>
                        `;
                        document.getElementById('cantnotif').textContent = 0;
                    }
                }, error: function (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    floadnotifreportcards();


});