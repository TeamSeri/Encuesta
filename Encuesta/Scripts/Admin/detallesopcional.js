document.addEventListener('DOMContentLoaded', () => {

    let tipoRes = 0;

    floaddata = (param) => {
        try {
            $.ajax({
                url: "/Admin/DatosEncuestaOpcional",
                type: "POST",
                data: { registro: param },
                success: function (data) {
                    console.log(data);
                    if (data.mensaje == "success") {
                        tipoRes = data.tipo;
                        document.getElementById('nomem').textContent = data.empleado + ".";
                        document.getElementById('empre').textContent = data.empresa + ".";
                        document.getElementById('puest').textContent = data.puesto + ".";
                        document.getElementById('fechasig').textContent = data.fechareg;
                        document.getElementById('fecharel').textContent = data.fechacon;
                        document.getElementById('code').textContent = data.codigo;
                        document.getElementById('resdiag').textContent = data.diagnostico + ".";
                        if (data.tipo == 1) {
                            document.getElementById('resdiag').classList.add('color-danger');
                        } else {
                            document.getElementById('resdiag').classList.add('color-primary-s');
                        }
                    } else {
                        $('#contprin').hide();
                    }
                },
                err: function (xhr, status) {
                    console.error('error');
                }
            });
        } catch (err) {
            if (err instanceof TypeError) {
                console.error('TypeError ', err);
            } else if (err instanceof EvalError) {
                console.error('EvalError', err);
            } else if (err instanceof RangeError) {
                console.error('RangeError', err);
            } else {
                console.error('Error ', err);
            }
        }
    }

    function fimprimir() {
        let coldiag = '', simbolcode = '', simbolcode2 = '';
        if (tipoRes == 1) {
            coldiag = 'red';
            simbolcode = '&#33;';
            simbolcode2 = '&#161;';
        } else {
            coldiag = 'rgb(51, 162, 255) !important';
            simbolcode = '&#10004;';
        }
        var ventana = window.open('', '_blank');
        ventana.document.head.innerHTML = (`<style> 
            body { font-family: sans-serif !important; }
            .list-n { list-style: none !important; }
            .mli { margin-left:20px !important; color:red !important; }
            .mti { margin-top:10px !important; }
            table { border-collapse:collapse; border-radius:40%; }

        </style>`);
        ventana.document.body.innerHTML += '<br/><br/><h3 style="text-align:center;">Informe del cuestionario acontecimientos traumáticos severos.</h3><hr style="height:2px !important;" /><br/>';
        ventana.document.body.innerHTML += `
            <table width="100%" border="1" style="margin-top:40px;">
                <thead style="padding:40px;">
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color: rgb(51, 162, 255) !important;">&#9679;</span>
                            Aplico: <b style="color: rgb(51, 162, 255) !important;">${document.getElementById('nomem').textContent}</b>     
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color: rgb(51, 162, 255) !important;">&#9679;</span>
                            Empresa a la que pertenece: <b style="color: rgb(51, 162, 255) !important;">${document.getElementById('empre').textContent}</b>     
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color: rgb(51, 162, 255) !important;">&#9679;</span>
                            Puesto dentro de la empresa: <b style="color: rgb(51, 162, 255) !important;">${document.getElementById('puest').textContent}</b>     
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color: rgb(51, 162, 255) !important;">&#9679;</span>
                            Fecha de asignación: <b style="color: rgb(51, 162, 255) !important;">${document.getElementById('fechasig').textContent}</b>     
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color: rgb(51, 162, 255) !important;">&#9679;</span>
                            Fecha de realización: <b style="color: rgb(51, 162, 255) !important;">${document.getElementById('fecharel').textContent}</b>    
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color: rgb(51, 162, 255) !important;">&#9679;</span>
                            Código de acceso: <b style="color: rgb(51, 162, 255) !important;">${document.getElementById('code').textContent}</b>     
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color: rgb(51, 162, 255) !important;">&#9679;</span>
                            Diagnostico: <b style="color:${coldiag};">${simbolcode} ${document.getElementById('resdiag').textContent} ${simbolcode2} </b>     
                        </td>
                    </tr>
                </thead>
            </table>
        `;
        //ventana.document.title = 'Informe-Acontecimientos-Traumáticos-Severos-' + document.getElementById('nomem').textContent;
        ventana.print();
        ventana.close();
    }

    document.getElementById('printdata').addEventListener('click', () => {
        fimprimir();
    });

});