document.addEventListener('DOMContentLoaded', () => {

    const bodrep = document.getElementById('bodrep');

    floadreports = () => {
        try {
            $.ajax({
                url: "../Admin/NotificaReportesRes",
                type: "POST",
                data: { clvuser: 0, tipo: 'AllAdminAll' },
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        let estado = "";
                        if (data[i].iEstadoReporte == 0) {
                            estado = "Solucionado";
                            bodrep.innerHTML += `
                            <tr>
                                <td>${data[i].sCodigoReporte}</td>
                                <td>${data[i].sUsuarioReporte}</td>
                                <td>${data[i].sContenidoReporte}</td>
                                <td>${data[i].sEmpresReporte}</td>
                                <td>${estado}</td>
                                <td>
                                    <button onclick="fdetailsrep('${data[i].sCodigoReporte}','${data[i].sUsuarioReporte}','${data[i].sEmpresReporte}', '${data[i].sContenidoReporte}','${data[i].sMensajeReporte}')" title="Detalles" class="btn btn-sm btn-primary"> <i class="fas fa-eye"></i> </button>
                                </td>
                            </tr>
                        `;
                        } else {
                            estado = "Pendiente";
                            bodrep.innerHTML += `
                            <tr>
                                <td>${data[i].sCodigoReporte}</td>
                                <td>${data[i].sUsuarioReporte}</td>
                                <td>${data[i].sContenidoReporte}</td>
                                <td>${data[i].sEmpresReporte}</td>
                                <td>${estado}</td>
                                <td>
                                    <button onclick="fupdaterep(${data[i].iIdReporte},'${data[i].sContenidoReporte}','${data[i].sCodigoReporte}')" title="Actualizar" class="btn btn-sm btn-primary"> <i class="fas fa-undo"></i> </button>
                                </td>
                            </tr>
                        `;
                        }
                    }
                }, error: function (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    floadreports();

    setTimeout(() => {
        $("#tabreport").DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
        });
    }, 500);

    fdetailsrep = (code, user, empre, probl, msj) => {
        document.getElementById('codreport').textContent = code;
        document.getElementById('namrep').textContent = user;
        document.getElementById('namemp').textContent = empre;
        document.getElementById('contprob').textContent = probl;
        document.getElementById('msjprob').textContent = msj;
        $("#detallesrep").modal("show");
    }

    fupdaterep = (user, content, code) => {
        document.getElementById('codreportupd').textContent = code;
        document.getElementById('contentreprob').textContent = content;
        document.getElementById('clvrepenv').value = user;
        $("#updrep").modal("show");
    }

    document.getElementById('btnclsupdrep').addEventListener('click', () => {
        document.getElementById('msjrep').value = "";
    });

    fgetCleanedString = (cadena) => {
        const specialChars = "!@#$^&%*();+=-[]\/{}|:<>?,.";
        for (var i = 0; i < specialChars.length; i++) {
            cadena = cadena.toString().replace(new RegExp("\\" + specialChars[i], 'gi'), '');
        }
        cadena = cadena.toLowerCase();
        cadena = cadena.replace(/á/gi, "a");
        cadena = cadena.replace(/é/gi, "e");
        cadena = cadena.replace(/í/gi, "i");
        cadena = cadena.replace(/ó/gi, "o");
        cadena = cadena.replace(/ú/gi, "u");
        cadena = cadena.replace(/ñ/gi, "n");
        return cadena;
    }

    document.getElementById('btnupdreport').addEventListener('click', () => {

        const msjrep = document.getElementById('msjrep');

        if (msjrep.value != "") {
            $.ajax({
                url: "../Admin/ActualizaReportesProb",
                type: "POST",
                data: { clvreport: document.getElementById('clvrepenv').value, estado: 0, msjreport: fgetCleanedString(msjrep.value) },
                success: function (data) {
                    if (data.resp == "success") {
                        bodrep.innerHTML = '';
                        setTimeout(() => {
                            floadreports();
                            floadnotifreport();
                        }, 500);
                        swal({
                            title: "Correcto!",
                            text: "Datos actualizados",
                            icon: "success",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then((acepta) => {
                            $("#updrep").modal("hide");
                            msjrep.value = "";
                        });
                    } else if (data.resp == "error") {
                        swal({
                            title: "Error!",
                            text: "Ocurrio un problema",
                            icon: "warning",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then((acepta) => {
                            location.reload();
                        });
                    } else {
                        console.log(data);
                    }
                }
            });
        } else {
            swal({
                title: "Atención!",
                text: "Escribe un mensaje",
                icon: "warning",
                closeOnClickOutside: false,
                closeOnEsc: false
            }).then((acepta) => {
                msjrep.focus();
            });
        }

    });

});