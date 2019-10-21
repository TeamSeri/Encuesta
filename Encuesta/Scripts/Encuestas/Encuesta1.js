document.addEventListener('DOMContentLoaded', () => {

    fmsgconfirm = (e) => {
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }

    window.addEventListener("beforeunload", fmsgconfirm);

    const form = document.getElementById('formEnc1');
    const btnenviar = document.getElementById('btnenviar');

    let contexit = 0;

    $("#encuesta1p2").hide();
    $("#encuesta1p3").hide();
    $("#encuesta1p4").hide();
    $("#encuesta1p5").hide();
    $("#encuesta1p6").hide();
    $("#encuesta1p7").hide();
    $("#encuesta1p8").hide();
    $("#encuesta1p9").hide();
    $("#encuesta1p10").hide();
    $("#encuesta1p11").hide();
    $("#encuesta1p12").hide();
    $("#encuesta1p13").hide();
    $("#complement1").hide();
    $("#complement2").hide();
    $("#divbutton").hide();

    const preguntasdiv1 = document.getElementById('preguntasdiv1');
    const preguntasdiv2 = document.getElementById('preguntasdiv2');
    const preguntasdiv3 = document.getElementById('preguntasdiv3');
    const preguntasdiv4 = document.getElementById('preguntasdiv4');
    const preguntasdiv5 = document.getElementById('preguntasdiv5');
    const preguntasdiv6 = document.getElementById('preguntasdiv6');
    const preguntasdiv7 = document.getElementById('preguntasdiv7');
    const preguntasdiv8 = document.getElementById('preguntasdiv8');
    const preguntasdiv9 = document.getElementById('preguntasdiv9');
    const preguntasdiv10 = document.getElementById('preguntasdiv10');
    const preguntasdiv11 = document.getElementById('preguntasdiv11');
    const preguntasdiv12 = document.getElementById('preguntasdiv12');
    const preguntasdiv13 = document.getElementById('preguntasdiv13');

    const opc2 = document.getElementsByName('opc2');

    const opcval1 = document.getElementById('opcval1');
    const opcval2 = document.getElementById('opcval2');
    const opcval3 = document.getElementById('opcval3');
    const opcval4 = document.getElementById('opcval4');

    const resp65 = document.getElementsByName('resp65'),
        resp66 = document.getElementsByName('resp66'),
        resp67 = document.getElementsByName('resp67'),
        resp68 = document.getElementsByName('resp68'),
        resp69 = document.getElementsByName('resp69'),
        resp70 = document.getElementsByName('resp70'),
        resp71 = document.getElementsByName('resp71'),
        resp72 = document.getElementsByName('resp72');

    fcomprobationsuccess = (apart) => {
        document.getElementById('span' + String(apart)).classList.remove('bg-danger');
        document.getElementById('span' + String(apart)).classList.add('bg-primary-s');
        document.getElementById('ico' + String(apart)).classList.remove('fa-times');
        document.getElementById('ico' + String(apart)).classList.add('fa-check');
        Command: toastr["info"]("Apartado " + String(apart) + " completado correctamente");
    }

    fmsgerroricom = () => {
        swal({
            title: "Atención",
            text: "Completa las preguntas seleccionando una opción a cada una",
            icon: "warning"
        });
    }

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "positionClass": "toast-bottom-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "3000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    document.getElementById('btncon1').addEventListener('click', () => {
        let cont = 0;
        for (var i = 1; i < 6; i++) {
            if ($("#preguntasdiv1 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            }
        }
        if (cont == 5) {
            contexit += 1;
            $("#encuesta1p2").show(1000);
            $("#divcont1").hide(1000);
            fcomprobationsuccess(1);
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon2').addEventListener('click', () => {
        let cont = 0;
        for (var i = 6; i < 13; i++) {
            if ($("#preguntasdiv2 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            }
        }
        if (cont == 7) {
            contexit += 1;
            $("#encuesta1p3").show(1000);
            $("#divcont2").hide(1000);
            fcomprobationsuccess(2)
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon3').addEventListener('click', () => {
        let cont = 0;
        for (var i = 13; i < 17; i++) {
            if ($("#preguntasdiv3 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            }
        }
        if (cont == 4) {
            contexit += 1;
            $("#encuesta1p4").show(1000);
            $("#divcont3").hide(1000);
            fcomprobationsuccess(3);
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon4').addEventListener('click', () => {
        let cont = 0;
        for (var i = 17; i < 23; i++) {
            if ($("#preguntasdiv4 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            }
        }
        if (cont == 6) {
            contexit += 1;
            $("#encuesta1p5").show(1000);
            $("#divcont4").hide(1000);
            fcomprobationsuccess(4);
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon5').addEventListener('click', () => {
        let cont = 0;
        for (var i = 23; i < 29; i++) {
            if ($("#preguntasdiv5 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            }
        }
        if (cont == 6) {
            contexit += 1;
            $("#encuesta1p6").show(1000);
            $("#divcont5").hide(1000);
            fcomprobationsuccess(5);
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon6').addEventListener('click', () => {
        let cont = 0;
        for (var i = 29; i < 31; i++) {
            if ($("#preguntasdiv6 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            }
        }
        if (cont == 2) {
            contexit += 1;
            $("#encuesta1p7").show(1000);
            $("#divcont6").hide(1000);
            fcomprobationsuccess(6);
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon7').addEventListener('click', () => {
        let cont = 0;
        for (var i = 31; i < 37; i++) {
            if ($("#preguntasdiv7 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            } 
        }
        if (cont == 6) {
            contexit += 1;
            $("#encuesta1p8").show(1000);
            $("#divcont7").hide(1000);
            fcomprobationsuccess(7);
        } else {
            fmsgerroricom(); 
        }
    }); 

    document.getElementById('btncon8').addEventListener('click', () => {
        let cont = 0;
        for (var i = 37; i < 42; i++) {
            if ($("#preguntasdiv8 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            } 
        }
        if (cont == 5) {
            contexit += 1;
            $("#encuesta1p9").show(1000);
            $("#divcont8").hide(1000);
            fcomprobationsuccess(8);
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon9').addEventListener('click', () => {
        let cont = 0;
        for (var i = 42; i < 47; i++) {
            if ($("#preguntasdiv9 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            } 
        }
        if (cont == 5) {
            contexit += 1;
            $("#encuesta1p10").show(1000);
            $("#divcont9").hide(1000);
            fcomprobationsuccess(9);
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon10').addEventListener('click', () => {
        let cont = 0;
        for (var i = 47; i < 57; i++) {
            if ($("#preguntasdiv10 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            } 
        }
        if (cont == 10) {
            contexit += 1;
            $("#encuesta1p11").show(1000);
            $("#divcont10").hide(1000);
            fcomprobationsuccess(10);
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon11').addEventListener('click', () => {
        let cont = 0;
        for (var i = 57; i < 65; i++) {
            if ($("#preguntasdiv11 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            } 
        }
        if (cont == 8) {
            contexit += 1;
            $("#encuesta1p12").show(1000);
            $("#divcont11").hide(1000);
            fcomprobationsuccess(11);
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon12').addEventListener('click', () => {
        let cont = 0;
        for (var i = 65; i < 69; i++) {
            if ($("#preguntasdiv12 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            }
        }
        if (cont == 4) {
            contexit += 1;
            $("#encuesta1p13").show(1000);
            $("#divcont12").hide(1000);
            fcomprobationsuccess(12);
        } else {
            fmsgerroricom();
        }
    });

    document.getElementById('btncon13').addEventListener('click', () => {
        let cont = 0;
        for (var i = 69; i < 73; i++) {
            if ($("#preguntasdiv13 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            }
        }
        if (cont == 4) {
            contexit += 1;
            $("#divbutton").show(1000);
            $("#divcont13").hide(1000);
            fcomprobationsuccess(13);
        } else {
            fmsgerroricom();
        }
    });

    opcval1.addEventListener('click', () => {
        for (var i = 0; i < resp65.length; i++) {
            resp65[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < resp66.length; i++) {
            resp66[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < resp67.length; i++) {
            resp67[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < resp68.length; i++) {
            resp68[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < opc2.length; i++) {
            opc2[i].checked = false;
        }
        $("#divbutton").hide(1000);
        $("#divcont12").show(1000);
        $("#complement1").show(1000);
        $("#encuesta1p13").hide(1000);
    });

    opcval2.addEventListener('click', () => {
        for (var i = 0; i < resp65.length; i++) {
            resp65[i].removeAttribute('required');
            resp65[i].checked = false;
        }
        for (var i = 0; i < resp66.length; i++) {
            resp66[i].removeAttribute('required');
            resp66[i].checked = false;
        }
        for (var i = 0; i < resp67.length; i++) {
            resp67[i].removeAttribute('required');
            resp67[i].checked = false;
        }
        for (var i = 0; i < resp68.length; i++) {
            resp68[i].removeAttribute('required');
            resp68[i].checked = false;
        }
        $("#complement1").hide(1000);
        $("#encuesta1p13").show(1000);
    });

    opcval3.addEventListener('click', () => {
        for (var i = 0; i < resp69.length; i++) {
            resp69[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < resp70.length; i++) {
            resp70[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < resp71.length; i++) {
            resp71[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < resp72.length; i++) {
            resp72[i].setAttribute('required', 'true');
        }
        $("#complement2").show(1000);
        $("#divbutton").hide(1000);
    });

    opcval4.addEventListener('click', () => {
        for (var i = 0; i < resp69.length; i++) {
            resp69[i].removeAttribute('required');
            resp69[i].checked = false;
        }
        for (var i = 0; i < resp70.length; i++) {
            resp70[i].removeAttribute('required');
            resp70[i].checked = false;
        }
        for (var i = 0; i < resp71.length; i++) {
            resp71[i].removeAttribute('required');
            resp71[i].checked = false;
        }
        for (var i = 0; i < resp72.length; i++) {
            resp72[i].removeAttribute('required');
            resp72[i].checked = false;
        }
        $("#complement2").hide(1000);
        $("#divbutton").show(1000);
    });

    try {

        $.ajax({
            url: "/EncuestaP/Encuesta1",
            type: "POST",
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].sTipo == 'T1') {
                        document.getElementById('title1').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P1' && data[i].sIdentificador == 'P1' && data[i].iNumeroPregunta == '1') {
                        preguntasdiv1.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'P1' && data[i].sIdentificador == 'P1' && data[i].iNumeroPregunta == '2' || data[i].iNumeroPregunta == '3') {
                        preguntasdiv1.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'P1' && data[i].sIdentificador == 'P1' && data[i].iNumeroPregunta == '4') {
                        preguntasdiv1.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'P1' && data[i].sIdentificador == 'P1' && data[i].iNumeroPregunta == '5') {
                        preguntasdiv1.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T2') {
                        document.getElementById('title2').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P2' && data[i].sIdentificador == 'P2') {
                        preguntasdiv2.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T3') {
                        document.getElementById('title3').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P3' && data[i].sIdentificador == 'P3') {
                        preguntasdiv3.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T4') {
                        document.getElementById('title4').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P4' && data[i].sIdentificador == 'P4') {
                        preguntasdiv4.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T5') {
                        document.getElementById('title5').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P5' && data[i].sIdentificador == 'P5') {
                        preguntasdiv5.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T6') {
                        document.getElementById('title6').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P6' && data[i].sIdentificador == 'P6' && data[i].iNumeroPregunta == '29') {
                        preguntasdiv6.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'P6' && data[i].sIdentificador == 'P6' && data[i].iNumeroPregunta == '30') {
                        preguntasdiv6.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T7') {
                        document.getElementById('title7').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P7' && data[i].sIdentificador == 'P7') {
                        preguntasdiv7.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T8') {
                        document.getElementById('title8').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P8' && data[i].sIdentificador == 'P8') {
                        preguntasdiv8.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T9') {
                        document.getElementById('title9').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P9' && data[i].sIdentificador == 'P9') {
                        preguntasdiv9.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T10') {
                        document.getElementById('title10').textContent = data[i].sContenidoPregunta;
                    }

                    if (data[i].sTipo == 'P10' && data[i].sIdentificador == 'P10' && data[i].iNumeroPregunta == '47' || data[i].iNumeroPregunta == '48' || data[i].iNumeroPregunta == '49' || data[i].iNumeroPregunta == '50' || data[i].iNumeroPregunta == '51' || data[i].iNumeroPregunta == '52' || data[i].iNumeroPregunta == '53') {
                        preguntasdiv10.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }

                    if (data[i].sTipo == 'P10' && data[i].sIdentificador == 'P10' && data[i].iNumeroPregunta == '54') {
                        preguntasdiv10.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }

                    if (data[i].sTipo == 'P10' && data[i].sIdentificador == 'P10' && data[i].iNumeroPregunta == '55' || data[i].iNumeroPregunta == '56') {
                        preguntasdiv10.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T11') {
                        document.getElementById('title11').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P11' && data[i].sIdentificador == 'P11' && data[i].iNumeroPregunta == '57') {
                        preguntasdiv11.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'P11' && data[i].sIdentificador == 'P11' && data[i].iNumeroPregunta != '57') {
                        preguntasdiv11.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T12') {
                        document.getElementById('title12').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P12' && data[i].sIdentificador == 'P12') {
                        preguntasdiv12.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T13') {
                        document.getElementById('title13').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P13' && data[i].sIdentificador == 'P13') {
                        preguntasdiv13.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].iNumeroPregunta}.- ${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="4" />
                                    <label class="form-check-label">Siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="3" />
                                    <label class="form-check-label">Casi siempre</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="2" />
                                    <label class="form-check-label">Algunas veces</label>
                                         <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Casi nunca</label>
                                        <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                }
            },
            error: function (xhr, status) {
                console.error(xhr.message);
            }
        });
    } catch (err) {
        if (err instanceof TypeError) {
            console.error("TypeError ", err);
        } else if (err instanceof EvalError) {
            console.log("EvalError ", err);
        } else if (err instanceof RangeError) {
            console.error("RangeError ", err);
        } else {
            console.error("Error ", err);
        }
    }

    //btnenviar.addEventListener('click', () => {
    //    alert('prueba')
    //    formEnc1.submit();
    //});

    document.getElementById('btnenviar').addEventListener('click', (e) => {
        if (contexit >= 11 && contexit <= 13) {
            window.removeEventListener("beforeunload", fmsgconfirm);
            form.submit();
        } else {
            alert('errror');
        }
        e.preventDefault();
    });

});