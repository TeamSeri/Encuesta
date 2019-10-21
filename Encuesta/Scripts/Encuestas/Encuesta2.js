document.addEventListener('DOMContentLoaded', () => {

    fmsgconfirm = (e) => {
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }

    window.addEventListener("beforeunload", fmsgconfirm);

    const form = document.getElementById('formEnc');

    let contexit = 0;

    $("#encuesta2p2").hide();
    $("#encuesta3p2").hide();
    $("#encuesta4p2").hide();
    $("#encuesta5p2").hide();
    $("#encuesta6p2").hide();
    $("#encuesta7p2").hide();
    $("#encuesta8p2").hide();
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

    const opcval1 = document.getElementById('opcval1');
    const opcval2 = document.getElementById('opcval2');
    const opcval3 = document.getElementById('opcval3');
    const opcval4 = document.getElementById('opcval4');
    const complement1 = document.getElementById('complement1');
    const complement2 = document.getElementById('complement2');

    const resp41 = document.getElementsByName('resp41');
    const resp42 = document.getElementsByName('resp42');
    const resp43 = document.getElementsByName('resp43');
    const resp44 = document.getElementsByName('resp44');
    const resp45 = document.getElementsByName('resp45');
    const resp46 = document.getElementsByName('resp46');

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
        for (var i = 1; i < 10; i++) {
            if ($("#encuesta2p1 input[name='resp" + i + "']:radio").is(':checked')) {
                //alert("Bien!!!, la edad seleccionada es: " + $('input:radio[name=resp' + i + ']:checked').val());
                cont += 1;
            } else {
                cont = 0;
            }
            
        }
        if (cont == 9) {
            contexit += 1;
            $("#encuesta2p2").show(1000);
            $('#divcont1').hide(1000);
            document.getElementById('span1').classList.remove('bg-danger');
            document.getElementById('span1').classList.add('bg-primary-s');
            document.getElementById('ico1').classList.remove('fa-times');
            document.getElementById('ico1').classList.add('fa-check');
            Command: toastr["info"]("Apartado 1 completado correctamente");
        } else {
            swal({
                title: "Atención",
                text: "Completa las preguntas seleccionando una opción a cada una ",
                icon: "warning"
            });
        }
    });

    document.getElementById('btncon2').addEventListener('click', () => {
        let cont = 0;
        for (var i = 10; i < 14; i++) {
            if ($("#encuesta2p2 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 0;
            }
            console.log(cont);
        }
        if (cont == 4) {
            contexit += 1;
            $("#encuesta3p2").show(1000);
            $('#divcont2').hide(1000);
            document.getElementById('span2').classList.remove('bg-danger');
            document.getElementById('span2').classList.add('bg-primary-s');
            document.getElementById('ico2').classList.remove('fa-times');
            document.getElementById('ico2').classList.add('fa-check');
            Command: toastr["info"]("Apartado 2 completado correctamente");
        } else {
            swal({
                title: "Atención",
                text: "Completa las preguntas seleccionando una opción a cada una ",
                icon: "warning"
            });
        }
    });

    document.getElementById('btncon3').addEventListener('click', () => {
        let cont = 0;
        for (var i = 14; i < 18; i++) {
            if ($("#encuesta3p2 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 1;
            }
        }
        if (cont == 4) {
            contexit += 1;
            $("#encuesta4p2").show(1000);
            $('#divcont3').hide(1000);
            document.getElementById('span3').classList.remove('bg-danger');
            document.getElementById('span3').classList.add('bg-primary-s');
            document.getElementById('ico3').classList.remove('fa-times');
            document.getElementById('ico3').classList.add('fa-check');
            Command: toastr["info"]("Apartado 3 completado correctamente")
        } else {
            swal({
                title: "Atención",
                text: "Completa las preguntas seleccionando una opción a cada una ",
                icon: "warning"
            });
        }
    });

    document.getElementById('btncon4').addEventListener('click', () => {
        let cont = 0;
        for (var i = 18; i < 23; i++) {
            if ($("#encuesta4p2 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 1;
            }
        }
        if (cont == 5) {
            contexit += 1;
            $("#encuesta5p2").show(1000);
            $('#divcont4').hide(1000);
            document.getElementById('span4').classList.remove('bg-danger');
            document.getElementById('span4').classList.add('bg-primary-s');
            document.getElementById('ico4').classList.remove('fa-times');
            document.getElementById('ico4').classList.add('fa-check');
            Command: toastr["info"]("Apartado 4 completado correctamente")
        } else {
            swal({
                title: "Atención",
                text: "Completa las preguntas seleccionando una opción a cada una ",
                icon: "warning"
            });
        }
    });

    document.getElementById('btncon5').addEventListener('click', () => {
        let cont = 0;
        for (var i = 23; i < 28; i++) {
            if ($("#encuesta5p2 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 1;
            }
        }
        if (cont == 5) {
            contexit += 1;
            $("#encuesta6p2").show(1000);
            $('#divcont5').hide(1000);
            document.getElementById('span5').classList.remove('bg-danger');
            document.getElementById('span5').classList.add('bg-primary-s');
            document.getElementById('ico5').classList.remove('fa-times');
            document.getElementById('ico5').classList.add('fa-check');
            Command: toastr["info"]("Apartado 5 completado correctamente")
        } else {
            swal({
                title: "Atención",
                text: "Completa las preguntas seleccionando una opción a cada una ",
                icon: "warning"
            });
        }
    });

    document.getElementById('btncon6').addEventListener('click', () => {
        let cont = 0;
        for (var i = 28; i < 41; i++) {
            if ($("#encuesta6p2 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 1;
            }
        }
        if (cont == 13) { 
            contexit += 1;
            $("#encuesta7p2").show(1000);
            $('#divcont6').hide(1000);
            document.getElementById('span6').classList.remove('bg-danger');
            document.getElementById('span6').classList.add('bg-primary-s');
            document.getElementById('ico6').classList.remove('fa-times');
            document.getElementById('ico6').classList.add('fa-check');
            Command: toastr["info"]("Apartado 6 completado correctamente")
        } else {
            swal({
                title: "Atención",
                text: "Completa las preguntas seleccionando una opción a cada una ",
                icon: "warning"
            });
        }
    });

    document.getElementById('btncon7').addEventListener('click', () => {
        let cont = 0;
        for (var i = 41; i < 44; i++) {
            if ($("#preguntasdiv7 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 1;
            }
        }
        if (cont == 3) {
            contexit += 1;
            $("#encuesta8p2").show(1000);
            $('#divcont7').hide(1000);
            document.getElementById('span7').classList.remove('bg-danger');
            document.getElementById('span7').classList.add('bg-primary-s');
            document.getElementById('ico7').classList.remove('fa-times');
            document.getElementById('ico7').classList.add('fa-check');
            Command: toastr["info"]("Apartado 7 completado correctamente")
        } else {
            swal({
                title: "Atención",
                text: "Completa las preguntas seleccionando una opción a cada una ",
                icon: "warning"
            });
        }
    });

    document.getElementById('btncon8').addEventListener('click', () => {
        let cont = 0;
        for (var i = 44; i < 47; i++) {
            if ($("#preguntasdiv8 input[name='resp" + i + "']:radio").is(':checked')) {
                cont += 1;
            } else {
                cont = 1;
            }
        }
        if (cont == 3) {
            contexit += 1;
            $("#divbutton").show(1000);
            $('#divcont8').hide(1000);
            document.getElementById('span8').classList.remove('bg-danger');
            document.getElementById('span8').classList.add('bg-primary-s');
            document.getElementById('ico8').classList.remove('fa-times');
            document.getElementById('ico8').classList.add('fa-check');
            Command: toastr["info"]("Apartado 8 completado correctamente")
        } else {
            swal({
                title: "Atención",
                text: "Completa las preguntas seleccionando una opción a cada una ",
                icon: "warning"
            });
        }
    });


    opcval1.addEventListener('click', () => {
        for (var i = 0; i < resp41.length; i++) {
            resp41[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < resp42.length; i++) {
            resp42[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < resp43.length; i++) {
            resp43[i].setAttribute('required', 'true');
        }
        $('#divcont7').show(1000);
        $("#complement1").show(1000);
        $("#encuesta8p2").hide(1000);
        $("#divbutton").hide(1000);
    });

    opcval2.addEventListener('click', () => {
        for (var i = 0; i < resp41.length; i++) {
            resp41[i].removeAttribute('required');
            resp41[i].checked = false;
        }
        for (var i = 0; i < resp42.length; i++) {
            resp42[i].removeAttribute('required');
            resp42[i].checked = false;
        }
        for (var i = 0; i < resp43.length; i++) {
            resp43[i].removeAttribute('required');
            resp43[i].checked = false;
        }
        $("#complement1").hide(1000);
        $("#encuesta8p2").show(1000);
    });

    opcval3.addEventListener('click', () => {
        for (var i = 0; i < resp44.length; i++) {
            resp44[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < resp45.length; i++) {
            resp45[i].setAttribute('required', 'true');
        }
        for (var i = 0; i < resp46.length; i++) {
            resp46[i].setAttribute('required', 'true');
        }
        $('#divcont8').show(1000);
        $("#complement2").show(1000);
        $("#divbutton").hide(1000);
        $("#divbutton").hide(1000);
    });

    opcval4.addEventListener('click', () => {
        for (var i = 0; i < resp44.length; i++) {
            resp44[i].removeAttribute('required');
            resp44[i].checked = false;
        }
        for (var i = 0; i < resp45.length; i++) {
            resp45[i].removeAttribute('required');
            resp45[i].checked = false;
        }
        for (var i = 0; i < resp46.length; i++) {
            resp46[i].removeAttribute('required');
            resp46[i].checked = false;
        }
        $("#complement2").hide(1000);
        $("#divbutton").show(1000);
    });

    try {

        $.ajax({
            url: "/EncuestaP/Encuesta2",
            type: "POST",
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].sTipo == 'T1') {
                        document.getElementById('title1').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P1' && data[i].sIdentificador == 'P1') {
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
                    if (data[i].sTipo == 'P6' && data[i].sIdentificador == 'P66') {
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
                    if (data[i].sTipo === 'P6' && data[i].sIdentificador === 'P6') {
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
                    if (data[i].sTipo == 'T7') {
                        document.getElementById('title7').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo === 'P7' && data[i].sIdentificador === 'P7') {
                        preguntasdiv7.innerHTML += `
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
                    if (data[i].sTipo == 'T8') {
                        document.getElementById('title8').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo === 'P8' && data[i].sIdentificador === 'P8') {
                        preguntasdiv8.innerHTML += `
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

    document.getElementById('divbutton').addEventListener('click', (e) => {
        if (contexit >= 6 && contexit <= 9) {
            window.removeEventListener("beforeunload", fmsgconfirm);
            form.submit();
        } else {
            alert('errror');
        }
        e.preventDefault();
    });

});