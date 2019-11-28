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
                                <td><a href="/Admin/Detalles?empresa=${data[i].iIdEmpresa}">${data[i].sEmpresa}</a></td>
                                <td class="text-capitalize">${data[i].sJefeArea}</td>
                                <td>${data[i].sFecha}</td>
                                <td> <a href="#" onclick="fviewdata(${data[i].iIdBuzon})"> Detalles </a> </td>
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
        $("#tabmails").DataTable();
        $("#tabmails").show('1000');
    }, 1000);

    floaddatamailbox();

});