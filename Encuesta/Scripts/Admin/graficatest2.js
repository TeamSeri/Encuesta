document.addEventListener('DOMContentLoaded', () => {

    let cat1 = 0, cat2 = 0, cat3 = 0, cat4 = 0, cat5 = 0, cat6 = 0, cat7 = 0, dom3 = 0, dom4 = 0, dom5 = 0, dom6 = 0,
        dom7 = 0; dom8 = 0;
    let tipoEnc = "";
    const rescat = document.getElementById('rescat');
    const rescat2 = document.getElementById('rescat2');
    const rescat3 = document.getElementById('rescat3');
    const rescat4 = document.getElementById('rescat4');
    const resdom1 = document.getElementById('resdom1');
    const resdom2 = document.getElementById('resdom2');
    const resdom3 = document.getElementById('resdom3');
    const resdom4 = document.getElementById('resdom4');
    const resdom5 = document.getElementById('resdom5');
    const resdom6 = document.getElementById('resdom6');
    const resdom7 = document.getElementById('resdom7');
    const resdom8 = document.getElementById('resdom8');

    let validat = 0;

    datachartgen = (param1, param2) => {
        try {
            $.ajax({
                url: "/Admin/DatosGraficaGeneral",
                type: "POST",
                data: { registro: param1, tipo: param2 },
                success: function (data) {
                    const icodef = document.getElementById('icodef');
                    const txtpunt = document.getElementById('txtpunt'); 
                    if (data.mensaje == "success") {
                        const totres = parseFloat(data.result / data.realizadas).toFixed(2);
                        if (parseFloat(totres) < 20) {
                            icodef.classList.add('color-info-s');
                            txtpunt.textContent = 'Nulo o despreciable';
                        } else if (parseFloat(totres) >= 20 && parseFloat(totres) < 45) {
                            icodef.classList.add('color-primary-s');
                            txtpunt.textContent = 'Bajo';
                        } else if (parseFloat(totres) >= 45 && parseFloat(totres) < 70) {
                            icodef.classList.add('color-warning');
                            txtpunt.textContent = 'Medio';
                        } else if (parseFloat(totres) >= 70 && parseFloat(totres) < 90) {
                            icodef.classList.add('color-danger');
                            txtpunt.textContent = 'Alto';
                        } else if (parseFloat(totres) >= 90) {
                            icodef.classList.add('color-danger-s');
                            txtpunt.textContent = 'Muy alto';
                        }

                        document.getElementById('puntaje').textContent = totres + ".";
                    } else {
                        document.getElementById('divpunt').classList.add('d-none');
                    }
                },
                error: function (xhr, status) {
                    console.error('ocurrio un problema');
                }
            });
        } catch (err) {
            if (err instanceof TypeError) {
                console.error('TypeError ', err);
            } else {
                console.error('Error ', err);
            }
        }
    }

    datachart = (param) => {
        try {
            $.ajax({
                url: "/Admin/DatosGraficas2",
                type: "POST",
                data: { registro: param},
                success: function (data) {
                    const suma = parseInt(data.categoria1) + parseInt(data.categoria2) + parseInt(data.categoria3) + parseInt(data.categoria4);
                    if (suma > 0) {
                        //console.log(data.categoria2);
                        cat1 = parseFloat(data.categoria1 / data.realizadas).toFixed(2);
                        //console.log('Cat1 ' + cat1);
                        cat2 = parseFloat(data.categoria2 / data.realizadas).toFixed(2);
                        //console.log('Cat2 ' + cat2);
                        cat3 = parseFloat(data.categoria3 / data.realizadas).toFixed(2);
                        //console.log('Cat3 ' + cat3);
                        cat4 = parseFloat(data.categoria4 / data.realizadas).toFixed(2);
                        //console.log('Cat4 ' + cat4);
                        dom2 = parseFloat(data.dominio2 / data.realizadas).toFixed(2);
                        //console.log('Dom2 ' + dom2);
                        dom3 = parseFloat(data.dominio3 / data.realizadas).toFixed(2);
                        //console.log('Dom3 ' + dom3);
                        dom4 = parseFloat(data.dominio4 / data.realizadas).toFixed(2);
                        //console.log('Dom4 ' + dom4);
                        dom5 = parseFloat(data.dominio5 / data.realizadas).toFixed(2);
                        //console.log('Dom5 ' + dom5);
                        dom6 = parseFloat(data.dominio6 / data.realizadas).toFixed(2);
                        //console.log('Dom6 ' + dom6);
                        dom7 = parseFloat(data.dominio7 / data.realizadas).toFixed(2);
                        //console.log('Dom7 ' + dom7);
                        dom8 = parseFloat(data.dominio8 / data.realizadas).toFixed(2);
                        //console.log('Dom8 ' + dom8);
                        //Resultados para la categoria 1 Ambiente de trabajo
                        if (parseFloat(cat1) < 3) {
                            rescat.textContent = "Nulo o despreciable";
                            rescat.classList.add('bg-info');
                        } else if (parseFloat(cat1) >= 3 && parseFloat(cat1) < 5) {
                            rescat.textContent = "Bajo";
                            rescat.classList.add('bg-primary-s');
                        } else if (parseFloat(cat1) >= 5 && parseFloat(cat1) < 7) {
                            rescat.textContent = "Medio";
                            rescat.classList.add('bg-warning');
                        } else if (parseFloat(cat1) >= 7 && parseFloat(cat1) < 9) {
                            rescat.textContent = "Alto";
                            rescat.classList.add('bg-danger');
                        } else if (parseFloat(cat1) >= 9) {
                            rescat.textContent = "Muy Alto";
                            rescat.classList.add('bg-danger-s');
                        }
                        //Resultados para la categoria 2 Factores propios
                        if (parseFloat(cat2) < 10) {
                            rescat2.textContent = "Nulo o despreciable";
                            rescat2.classList.add('bg-info');
                        } else if (parseFloat(cat2) >= 10 && parseFloat(cat2) < 20) {
                            rescat2.textContent = "Bajo";
                            rescat2.classList.add('bg-primary-s');
                        } else if (parseFloat(cat2) >= 20 && parseFloat(cat2) < 30) {
                            rescat2.textContent = "Medio";
                            rescat2.classList.add('bg-warning');
                        } else if (parseFloat(cat2) >= 30 && parseFloat(cat2) < 40) {
                            rescat2.textContent = "Alto";
                            rescat2.classList.add('bg-danger');
                        } else if (parseFloat(cat2) >= 40) {
                            rescat2.textContent = "Muy Alto";
                            rescat2.classList.add('bg-danger-s');
                        }
                        //Resultados para la categoria 3 Organizacion del tiempo
                        if (parseFloat(cat3) < 10) {
                            rescat3.textContent = "Nulo o despreciable";
                            rescat3.classList.add('bg-info');
                        } else if (parseFloat(cat3) >= 10 && parseFloat(cat3) < 20) {
                            rescat3.textContent = "Bajo";
                            rescat3.classList.add('bg-primary-s');
                        } else if (parseFloat(cat3) >= 20 && parseFloat(cat3) < 30) {
                            rescat3.textContent = "Medio";
                            rescat3.classList.add('bg-warning');
                        } else if (parseFloat(cat3) >= 30 && parseFloat(cat3) < 40) {
                            rescat3.textContent = "Alto";
                            rescat3.classList.add('bg-danger');
                        } else if (parseFloat(cat3) >= 40) {
                            rescat3.textContent = "Muy Alto";
                            rescat3.classList.add('bg-danger-s');
                        }
                        //Resultados para la categoria 4 Liderazgo y relaciones
                        if (parseFloat(cat4) < 10) {
                            rescat4.textContent = "Nulo o despreciable";
                            rescat4.classList.add('bg-info');
                        } else if (parseFloat(cat4) >= 10 && parseFloat(cat4) < 20) {
                            rescat4.textContent = "Bajo";
                            rescat4.classList.add('bg-primary-s');
                        } else if (parseFloat(cat4) >= 20 && parseFloat(cat4) < 30) {
                            rescat4.textContent = "Medio";
                            rescat4.classList.add('bg-warning');
                        } else if (parseFloat(cat4) >= 30 && parseFloat(cat4) < 40) {
                            rescat4.textContent = "Alto";
                            rescat4.classList.add('bg-danger');
                        } else if (parseFloat(cat4) >= 40) {
                            rescat4.textContent = "Muy Alto";
                            rescat4.classList.add('bg-danger-s');
                        }
                        //Resultados por dominio 1
                        if (parseFloat(cat1) < 3) {
                            resdom1.textContent = "Nulo o despreciable";
                            resdom1.classList.add('bg-info');
                        } else if (parseFloat(cat1) >= 3 && parseFloat(cat1) < 5) {
                            resdom1.textContent = "Bajo";
                            resdom1.classList.add('bg-primary-s');
                        } else if (parseFloat(cat1) >= 5 && parseFloat(cat1) < 7) {
                            resdom1.textContent = "Medio";
                            resdom1.classList.add('bg-warning');
                        } else if (parseFloat(cat1) >= 7 && parseFloat(cat1) < 9) {
                            resdom1.textContent = "Alto";
                            resdom1.classList.add('bg-danger');
                        } else if (parseFloat(cat1) >= 9) {
                            resdom1.textContent = "Muy Alto";
                            resdom1.classList.add('bg-danger-s');
                        }
                        //Resultados por dominio 2
                        if (parseFloat(dom2) < 12) {
                            resdom2.textContent = "Nulo o despreciable";
                            resdom2.classList.add('bg-info');
                        } else if (parseFloat(dom2) >= 12 && parseFloat(dom2) < 16) {
                            resdom2.textContent = "Bajo";
                            resdom2.classList.add('bg-primary-s');
                        } else if (parseFloat(dom2) >= 16 && parseFloat(dom2) < 20) {
                            resdom2.textContent = "Medio";
                            resdom2.classList.add('bg-warning');
                        } else if (parseFloat(dom2) >= 20 && parseFloat(dom2) < 24) {
                            resdom2.textContent = "Alto";
                            resdom2.classList.add('bg-danger');
                        } else if (parseFloat(dom2) >= 24) {
                            resdom2.textContent = "Muy Alto";
                            resdom2.classList.add('bg-danger-s');
                        }
                        //Resultados por dominio 3
                        if (parseFloat(dom3) < 5) {
                            resdom3.textContent = "Nulo o despreciable";
                            resdom3.classList.add('bg-info');
                        } else if (parseFloat(dom3) >= 5 && parseFloat(dom3) < 8) {
                            resdom3.textContent = "Bajo";
                            resdom3.classList.add('bg-primary-s');
                        } else if (parseFloat(dom3) >= 8 && parseFloat(dom3) < 11) {
                            resdom3.textContent = "Medio";
                            resdom3.classList.add('bg-warning');
                        } else if (parseFloat(dom3) >= 11 && parseFloat(dom3) < 14) {
                            resdom3.textContent = "Alto";
                            resdom3.classList.add('bg-danger');
                        } else if (parseFloat(dom3) >= 14) {
                            resdom3.textContent = "Muy Alto";
                            resdom3.classList.add('bg-danger-s');
                        }
                        //Resultados por dominio 4
                        if (parseFloat(dom4) < 1) {
                            resdom4.textContent = "Nulo o despreciable";
                            resdom4.classList.add('bg-info');
                        } else if (parseFloat(dom4) >= 1 && parseFloat(dom4) < 2) {
                            resdom4.textContent = "Bajo";
                            resdom4.classList.add('bg-primary-s');
                        } else if (parseFloat(dom4) >= 2 && parseFloat(dom4) < 4) {
                            resdom4.textContent = "Medio";
                            resdom4.classList.add('bg-warning');
                        } else if (parseFloat(dom4) >= 4 && parseFloat(dom4) < 6) {
                            resdom4.textContent = "Alto";
                            resdom4.classList.add('bg-danger');
                        } else if (parseFloat(dom4) >= 6) {
                            resdom4.textContent = "Muy Alto";
                            resdom4.classList.add('bg-danger-s');
                        }
                        //Resultados por dominio 5
                        if (parseFloat(dom5) < 1) {
                            resdom5.textContent = "Nulo o despreciable";
                            resdom5.classList.add('bg-info');
                        } else if (parseFloat(dom5) >= 1 && parseFloat(dom5) < 2) {
                            resdom5.textContent = "Bajo";
                            resdom5.classList.add('bg-primary-s');
                        } else if (parseFloat(dom5) >= 2 && parseFloat(dom5) < 4) {
                            resdom5.textContent = "Medio";
                            resdom5.classList.add('bg-warning');
                        } else if (parseFloat(dom5) >= 4 && parseFloat(dom5) < 6) {
                            resdom5.textContent = "Alto";
                            resdom4.classList.add('bg-danger');
                        } else if (parseFloat(dom5) >= 6) {
                            resdom5.textContent = "Muy Alto";
                            resdom5.classList.add('bg-danger-s');
                        }
                        //Resultados por dominio 6
                        if (parseFloat(dom6) < 3) {
                            resdom6.textContent = "Nulo o despreciable";
                            resdom6.classList.add('bg-info');
                        } else if (parseFloat(dom6) >= 3 && parseFloat(dom6) < 5) {
                            resdom6.textContent = "Bajo";
                            resdom6.classList.add('bg-primary-s');
                        } else if (parseFloat(dom6) >= 5 && parseFloat(dom6) < 8) {
                            resdom6.textContent = "Medio";
                            resdom6.classList.add('bg-warning');
                        } else if (parseFloat(dom6) >= 8 && parseFloat(dom6) < 11) {
                            resdom6.textContent = "Alto";
                            resdom6.classList.add('bg-danger');
                        } else if (parseFloat(dom6) >= 11) {
                            resdom6.textContent = "Muy Alto";
                            resdom6.classList.add('bg-danger-s');
                        }
                        //Resultados por dominio 7
                        if (parseFloat(dom7) < 5) {
                            resdom7.textContent = "Nulo o despreciable";
                            resdom7.classList.add('bg-info');
                        } else if (parseFloat(dom7) >= 5 && parseFloat(dom7) < 8) {
                            resdom7.textContent = "Bajo";
                            resdom7.classList.add('bg-primary-s');
                        } else if (parseFloat(dom7) >= 8 && parseFloat(dom7) < 11) {
                            resdom7.textContent = "Medio";
                            resdom7.classList.add('bg-warning');
                        } else if (parseFloat(dom7) >= 11 && parseFloat(dom7) < 14) {
                            resdom7.textContent = "Alto";
                            resdom7.classList.add('bg-danger');
                        } else if (parseFloat(dom7) >= 14) {
                            resdom7.textContent = "Muy Alto";
                            resdom7.classList.add('bg-danger-s');
                        }
                        //Resultados por dominio 8
                        if (parseFloat(dom8) < 7) {
                            resdom8.textContent = "Nulo o despreciable";
                            resdom8.classList.add('bg-info');
                        } else if (parseFloat(dom8) >= 7 && parseFloat(dom8) < 10) {
                            resdom8.textContent = "Bajo";
                            resdom8.classList.add('bg-primary-s');
                        } else if (parseFloat(dom8) >= 10 && parseFloat(dom8) < 13) {
                            resdom8.textContent = "Medio";
                            resdom8.classList.add('bg-warning');
                        } else if (parseFloat(dom8) >= 13 && parseFloat(dom8) < 16) {
                            resdom8.textContent = "Alto";
                            resdom8.classList.add('bg-danger');
                        } else if (parseFloat(dom8) >= 16) {
                            resdom8.textContent = "Muy Alto";
                            resdom8.classList.add('bg-danger-s');
                        }
                    } else {
                        document.getElementById('contprinc').classList.add('d-none');
                        document.getElementById('contnone').innerHTML = `
                            <div class="row" style="margin-top:11em !important; margin-bottom:10em;">
                                <div class="col-lg-12">
                                    <h2 class="text-center" style="line-height:50px !important;"> No se pueden mostrar los detalles, debido a que no hay ninguna encuesta respondida para este registro, si cree que se trata de un error informe a sistemas <i class="fas fa-headset" style="margin-left:0.5em !important;"></i> . </h2>
                                </div>
                            </div>
                        `;
                    }
                    
                },
                error: function (xhr, status) {
                    console.error(xhr.status);
                }
            });
        } catch (err) {
            console.error(err);
        }
    };

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Porcentaje', 'Categorias'],
            ['Ambiente de trabajo', parseFloat(cat1)],
            ['Factores propios de la actividad', parseFloat(cat2)],
            ['Organización del tiempo de trabajo', parseFloat(cat3)],
            ['Liderazgo y relaciones en el trabajo', parseFloat(cat4)]
        ]);

        var options = {
            title: 'Porcentaje por categorias',
            is3D: true,
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }

    google.charts.load('current', { 'packages': ['corechart'] });
    google.charts.setOnLoadCallback(drawChart2);

    function drawChart2() {
        var data = google.visualization.arrayToDataTable([
            ['Porcentaje', 'Dominio'],
            //En condiciones de trabajo es el mismo resultado que la categoria 1 ambiente de trabajo
            ['Condiciones en el trabajo', parseFloat(cat1)],
            ['Carga de trabajo', parseFloat(dom2)],
            ['Falta de control sobre el trabajo', parseFloat(dom3)],
            ['Jornada de trabajo', parseFloat(dom4)],
            ['Interferencia en la relación trabajo-familia', parseFloat(dom5)],
            ['Liderazgo', parseFloat(dom6)],
            ['Relaciones en el trabajo', parseFloat(dom7)],
            ['Violencia', parseFloat(dom8)]
        ]);

        var options = {
            title: 'Porcentaje por dominio',
            is3D: true
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart2'));

        chart.draw(data, options);
    }

    function fimprimir(ds) {
        let rescat = document.getElementById('rescat').textContent,
            rescat2 = document.getElementById('rescat2').textContent,
            rescat3 = document.getElementById('rescat3').textContent,
            rescat4 = document.getElementById('rescat4').textContent,
            resdom1 = document.getElementById('resdom1').textContent,
            resdom2 = document.getElementById('resdom2').textContent,
            resdom3 = document.getElementById('resdom3').textContent,
            resdom4 = document.getElementById('resdom4').textContent,
            resdom5 = document.getElementById('resdom5').textContent,
            resdom6 = document.getElementById('resdom6').textContent,
            resdom7 = document.getElementById('resdom7').textContent,
            resdom8 = document.getElementById('resdom8').textContent;

        let colcat1 = '', colcat2 = '', colcat3 = '', colcat4 = '', coldom1 = '', coldom2 = '', coldom3 = '', coldom4 = '',
            coldom5 = '', coldom6 = '', coldom7 = '', coldom8 = '';

        // ** CONDICIONALES COLOR DE RESULTADO DE CATEGORIAS ** \\
        if (rescat == 'Nulo o despreciable') {
            colcat1 = 'rgb(107, 219, 237)';
        }
        else if (rescat == 'Bajo') { colcat1 = 'rgb(51, 162, 255)'; }
        else if (rescat == 'Medio') { colcat1 = 'rgb(255, 204, 51)'; }
        else if (rescat == 'Alto') { colcat1 = 'red'; }
        else if (rescat == 'Muy Alto') { colcat1 = '#CC0E00'; }

        if (rescat2 == 'Nulo o despreciable') {
            colcat2 = 'rgb(107, 219, 237)';
        }
        else if (rescat2 == 'Bajo') { colcat2 = 'rgb(51, 162, 255)'; }
        else if (rescat2 == 'Medio') { colcat2 = 'rgb(255, 204, 51)'; }
        else if (rescat2 == 'Alto') { colcat2 = 'red'; }
        else if (rescat2 == 'Muy Alto') { colcat2 = '#CC0E00'; }

        if (rescat3 == 'Nulo o despreciable') {
            colcat3 = 'rgb(107, 219, 237)';
        }
        else if (rescat3 == 'Bajo') { colcat3 = 'rgb(51, 162, 255)'; }
        else if (rescat3 == 'Medio') { colcat3 = 'rgb(255, 204, 51)'; }
        else if (rescat3 == 'Alto') { colcat3 = 'red'; }
        else if (rescat3 == 'Muy Alto') { colcat3 = '#CC0E00'; }

        if (rescat4 == 'Nulo o despreciable') {
            colcat4 = 'rgb(107, 219, 237)';
        }
        else if (rescat4 == 'Bajo') { colcat4 = 'rgb(51, 162, 255)'; }
        else if (rescat4 == 'Medio') { colcat4 = 'rgb(255, 204, 51)'; }
        else if (rescat4 == 'Alto') { colcat4 = 'red'; }
        else if (rescat4 == 'Muy Alto') { colcat4 = '#CC0E00'; }

        // ** CONDICIONALES COLOR DE RESULTADO DE DOMINIO ** \\
        if (resdom1 == 'Nulo o despreciable') {
            coldom1 = 'rgb(107, 219, 237)';
        }
        else if (resdom1 == 'Bajo') { coldom1 = 'rgb(51, 162, 255)'; }
        else if (resdom1 == 'Medio') { coldom1 = 'rgb(255, 204, 51)'; }
        else if (resdom1 == 'Alto') { coldom1 = 'red'; }
        else if (resdom1 == 'Muy Alto') { coldom1 = '#CC0E00'; }

        if (resdom2 == 'Nulo o despreciable') {
            coldom2 = 'rgb(107, 219, 237)';
        }
        else if (resdom2 == 'Bajo') { coldom2 = 'rgb(51, 162, 255)'; }
        else if (resdom2 == 'Medio') { coldom2 = 'rgb(255, 204, 51)'; }
        else if (resdom2 == 'Alto') { coldom2 = 'red'; }
        else if (resdom2 == 'Muy Alto') { coldom2 = '#CC0E00'; }

        if (resdom3 == 'Nulo o despreciable') {
            coldom3 = 'rgb(107, 219, 237)';
        }
        else if (resdom3 == 'Bajo') { coldom3 = 'rgb(51, 162, 255)'; }
        else if (resdom3 == 'Medio') { coldom3 = 'rgb(255, 204, 51)'; }
        else if (resdom3 == 'Alto') { coldom3 = 'red'; }
        else if (resdom3 == 'Muy Alto') { coldom3 = '#CC0E00'; }

        if (resdom4 == 'Nulo o despreciable') {
            coldom4 = 'rgb(107, 219, 237)';
        }
        else if (resdom4 == 'Bajo') { coldom4 = 'rgb(51, 162, 255)'; }
        else if (resdom4 == 'Medio') { coldom4 = 'rgb(255, 204, 51)'; }
        else if (resdom4 == 'Alto') { coldom4 = 'red'; }
        else if (resdom4 == 'Muy Alto') { coldom4 = '#CC0E00'; }

        if (resdom5 == 'Nulo o despreciable') {
            coldom5 = 'rgb(107, 219, 237)';
        }
        else if (resdom5 == 'Bajo') { coldom5 = 'rgb(51, 162, 255)'; }
        else if (resdom5 == 'Medio') { coldom5 = 'rgb(255, 204, 51)'; }
        else if (resdom5 == 'Alto') { coldom5 = 'red'; }
        else if (resdom5 == 'Muy Alto') { coldom5 = '#CC0E00'; }

        if (resdom6 == 'Nulo o despreciable') {
            coldom6 = 'rgb(107, 219, 237)';
        }
        else if (resdom6 == 'Bajo') { coldom6 = 'rgb(51, 162, 255)'; }
        else if (resdom6 == 'Medio') { coldom6 = 'rgb(255, 204, 51)'; }
        else if (resdom6 == 'Alto') { coldom6 = 'red'; }
        else if (resdom6 == 'Muy Alto') { coldom6 = '#CC0E00'; }

        if (resdom7 == 'Nulo o despreciable') {
            coldom7 = 'rgb(107, 219, 237)';
        }
        else if (resdom7 == 'Bajo') { coldom7 = 'rgb(51, 162, 255)'; }
        else if (resdom7 == 'Medio') { coldom7 = 'rgb(255, 204, 51)'; }
        else if (resdom7 == 'Alto') { coldom7 = 'red'; }
        else if (resdom7 == 'Muy Alto') { coldom7 = '#CC0E00'; }

        if (resdom8 == 'Nulo o despreciable') {
            coldom8 = 'rgb(107, 219, 237)';
        }
        else if (resdom8 == 'Bajo') { coldom8 = 'rgb(51, 162, 255)'; }
        else if (resdom8 == 'Medio') { coldom8 = 'rgb(255, 204, 51)'; }
        else if (resdom8 == 'Alto') { coldom8 = 'red'; }
        else if (resdom8 == 'Muy Alto') { coldom8 = '#CC0E00'; }


        const chart1 = document.getElementById('piechart');
        const chart2 = document.getElementById('piechart2');
        const txtpunt = document.getElementById('txtpunt').textContent;
        let colgeneral1, colgeneral2, colgeneral3, colgeneral4, colgeneral5 = '';
        let colnmalto = '#CC0E00', colnalto = 'red', colnmedio = 'rgb(255, 204, 51)', colnbajo = 'rgb(51, 162, 255)',
            colnnulo = 'rgb(107, 219, 237)';

        if (txtpunt == 'Nulo o despreciable') {
            colgeneral1 = 'rgb(107, 219, 237)';
        }
        else if (txtpunt == 'Bajo') { colgeneral2 = 'rgb(51, 162, 255)'; }
        else if (txtpunt == 'Medio') { colgeneral3 = 'rgb(255, 204, 51)'; }
        else if (txtpunt == 'Alto') { colgeneral4 = 'red'; }
        else if (txtpunt == 'Muy Alto') { colgeneral5 = '#CC0E00'; }

        var ventana = window.open('', '_blank');
        ventana.document.head.innerHTML = (`<style> 
            body { font-family: sans-serif !important; }
            .list-n { list-style: none !important; }
            .mli { margin-left:20px !important; color:red !important; }
            .mti { margin-top:10px !important; }
            table { border-collapse:collapse; border-radius:40%; }

        </style>`);
        ventana.document.body.innerHTML += '<h2 style="text-align:center;">Información de empresa: ' + document.getElementById('emp').textContent +'. </h2>';
        ventana.document.body.innerHTML += `
            <table width="100%" style="margin-top:40px; margin-bottom:20px;">
                <thead style="text-align:center;">
                    <td> <b> Año: </b> ${document.getElementById('anio').textContent}. </td>
                    <td> <b> Mes: </b> ${document.getElementById('mes').textContent}. </td>
                </thead>
            </table>
            <table width="100%" style="margin-top:20px; margin-bottom:20px;">
                <thead style="text-align:left;">
                    <td> <b> <span style="margin-right:1px;">&#9997;</span> Empleados:</b> ${document.getElementById('emple').textContent}. </td>
                    <td> <b> <span style="margin-right:1px;">&#9998;</span> Requeridas:</b> ${document.getElementById('req').textContent}. </td>
                    <td> <b> <span style="margin-right:1px;">&#8986;</span> Restantes:</b> ${document.getElementById('rest').textContent}. </td>
                    <td> <b> <span style="margin-right:1px;">&#10004;</span> Contestadas:</b> ${document.getElementById('cont').textContent}. </td>
                </thead>
            </table>
        `;
        ventana.document.body.innerHTML += `
            <table width="100%" border="1" style="margin-bottom:20px; margin-top:40px;">
                <thead>
                    <th style="padding:7px;">Resultado del cuestionario</th>
                    <th style="padding:7px;">Nulo o despreciable</th>
                    <th style="padding:7px;">Bajo</th>
                    <th style="padding:7px;">Medio</th>
                    <th style="padding:7px;">Alto</th>
                    <th style="padding:7px;">Muy alto</th>
                </thead>
                <tbody style="padding:30px !important;>
                    <tr>
                        <td style="padding:7px;"> </td>
                        <td style="padding:7px; text-align:center; "> Califiación del cuestionario ${document.getElementById('puntaje').textContent} </td>
                        <td style="padding:7px; text-align:center;"> <span style="margin-right:5px; margin-left:5px; color:${colgeneral1};">&#9673;</span>  </td>
                        <td style="padding:7px; text-align:center;"> <span style="margin-right:5px; margin-left:5px; color:${colgeneral2};">&#9673;</span> </td>
                        <td style="padding:7px; text-align:center;"> <span style="margin-right:5px; margin-left:5px; color:${colgeneral3};">&#9673;</span> </td>
                        <td style="padding:7px; text-align:center;"> <span style="margin-right:5px; margin-left:5px; color:${colgeneral4};">&#9673;</span> </td>
                        <td style="padding:7px; text-align:center;"> <span style="margin-right:5px; margin-left:5px; color:${colgeneral5};">&#9673;</span> </td>
                    </tr>
                </tbody>
            </table>
        `;
        ventana.document.body.innerHTML += (chart1.innerHTML);
        ventana.document.body.innerHTML += '<p style="text-align:center;"> <b>*</b> Los colores de la grafica son aleatorios para mostrar el porcentaje de cada categoria <b>*</b> </p>';
        ventana.document.body.innerHTML += '<h3> <b> Resultado por categoria </b> </h3>';
        ventana.document.body.innerHTML += `
            <table width="100%" border="1">
                <thead style="text-align:left;">
                    <th style="padding:7px;">Categoria</th>
                    <th style="padding:7px;">Resultado</th>
                </thead>
                <tbody style="padding:30px !important;">
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Ambiente de trabajo</td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${colcat1};">&#9673;</span> ${document.getElementById('rescat').innerHTML} </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Factores propios de la actividad </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${colcat2};">&#9673;</span> ${rescat2} </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Organización del tiempo de trabajo </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${colcat3};">&#9673;</span> ${rescat3} </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Liderazgo y relaciones en el trabajo </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${colcat4};">&#9673;</span> ${rescat4} </td>
                    </tr>
                </tbody>
            </table>
        `;
        ventana.document.body.innerHTML += '<br/>';
        ventana.document.body.innerHTML += (chart2.innerHTML);
        ventana.document.body.innerHTML += '<p style="text-align:center; margin-top:2em;"> <b>*</b> Los colores de la grafica son aleatorios para mostrar el porcentaje de cada categoria <b>*</b> </p>';
        ventana.document.body.innerHTML += '<h3> <b> Resultado por dominio </b> </h3>';
        ventana.document.body.innerHTML += `
            <table width="100%" border="1">
                <thead style="text-align:left;">
                    <th style="padding:7px;">Dominio</th>
                    <th style="padding:7px;">Resultado</th>
                </thead>
                <tbody style="padding:30px !important;">
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Condiciones en el trabajo ambiente de trabajo </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${coldom1};">&#9673;</span> ${resdom1} </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Carga de trabajo </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${coldom2};">&#9673;</span> ${resdom2} </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Falta de control sobre el trabajo </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${coldom3};">&#9673;</span> ${resdom3} </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Jornada de trabajo </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${coldom4};">&#9673;</span> ${resdom4} </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Interferencia en la relación trabajo-familia </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${coldom5};">&#9673;</span> ${resdom5} </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Liderazgo </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${coldom6};">&#9673;</span> ${resdom6} </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Relaciones en el trabajo </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${coldom7};">&#9673;</span> ${resdom7} </td>
                    </tr>
                    <tr>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px;">&#9679;</span> Violencia </td>
                        <td style="padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${coldom8};">&#9673;</span> ${resdom8} </td>
                    </tr>
                </tbody>
            </table>
        `;
        ventana.document.body.innerHTML += '<br/><br/><br/><br/><br/><br/><br/>';
        ventana.document.body.innerHTML += '<h2 style="text-align:center;">Criterios de acción</h2>';
        ventana.document.body.innerHTML += `
            <table width="100%" border="1" style="margin-top:50px;">
                <thead style="text-align:center;">
                    <th style="padding:7px;">Nivel de riesgo</th>
                    <th style="padding:7px;">Necesidad de acción</th>
                </thead>
                <tbody style="padding:30px !important;">
                    <tr>
                        <td style="text-align:center; padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${colnmalto};">&#9673;</span> <br/> Muy Alto</td>
                        <td style="font-size:15px; padding:7px; text-align:justify;"> Se requiere realizar el análisis de cada categoría y dominio para establecer las acciones de intervención apropiadas, mediante un Programa de intervención que deberá incluir evaluaciones específicas y contemplar campañas de sensibilización, revisar la política de prevención de riesgos psicosociales y programas para la prevención de los factores de riesgo psicosocial, la promoción de un entorno organizacional favorable y la prevención de la violencia laboral, así como reforzar su aplicación y difusión.
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:center; padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${colnalto};">&#9673;</span> <br/>Alto</td>
                        <td style="font-size:15px; padding:7px; text-align:justify;">
                            Se requiere realizar un análisis de cada categoría y dominio, de manera que se puedan determinar las acciones de intervención apropiadas a través de un Programa de intervención, que podrá incluir una evaluación específica y deberá incluir una campaña de sensibilización. Revisar la política de prevención de riesgos psicosociales y programas para la prevención de los factores de riesgo psicosocial, la promoción de un entorno organizacional favorable y la prevención de la violencia laboral, así como reforzar su aplicación y difusión.
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:center; padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${colnmedio};">&#9673;</span> <br/>Medio</td>
                        <td style="font-size:15px; padding:7px; text-align:justify;">
                            Se requiere revisar la política de prevención de riesgos psicosociales y programas para la prevención de los factores de riesgo psicosocial, la promoción de un entorno organizacional favorable y la prevención de la violencia laboral, así como reforzar su aplicación y difusión, mediante un Programa de intervención.
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:center; padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${colnbajo};">&#9673;</span> <br/>Bajo</td>
                        <td style="font-size:15px; padding:7px; text-align:justify;">
                            Es necesario una mayor difusión de la política de prevención de riesgos psicosociales y programas para: la prevención de los factores de riesgo psicosocial, la promoción de un entorno organizacional favorable y la prevención de la violencia laboral.
                        </td>
                    </tr>
                    <tr>
                        <td style="text-align:center; padding:7px;"> <span style="margin-right:5px; margin-left:5px; color:${colnnulo};">&#9673;</span> <br/>Nulo o despreciable</td>
                        <td style="font-size:15px; padding:7px; text-align:justify;">
                            El riesgo resulta despreciable por lo que no se requiere medidas adicionales. 
                        </td>
                    </tr>
                </tbody>
            </table>
        `;
        ventana.print();
        ventana.close();
    }

    fprintchart = (element) => {
        const tit1 = document.getElementById('tit1');
        const li1 = document.getElementById('li1');
        const listg = document.getElementById('listg');
        var ventana = window.open('', 'IMPRIMIR', 'height=1200,width=1500');
        ventana.document.write('<html><head><title>' + document.title + '</title>');
        ventana.document.write('</head><body style="font-family:sans-serif !important;">');
        ventana.document.write('<style> .list-n{ list-style: none !important; font-family:sans-serif; } #li1 { background: red !important; } </style>');
        ventana.document.write(element.innerHTML);
        ventana.document.write('<ul> <li style="margin-left:40px !important;">pruebas</li> </ul>');
        ventana.document.write(listg.innerHTML);
        ventana.document.write('</body></html>');
        ventana.print();
        window.close();
        ventana.close();
        return true;
    }

    fprintDiv = (nombreDiv) => {
        var contenido = document.getElementById('piechart').innerHTML;
        var contenidoOriginal = document.body.innerHTML;

        document.body.innerHTML = contenido;
        window.print();
        document.body.innerHTML = contenidoOriginal;
    }

    document.getElementById('printchart').addEventListener('click', () => {
        const print = document.getElementById('piechart');
        fimprimir(print);
    });

});