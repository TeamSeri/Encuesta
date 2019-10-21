document.addEventListener('DOMContentLoaded', () => {

    const empleados = document.getElementById('empleados');
    const requeridas = document.getElementById('requeridas');
    const restantes = document.getElementById('restantes');
    const tipo = document.getElementById('tipo');
    const codigo = document.getElementById('codigo');
    const contempresas = document.getElementById('contempresas');

    let tipoEnc = "";

    try {
        $.ajax({
            url: "../../EncuestaP/DatosEmpresas",
            type: "POST",
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].sTipoEncuesta == 'E1') {
                        tipoEnc = 'Encuesta 1';
                    } else if (data[i].sTipoEncuesta == 'E2') {
                        tipoEnc = 'Encuesta 2';
                    }
                    contempresas.innerHTML += `
                        <div class="col-lg-4 col-md-4 col-sm-6">
                            <div class="card">
                                <h5 class="text-center mar-t-0">
                                    <i class="fas fa-industry fa-lg"></i> <span><b>${data[i].sNombre}</b></span>
                                </h5>
                                <hr style="height:2px !important;" />
                                <div class="card-body">
                                    <ul class="list-group">
                                        <li class="list-group-item">Empleados: <span class="badge badge-primary" id="empleados">${data[i].iEmpleados}</span> </li>
                                        <li class="list-group-item">Aplicaciones requeridas: <span class="badge badge-primary" id="requeridas">${data[i].iAplicacionesReq}</span> </li>
                                        <li class="list-group-item">Aplicaciones restantes: <span class="badge badge-primary" id="restantes">${data[i].iAplicacionesRestantes}</span> </li>
                                        <li class="list-group-item">Tipo de encuesta: <span class="badge badge-primary" id="tipo">${tipoEnc}</span></li>
                                        <li class="list-group-item">Codigo: <span class="badge badge-primary" id="codigo">${data[i].sCodigoEmpresa}</span> </li>
                                    </ul>
                                </div>
                                <hr/>
                                <div class="row text-center">
                                    <div class="col-lg-12">
                                        <button class="btn btn-primary">
                                            Ver registros
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
        });
    } catch (err) {
        if (err instanceof TypeError) {
            console.error('TypeError ', err);
        } else if (err instanceof EvalError) {
            console.error('EvalError ', err);
        } else if (err instanceof RangeError) {
            console.error('RangeError ', err);
        } else {
            console.error('Error ', err);
        }
    }

});