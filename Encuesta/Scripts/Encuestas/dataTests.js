document.addEventListener("DOMContentLoaded", () => {
    const formpreguntas = document.getElementById('form_preguntas');
    const formData = document.getElementById('formdata');
    let t1;
    try {
        $.ajax({
            type: "POST",
            url: "../../EncuestaP/Preguntas",
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].sTipo == "T1") {
                        document.getElementById('titulo1').textContent = data[i].sContenidoPregunta;
                    }
                    if (data[i].sTipo == "P") {
                        formpreguntas.innerHTML += `
                            <div class="form-group">
                                <b>${data[i].iNumeroPregunta}. </b> ${data[i].sContenidoPregunta}
                                <div class="margins-quest">
                                    <input class="form-check-input" type="radio" name="resp${data[i].iNumeroPregunta}" value="Siempre" />
                                    <label class="form-check-label">Siempre</label>
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="Casi siempre" />
                                    <label class="form-check-label">Casi siempre</label>
                                       <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="Algunas veces" />
                                    <label class="form-check-label">Algunas veces</label>
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="Casi nunca" />
                                    <label class="form-check-label">Casi nunca</label>
                                    <input class="margin-radio" type="radio" name="resp${data[i].iNumeroPregunta}" value="Nunca" />
                                    <label class="form-check-label">Nunca</label>
                                </div>
                            </div>
                        `;
                    }
                }
            },
            error: function (xhr, status) {
                console.error(xhr.status);
            }
        });
    } catch (err) {
        if (err instanceof TypeError) {
            console.error("TypeError ", err.message);
        } else if (err instanceof RangeError) {
            console.error("RangeError ", err.message);
        } else if (err instanceof EvalError) {
            console.error("EvalError ", err.message);
        } else {
            console.error("Error ", err.message);
        }
    }
    formData.addEventListener('submit', (e) => {
        let cont;
        for (var i = 0; i < 6; i++) {
            if ($("#formdata input[name='resp"+i+"']:radio").is(':checked')) {
                //alert("Bien!!!, la edad seleccionada es: " + $('input:radio[name=resp' + i + ']:checked').val());
                cont = 0;
            } else {
                cont = 1
            }
        }
        if (cont == 0) {
            alert("Listo para enviar!");
        } else {
            alert("Seleccione una opción para cada una de las preguntas");
        }
        e.preventDefault();
    });
});