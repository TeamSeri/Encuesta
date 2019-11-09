document.addEventListener('DOMContentLoaded', () => {

    let tipoEnc = "";

    dataemp = (param) => {
        try {
            $.ajax({
                url: "/Admin/DetallesRegistroEmpresa",
                type: "POST",
                data: { registro: param },
                success: function (data) {
                    document.getElementById('emp').textContent = data.sNombre;
                    document.getElementById('cen').textContent = data.sCentroTrabajo;
                    document.getElementById('emple').textContent = data.iEmpleados;
                    document.getElementById('req').textContent = data.iAplicacionesReq;
                    document.getElementById('cont').textContent = data.iAplicacionesRealizadas;
                    document.getElementById('rest').textContent = data.iAplicacionesReq - data.iAplicacionesRealizadas;
                    document.getElementById('anio').textContent = data.sFechaAnio;
                    document.getElementById('mes').textContent = data.sMes;
                    document.getElementById('code').textContent = data.sCodigoEmpresa;
                    if (data.sTipoEncuesta == 'E1') {
                        tipoEnc = 'Guia 3';
                    } else if (data.sTipoEncuesta == 'E2') {
                        tipoEnc = 'Guia 2';
                    }
                    document.getElementById('tipo').textContent = tipoEnc;
                },
                error: function (xhr, status) {
                    console.error(xhr);
                }
            });
        } catch (err) {
            if (err instanceof TypeError) {
                console.error("TypeError ", err);
            }
        }
    }

});