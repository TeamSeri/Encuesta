document.addEventListener('DOMContentLoaded', () => {

    fmsgconfirm = (e) => {
        var confirmationMessage = "\o/";
        (e || window.event).returnValue = confirmationMessage;
        return confirmationMessage;
    }

    window.addEventListener("beforeunload", fmsgconfirm);

    const divpreguntas2 = document.getElementById('divpreguntas2');
    const preguntasdiv1 = document.getElementById('preguntasdiv1');
    const preguntasdiv2 = document.getElementById('preguntasdiv2');
    const preguntasdiv3 = document.getElementById('preguntasdiv3');
    const preguntasdiv4 = document.getElementById('preguntasdiv4');

    $("#encuestaopc2").hide();
    $("#encuestaopc3").hide();
    $("#encuestaopc4").hide();
    $("#btnenviar").hide();

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

    fmsgerroricom = () => {
        swal({
            title: "Atención",
            text: "Completa las preguntas seleccionando una opción a cada una",
            icon: "warning"
        });
    }

    let contexit = 0, general = 0, envianul = 0;

    const resp1 = document.getElementsByName('resp1');
    const resp2 = document.getElementsByName('resp2');
    const resp3 = document.getElementsByName('resp3');
    const resp4 = document.getElementsByName('resp4');
    const resp5 = document.getElementsByName('resp5');
    const resp6 = document.getElementsByName('resp6');

    fdisabledoptions = () => {
        for (var i = 0; i < resp1.length; i++) {
            resp1[i].setAttribute('disabled', 'true');
        }
        for (var i = 0; i < resp2.length; i++) {
            resp2[i].setAttribute('disabled', 'true');
        }
        for (var i = 0; i < resp3.length; i++) {
            resp3[i].setAttribute('disabled', 'true');
        }
        for (var i = 0; i < resp4.length; i++) {
            resp4[i].setAttribute('disabled', 'true');
        }
        for (var i = 0; i < resp5.length; i++) {
            resp5[i].setAttribute('disabled', 'true');
        }
        for (var i = 0; i < resp6.length; i++) {
            resp6[i].setAttribute('disabled', 'true');
        }
    }

    fcomprobationsuccess = (apart) => {
        document.getElementById('span' + String(apart)).classList.remove('bg-danger');
        document.getElementById('span' + String(apart)).classList.add('bg-primary-s');
        document.getElementById('ico' + String(apart)).classList.remove('fa-times');
        document.getElementById('ico' + String(apart)).classList.add('fa-check');
        Command: toastr["info"]("Apartado " + String(apart) + " completado correctamente");
    }

    document.getElementById('btncon1').addEventListener('click', () => {
        let cont = 0, sig = 0;
        for (var i = 1; i < 7; i++) {
            if ($("#preguntasdiv1 input[name='resp" + i + "']:radio").is(':checked')) {
                if ($('input:radio[name=resp' + i + ']:checked').val() == 0) {
                    sig += 1;
                }
                cont += 1;
            }
        }
        if (cont == 6) {
            contexit += 1;
            if (sig == 6) {
                fdisabledoptions();
                envianul = 1;
                $('#divcont1').hide(1000);
                $('#btnenviar').show(1000);
                $("#apart2").hide(1000);
                $("#apart3").hide(1000);
                $("#apart4").hide(1000);
                fcomprobationsuccess(1);
            } else {
                $("#encuestaopc2").show(1000);
                $('#divcont1').hide(1000);
                fcomprobationsuccess(1);
            }
        } else { fmsgerroricom(); }
    });

    document.getElementById('btncon2').addEventListener('click', () => {
        let cont = 0;
        for (var i = 7; i < 9; i++) {
            if ($("#preguntasdiv2 input[name='resp" + i + "']:radio").is(':checked')) {
                if ($('input:radio[name=resp' + i + ']:checked').val() == 1) {
                    general += 1;
                }
                cont += 1;
            }
        }
        if (cont == 2) {
            contexit += 1;
            $("#encuestaopc3").show(1000);
            $('#divcont2').hide(1000);
            fcomprobationsuccess(2);
        } else { fmsgerroricom(); }
    });

    document.getElementById('btncon3').addEventListener('click', () => {
        let cont = 0;
        for (var i = 9; i < 16; i++) {
            if ($("#preguntasdiv3 input[name='resp" + i + "']:radio").is(':checked')) {
                if ($('input:radio[name=resp' + i + ']:checked').val() == 1) {
                    general += 1;
                }
                cont += 1;
            }
        }
        if (cont == 7) {
            contexit += 1;
            $("#encuestaopc4").show(1000);
            $('#divcont3').hide(1000);
            fcomprobationsuccess(3);
        } else { fmsgerroricom(); }
    });

    document.getElementById('btncon4').addEventListener('click', () => {
        let cont = 0;
        for (var i = 16; i < 20; i++) {
            if ($("#preguntasdiv4 input[name='resp" + i + "']:radio").is(':checked')) {
                if ($('input:radio[name=resp' + i + ']:checked').val() == 1) {
                    general += 1;
                }
                cont += 1;
            }
        }
        if (cont == 4) {
            contexit += 1;
            $("#btnenviar").show(1000);
            $('#divcont4').hide(1000);
            fcomprobationsuccess(4);
        } else { fmsgerroricom(); }
    });

    document.getElementById('btnenviar').addEventListener('click', () => {
        if (contexit >= 1) {
            window.removeEventListener("beforeunload", fmsgconfirm);
            const form = document.getElementById('formEnc1');
            form.submit();
        } else {
            swal({
                title: "Oppss..",
                text: "Ocurrio un error, intente nuevamente",
                icon: "error",
                closeOnClickOutisde: false,
                closeOnEsc: false
            }).then((acepta) => {
                if (acepta) {
                    location.reload();
                }
            });
        }
    });

    try {
        $.ajax({
            url: "/EncuestaP/EncuestaOpc",
            type: "POST",
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].sTipo == 'T1') {
                        document.getElementById('title1').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'T1.1') {
                        document.getElementById('1title2').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sIdentificador == 'P1' && data[i].sTipo == 'P1') {
                        preguntasdiv1.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Si</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">No</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T2') {
                        document.getElementById('title2').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P2' && data[i].sTipo == 'P2') {
                        preguntasdiv2.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Si</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">No</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T3') {
                        document.getElementById('title3').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P3' && data[i].sTipo == 'P3') {
                        preguntasdiv3.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Si</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">No</label>
                                </div>
                            </div>
                        `;
                    }
                    if (data[i].sTipo == 'T4') {
                        document.getElementById('title4').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == 'P4' && data[i].sTipo == 'P4') {
                        preguntasdiv4.innerHTML += `
                            <div class="form-group">
                                <label>${data[i].sContenidoPregunta}</label>
                                <div class="margins-quest">
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="1" />
                                    <label class="form-check-label">Si</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="0" />
                                    <label class="form-check-label">No</label>
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
            console.error("EvalError ", err);
        } else if (err instanceof RangeError) {
            console.error("RangeError ", err);
        } else {
            console.error("Error ", err);
        }
    }

});