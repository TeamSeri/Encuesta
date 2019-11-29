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
                        console.log(data);
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
                                <td> <a href="#" onclick="fviewdata(${data[i].iIdBuzon})" class="btn btn-sm btn-block col-btn-form1"> <i class="fas fa-eye mr-2"></i> Detalles </a> </td>
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