document.addEventListener('DOMContentLoaded', () => {

    $("#tabmails").hide();

    fviewdata = (param) => {
        try {
            $.ajax({
                url: "../Admin/ViewDataMail",
                type: "POST",
                data: { buzon: param },
                success: function (data) {
                    if (data.sMensaje === "success") {
                        $("#viewMail").modal("show");
                        document.getElementById('boss').textContent = data.sJefeArea;
                        document.getElementById('description').textContent = data.sDescripcion;
                        document.getElementById('location').textContent = data.sLugar;
                        document.getElementById('dateevent').textContent = data.sFecha;
                    } else {
                        location.reload();
                    }
                }, error: function (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    fprintmailbox = (param) => {
        $.ajax({
            url: "../Admin/ViewDataMail",
            type: "POST",
            data: { buzon: param },
            success: function (data) {
                if (data.sMensaje === "success") {
                    var ventana = window.open('', '_blank');
                    ventana.document.head.innerHTML = (
                        `<style>
                            body { font-family: sans-serif !important; } 
                            .h2-title { color: blue !important; text-align: center !important; }
                            table { border-collapse:collapse; border-radius:40%; }
                        </style>`
                    );
                    ventana.document.body.innerHTML +=`<br/><br/><h3 style="text-align:center;"> ${data.sEmpresa} </h3><hr style="height:2px !important;" /><br/>`;
                    ventana.document.body.innerHTML += '<br/>';
                    ventana.document.body.innerHTML += 
                    `<table width="100%" style="margin-top:10px; margin-bottom:20px; padding:6em !important;" border="1">
                        <caption style="margin-bottom:30px;"> <b>Queja o sugerencia</b> </caption>
                        <thead style="padding:40px;">
                            <tr>
                                <td style="padding:7px;" width="150">
                                    <span style="margin-right:5px; margin-left:5px; color: rgb(107, 219, 237) !important;">&#9679;</span>
                                    <b>Jefe de área:</b>
                                </td>
                                <td style="padding:7px;"> <span style="text-transform:capitalize;"> ${data.sJefeArea}. </span> </td>
                            </tr>
                            <tr>
                                <td style="padding:7px;">
                                    <span style="margin-right:5px; margin-left:5px; color: rgb(107, 219, 237) !important;">&#9679;</span>
                                    <b> Descripción: </b>
                                </td>
                                <td style="padding:7px;"> ${data.sDescripcion}. </td>
                            </tr>
                            <tr>
                                <td style="padding:7px;">
                                    <span style="margin-right:5px; margin-left:5px; color: rgb(107, 219, 237) !important;">&#9679;</span>
                                    <b>Lugar:</b>
                                </td>
                                <td style="padding:7px;">
                                    ${data.sLugar}.
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:7px;">
                                    <span style="margin-right:5px; margin-left:5px; color: rgb(107, 219, 237) !important;">&#9679;</span>
                                    <b>Fecha:</b>
                                </td>
                                <td style="padding:7px;"> ${data.sFecha}. </td>
                            </tr>
                        </thead>          
                        <tbody>
                            
                        </tbody>
                    </table>`;
                    ventana.print();
                    ventana.close();
                }
            }, error: function (error) {
                console.log(error);
            }
        });
    }

    floaddatamailbox = () => {
        const tbodymails = document.getElementById('tbodymails');
        try {
            $.ajax({
                url: "../Admin/DataMailBox",
                type: "POST",
                data: {},
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        tbodymails.innerHTML += `
                            <tr>
                                <td><a href="/Admin/Detalles?empresa=${data[i].iIdEmpresa}" class="btn btn-sm btn-block col-btn-form1"> <i class="fas fa-building mr-2"></i> ${data[i].sEmpresa} </a></td>
                                <td class="text-capitalize">${data[i].sJefeArea}</td>
                                <td>${data[i].sFecha}</td>
                                <td>
                                    <a href="#" title="Ver completo" onclick="fviewdata(${data[i].iIdBuzon})" class="btn btn-sm col-btn-form1"> <i class="fas fa-eye"></i> </a> 
                                    <a href="#" title="Imprimir" onclick="fprintmailbox(${data[i].iIdBuzon})" class="btn btn-sm col-btn-form1 ml-2"> <i class="fas fa-print"></i> </a>
                                </td>
                            </tr>
                        `;
                    }
                }, error: function (error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    setTimeout(() => {
        $("#tabmails").DataTable({
            language: {
                "decimal": "",
                "emptyTable": "No hay información",
                "info": "Mostrando _START_ a _END_ de _TOTAL_ Entradas",
                "infoEmpty": "Mostrando 0 to 0 of 0 Entradas",
                "infoFiltered": "(Filtrado de _MAX_ total entradas)",
                "infoPostFix": "",
                "thousands": ",",
                "lengthMenu": "Mostrar _MENU_ Entradas",
                "loadingRecords": "Cargando...",
                "processing": "Procesando...",
                "search": "Buscar:",
                "zeroRecords": "Sin resultados encontrados",
                "paginate": {
                    "first": "Primero",
                    "last": "Ultimo",
                    "next": "Siguiente",
                    "previous": "Anterior"
                }
            },
        });
        $("#tabmails").show('1000');
    }, 1000);

    floaddatamailbox();

});