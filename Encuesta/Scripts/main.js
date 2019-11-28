document.addEventListener('DOMContentLoaded', () => {

    // Declaración de variables del formulario \\

    const company = document.getElementById('company');
    const boss = document.getElementById('boss');
    const description = document.getElementById('description');
    const location = document.getElementById('location');
    const dateevent = document.getElementById('dateevent');
    const numbercharacter = document.getElementById('numbercharacter');
    const btnsend = document.getElementById('btnsend');
    const date = new Date();
    const formatdate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();


    // Declaración de funciones \\

    /* 
     * Funcion que limpia los campos del formulario
     */
    fClearFields = () => {
        company.value = "0";
        boss.value = "";
        description.value = "";
        location.value = "";
        dateevent.value = "";
        numbercharacter.textContent = "0";
    }

    /*
     * Funcion que muestra las empresas activas en el sistema
     */
    fLoadCompanys = () => {
        try {
            $.ajax({
                url: "../Home/LoadCompanys",
                type: "POST",
                data: {},
                contentType: "application/json; charset=utf-8",
                dataType: "JSON",
                success: (request) => {
                    for (var i = 0; i < request.length; i++) {
                        company.innerHTML += `<option value="${request[i].iIdEmpresa}">${request[i].sNombre}</option>`;
                    }
                }, error: (jqXHR, exception) => {
                    fcaptureaerrorsajax(jqXHR, exception);
                }
            });
        } catch (error) {
            if (error instanceof TypeError) {
                console.log('TypeError: ' + String(error));
            } else if (error instanceof EvalError) {
                console.log('EvalError: ' + String(error));
            } else if (error instanceof RangeError) {
                console.log('RangeError: ' + String(error));
            } else {
                console.log('Error: ' + String(error));
            }
        }
    }

    /*
     * Funcion que cambia el color del contador de caracteres del textarea
     */
    fChangeColorCount = (element, color1, color2, color3, element2, validation) => {
        element.classList.remove(color1);
        element.classList.remove(color2);
        element.classList.add(color3);
        element2.classList.remove(validation);
        btnsend.disabled = false;
    }

    /*
     * Funcion que cuenta los caracteres en el textarea
     */
    fCountCharactersTextArea = () => {
        const lengthdescription = description.value.length;
        if (lengthdescription == 500) {
            numbercharacter.textContent = lengthdescription;
            fChangeColorCount(numbercharacter, 'text-info', 'text-warning', 'text-danger', description, 'is-invalid');
        } else if (lengthdescription >= 200 && lengthdescription <= 499) {
            numbercharacter.textContent = lengthdescription;
            fChangeColorCount(numbercharacter, 'text-danger', 'text-info', 'text-warning', description, 'is-invalid');
        } else if (lengthdescription < 200) {
            numbercharacter.textContent = lengthdescription;
            fChangeColorCount(numbercharacter, 'text-danger', 'text-warning', 'text-info', description, 'is-invalid');
        } else if (lengthdescription > 500) {
            description.classList.add('is-invalid');
            btnsend.disabled = true;
        }

    }

    /*
     * Funcion que muestra distintas alertas en distintos casos
     */

    fTypeAlerts = (title, text, icon, element, type) => {
        Swal.fire({
            title: title, text: text, icon: icon,
            showClass: { popup: 'animated fadeInDown faster' },
            hideClass: { popup: 'animated fadeOutUp faster' },
            confirmButtonText: "Aceptar", allowOutsideClick: false, allowEscapeKey: false, allowEnterKey: false
        }).then((accept) => {
            if (type == 1) {
                fClearFields();
                setTimeout(() => { element.focus(); }, 1000);
            } else {
                setTimeout(() => {
                    element.focus();
                }, 1000);
            }
        });
    }

    /*
     * Funcion que valida y envía los datos introducidos en el formulario
     */
    fSendDataMailBox = () => {
        if (company.value != "0") {
            if (boss.value != "") {
                if (description.value != "" && description.value.length >= 50 && description.value.length <= 500) {
                    if (location.value != "") {
                        if (dateevent.value != "") {
                            if (dateevent.value <= formatdate) {
                                const dataSend = {
                                    company: company.value,
                                    boss: boss.value,
                                    description: description.value,
                                    location: location.value,
                                    dateevent: dateevent.value
                                };
                                $.ajax({
                                    url: "../Home/RegisterMailBox",
                                    type: "POST",
                                    data: dataSend,
                                    success: (request) => {
                                        if (request.result === "success") {
                                            fTypeAlerts('Correcto!', 'Los datos han sido enviados al buzon', 'success', company, 1);
                                        } else if (request.result === "error") {
                                            fTypeAlerts('¡Error!', 'Ocurrio un problema al insertar los datos, reporte a sistemas', 'error', company, 1);
                                        } else {
                                            console.log(request.result);
                                        }
                                    }, error: (jqXHR, exception) => {
                                        fcaptureaerrorsajax(jqXHR, exception);
                                    }
                                });
                            } else {
                                fTypeAlerts('Atención', 'La fecha seleccionada no puede ser mayor a la actual', 'warning', dateevent, 0);
                            }
                        } else {
                            fTypeAlerts('Atención', 'Ingrese la fecha que ocurrieron los hechos', 'warning', dateevent, 0);
                        }
                    } else {
                        fTypeAlerts('Atención', 'Ingrese el lugar donde sucedieron los hechos descritos', 'warning', location, 0);
                    }
                } else {
                    fTypeAlerts('Atención', 'Ingrese la descripción de lo sucedido, esta debe de constar de minimo 50 caracteres', 'warning', description, 0);
                }
            } else {
                fTypeAlerts('Atención', 'Ingrese el nombre completo de su jefe de área', 'warning', boss, 0);
            }
        } else {
            fTypeAlerts('Atención', 'Seleccione una empresa para continuar.', 'warning', company, 0);
        }
    }

    // Inicialización o ejecución de funciones \\

    fLoadCompanys();

    fClearFields();

    description.addEventListener('keyup', fCountCharactersTextArea);

    btnsend.addEventListener('click', fSendDataMailBox);

});