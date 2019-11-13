document.addEventListener('DOMContentLoaded', () => {

    $("#divadmin").hide();

    document.getElementById('admins').addEventListener('click', () => {
        $("#divadmin").show(1000);
    });

    document.getElementById('minimizeadmin').addEventListener('click', () => {
        $("#divadmin").hide(1000);
    });

    floaddataadmin = (param) => {
        const tbodyadmin = document.getElementById('tbodyadmin');
        let estatus = '';
        try {
            $.ajax({
                url: "../Admin/ListadoUsuarios",
                data: { tipo: 1, user:param },
                type: "POST",
                success: function (data) {
                    let empresa = '';
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].iEstado == 1) {
                            tbodyadmin.innerHTML += `
                            <tr>
                                <td> <i class="fas fa-user" style="margin-right:0.5em !important;"></i> ${data[i].sUsuario}</td>
                                <td> Activo </td>
                                <td>
                                    <button onclick="fchangepass(${data[i].iIdUsuario},'${data[i].sUsuario}')" title="Actualizar contraseña" class="btn btn-sm btn-primary"> <i class="fas fa-key"></i> </button>
                                    <button onclick="fblockuser(${data[i].iIdUsuario},'${data[i].sUsuario}')" title="Bloquear usuario" class="btn btn-sm btn-danger">
                                        <i class="fas fa-lock" style="margin-right:0.5em !important;"></i> Bloquear
                                    </button>
                                </td>
                            </tr>
                        `;
                        } else {
                            tbodyadmin.innerHTML += `
                            <tr>
                                <td> <i class="fas fa-user" style="margin-right:0.5em !important;"></i> ${data[i].sUsuario}</td>
                                <td> Bloqueado </td>
                                <td>
                                    <button onclick="fchangepass(${data[i].iIdUsuario},'${data[i].sUsuario}')" title="Actualizar contraseña" class="btn btn-sm btn-primary"> <i class="fas fa-key"></i> </button>
                                    <button onclick="factivuser(${data[i].iIdUsuario},'${data[i].sUsuario}')" title="Activar usuario" class="btn btn-sm btn-success">
                                         <i class="fas fa-lock-open" style="margin-right:0.5em !important;"></i> Activar
                                    </button>
                                </td>
                            </tr>
                        `;
                        }
                    }
                },
                error: function (jxhr) {
                    console.log(jxhr.status);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }

    floaddatausers = () => {
        const tbodyusers = document.getElementById('tbodyusers');
        let estatus = '';
        try {
            $.ajax({
                url: "../Admin/ListadoUsuarios",
                data: { tipo : 2, user : 0},
                type: "POST",
                success: function (data) {
                    let empresa = '';
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].sEmpresa == "") {
                            empresa = 'Sin asignar';
                        } else {
                            empresa = data[i].sEmpresa;
                        }
                        if (data[i].iEstado == 1) {
                            tbodyusers.innerHTML += `
                            <tr>
                                <td> <i class="fas fa-user" style="margin-right:0.5em !important;"></i> ${data[i].sUsuario}</td>
                                <td> ${empresa} </td>
                                <td> Activo </td>
                                <td>
                                    <button onclick="fchangepass(${data[i].iIdUsuario},'${data[i].sUsuario}')" title="Actualizar contraseña" class="btn btn-sm btn-primary"> <i class="fas fa-key"></i> </button>
                                    <button onclick="fblockuser(${data[i].iIdUsuario},'${data[i].sUsuario}')" title="Bloquear usuario" class="btn btn-sm btn-danger">
                                        <i class="fas fa-lock" style="margin-right:0.5em !important;"></i> Bloquear
                                    </button>
                                </td>
                            </tr>
                        `;
                        } else {
                            tbodyusers.innerHTML += `
                            <tr>
                                <td> <i class="fas fa-user" style="margin-right:0.5em !important;"></i> ${data[i].sUsuario}</td>
                                <td> ${empresa} </td>
                                <td> Bloqueado </td>
                                <td>
                                    <button onclick="fchangepass(${data[i].iIdUsuario},'${data[i].sUsuario}')" title="Actualizar contraseña" class="btn btn-sm btn-primary"> <i class="fas fa-key"></i> </button>
                                    <button onclick="factivuser(${data[i].iIdUsuario},'${data[i].sUsuario}')" title="Activar usuario" class="btn btn-sm btn-success">
                                         <i class="fas fa-lock-open" style="margin-right:0.5em !important;"></i> Activar
                                    </button>
                                </td>
                            </tr>
                        `;
                        }
                    }
                },
                error: function (jxhr) {
                    console.log(jxhr.status);
                }
            });
        } catch (err) {
            console.error(err);
        }
    }

    floaddatausers();

    fblockuser = (paramblock, userblock) => {
        const usbl = document.getElementById('userblock'), clvbl = document.getElementById('clvblock');
        usbl.textContent = userblock;
        clvbl.value = paramblock;
        $("#blockUser").modal('show');
    }

    document.getElementById('btncle').addEventListener('click', () => {
        document.getElementById('passblock').value = "";
    });

    document.getElementById('btncledes').addEventListener('click', () => {
        document.getElementById('passactive').value = "";
    });

    document.getElementById('btnblock').addEventListener('click', () => {
        const passblock = document.getElementById('passblock');
        if (passblock.value != "") {
            const dataEnv = { keyuser: document.getElementById('clvblock').value, status: 0, passblock: passblock.value };
            $.ajax({
                url: "../Admin/BloquearUsuario",
                type: "POST",
                data: dataEnv,
                success: function (data) {
                    if (data.resp == "errorpass") {
                        swal({
                            text: "Contraseña incorrecta, verifica",
                            icon: "error",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then((acepta) => {
                            passblock.value = "";
                            passblock.focus();
                        });
                    } else if (data.resp == "correct") {
                        swal({
                            text: "Cuenta bloqueada",
                            icon: "success",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then((acepta) => {
                            location.reload();
                        });
                    } else if (data.resp == "incorrect") {
                        swal({
                            text: "Ocurrio un problema",
                            icon: "error",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then((acepta) => {
                            location.reload();
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        } else {
            swal({
                text: "Ingresa tu contraseña para continuar",
                icon: "warning"
            });
        }
    });

    factivuser = (paramaccess, useraccess) => {
        const usbl = document.getElementById('useractive'), clvbl = document.getElementById('clvactive');
        usbl.textContent = useraccess;
        clvbl.value = paramaccess;
        $("#activeUser").modal('show');
    }

    document.getElementById('btnactive').addEventListener('click', () => {
        const passactive = document.getElementById('passactive');
        if (passactive.value != "") {
            const dataEnv = { keyuser: document.getElementById('clvactive').value, status: 1, passactive: passactive.value };
            $.ajax({
                url: "../Admin/DesbloquearUsuario",
                type: "POST",
                data: dataEnv,
                success: function (data) {
                    if (data.resp == "errorpass") {
                        swal({
                            text: "Contraseña incorrecta, verifica",
                            icon: "error",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        });
                        document.getElementById('passactive').value = "";
                    } else if (data.resp == "correct") {
                        swal({
                            text: "Cuenta desbloqueada",
                            icon: "success",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then((acepta) => {
                            location.reload();
                        });
                    } else if (data.resp == "incorrect") {
                        swal({
                            text: "Ocurrio un problema",
                            icon: "error",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then((acepta) => {
                            location.reload();
                        });
                    }
                },
                error: function (err) {
                    console.log(err);
                }
            });
        } else {
            swal({
                text: "Ingresa tu contraseña para continuar",
                icon: "warning"
            });
        }
    });

    fchangepass = (parampass, userpass) => {
        const usbl = document.getElementById('userpass'), clvbl = document.getElementById('clvpass');
        usbl.textContent = userpass;
        clvbl.value = parampass;
        $("#passUser").modal('show');
    }

    document.getElementById('btnupdatepass').addEventListener('click', () => {
        const newpassuser = document.getElementById('newpassuser');
        const passconfirm = document.getElementById('passconfirm');
        if (newpassuser.value != "") {
            if (passconfirm.value != "") {
                if (newpassuser.value == passconfirm.value) {
                    const userpass = document.getElementById('clvpass');
                    const dataEnv = { user: userpass.value, pass : newpassuser.value };
                    $.ajax({
                        url: "../Admin/CambiarContrasena",
                        type: "POST",
                        data: dataEnv,
                        success: function (data) {
                            if (data.resp == "correct") {
                                swal({
                                    title: "Correcto",
                                    text: "Contraseña actualizada",
                                    icon: "success",
                                    closeOnClickOutside: false,
                                    closeOnEsc: false
                                }).then((acepta) => {
                                    location.reload();
                                });
                            } else if (data.resp == "incorrect") {
                                swal({
                                    title: "Error",
                                    text: "La contraseña no se actualizo",
                                    icon: "error",
                                    closeOnClickOutside: false,
                                    closeOnEsc: false
                                }).then((acepta) => {
                                    newpassuser.value = "";
                                    passconfirm.value = "";
                                });
                            }
                        }, error: function (error) {
                            console.log(error);
                        }
                    });
                } else {
                    swal({
                        text: "Las contraseñas no coinciden",
                        icon: "warning",
                        closeOnClickOutside: false,
                        closeOnEsc: false
                    }).then((acepta) => {
                        newpassuser.value = "";
                        passconfirm.value = "";
                        newpassuser.focus();
                    });
                }
            } else {
                swal({
                    text: "Repite la nueva contraseña",
                    icon: "warning",
                    closeOnClickOutside: false,
                    closeOnEsc: false
                }).then((acepta) => {
                    passconfirm.focus();
                });
            }
        } else {
            swal({
                text: "Introduce una contraseña",
                icon: "warning",
                closeOnClickOutside: false,
                closeOnEsc: false
            }).then((acepta) => {
                newpassuser.focus();
            });
        }
    });

    fclearusernewreg = () => {
        document.getElementById('newuserreg').value = "";
        document.getElementById('passuserreg').value = "";
        document.getElementById('passrepreg').value = "";
        document.getElementById('typeuser').value = "0";
        document.getElementById('typeadmin').value = "none";
    }

    document.getElementById('btncloseuserreg').addEventListener('click', fclearusernewreg);

    document.getElementById('btnsaveuserreg').addEventListener('click', () => {
        const newuserreg = document.getElementById('newuserreg');
        const passuserreg = document.getElementById('passuserreg');
        const passrepreg = document.getElementById('passrepreg');
        const typeuser = document.getElementById('typeuser');
        const typeadmin = document.getElementById('typeadmin');
        if (newuserreg.value != "") {
            if (passuserreg.value != "") {
                if (passrepreg.value != "") {
                    if (typeuser.value != "0") {
                        if (typeadmin.value != "none") {
                            if (passuserreg.value == passrepreg.value) {
                                const dataenv = { user: newuserreg.value, pass: passuserreg.value, typeuser: parseInt(typeuser.value), typeadmin: parseInt(typeadmin.value) };
                                try {
                                    $.ajax({
                                        url: "../Admin/RegistrarUsuario",
                                        type: "POST",
                                        data: dataenv,
                                        success: function (data) {
                                            if (data.resp == "goodinsert") {
                                                swal({
                                                    title: "Correcto!",
                                                    text: "Usuario registrado",
                                                    icon: "success",
                                                    closeOnClickOutside: false,
                                                    closeOnEsc: false
                                                }).then((acepta) => {
                                                    if (acepta) {
                                                        location.reload();
                                                    } else { location.reload(); }
                                                });
                                            } else if (data.resp == "errorinsert") {
                                                swal({
                                                    title: "Error!",
                                                    text: "Usuario no registrado",
                                                    icon: "error",
                                                    closeOnClickOutside: false,
                                                    closeOnEsc: false
                                                }).then((acepta) => {
                                                    fclearusernewreg();
                                                });
                                            } else if (data.resp == "existsuser") {
                                                swal({
                                                    title: "Atencion!",
                                                    text: "El usuario ya se encuentra registrado",
                                                    icon: "warning",
                                                    closeOnClickOutside: false,
                                                    closeOnEsc: false
                                                }).then((acepta) => {
                                                    newuserreg.value = "";
                                                    newuserreg.focus();
                                                });
                                            } else {
                                                console.log(data);
                                            }
                                        }, error: function (err) {
                                            console.log(err);
                                        }
                                    });
                                } catch (err) {
                                    console.log(err);
                                }
                            } else {
                                swal({
                                    text: "Las contraseñas no coinciden, verifica",
                                    icon: "warning",
                                    closeOnClickOutside: false,
                                    closeOnEsc: false
                                }).then((acepta) => {
                                    passuserreg.value = "";
                                    passrepreg.value = "";
                                    passuserreg.focus();
                                });
                            }
                        } else {
                            swal({
                                text: "Selecciona si es super administrador",
                                icon: "warning",
                                closeOnClickOutside: false,
                                closeOnEsc: false
                            }).then((acepta) => {
                                typeadmin.focus();
                            });
                        }
                    } else {
                        swal({
                            text: "Selecciona un tipo de usuario",
                            icon: "warning",
                            closeOnClickOutside: false,
                            closeOnEsc: false
                        }).then((acepta) => {
                            typeuser.focus();
                        });
                    }
                } else {
                    swal({
                        text: "Repite la contraseña",
                        icon: "warning",
                        closeOnClickOutside: false,
                        closeOnEsc: false
                    }).then((acepta) => {
                        passrepreg.focus();
                    });
                }
            } else {
                swal({
                    text: "Ingresa una contraseña",
                    icon: "warning",
                    closeOnClickOutside: false,
                    closeOnEsc: false
                }).then((acepta) => {
                    passuserreg.focus();
                });
            }
        } else {
            swal({
                text: "Ingresa un nombre de usuario",
                icon: "warning",
                closeOnClickOutside: false,
                closeOnEsc: false
            }).then((acepta) => {
                newuserreg.focus();
            });
        }
    });

    const empresa = document.getElementById('empresa');
    const newuser = document.getElementById('newuser');
    
    try {
        $.ajax({
            type: "POST",
            url: '../Admin/EmpresasRestantes',
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    empresa.innerHTML += `<option value="${data[i].iIdEmpresa}">${data[i].sNombre}</option>`;
                }
            },
            error: function (xhr, status) {
                console.error(xhr.message);
            }
        });
    } catch (err) {
        if (err instanceof TypeError) {
            console.error("TypeError ", err.message);
        } else if (err instanceof RangeError) {
            console.error("RangeError ", err.message);
        } else if (err instanceof EvalError) {
            console.error("EvalError", err.message);
        } else {
            console.error("Error ", err.message);
        }
    }

    try {
        $.ajax({
            type: "POST",
            url: '../Admin/UsuariosRestantes',
            data: {},
            success: function (data) {
                for (var i = 0; i < data.length; i++) {
                    newuser.innerHTML += `<option value="${data[i].iIdUsuario}">${data[i].sUsuario}</option>`;
                }
            },
            error: function (xhr, status) {
                console.error(xhr.message);
            }
        });
    } catch (err) {
        if (err instanceof TypeError) {
            console.error("TypeError ", err.message);
        } else if (err instanceof RangeError) {
            console.error("RangeError ", err.message);
        } else if (err instanceof EvalError) {
            console.error("EvalError", err.message);
        } else {
            console.error("Error ", err.message);
        }
    }

    document.getElementById('btncloseuser').addEventListener('click', () => {
        document.getElementById('newuser').value = "";
        empresa.value = "0";
    });

    document.getElementById('btnsaveuser').addEventListener('click', () => {
        console.log('Hola');
        const newuser = document.getElementById('newuser');
        const empresa = document.getElementById('empresa');
        if (newuser.value != "0") {
            if (empresa.value != "0") {
                $.ajax({
                    url: "../Admin/RegistrarUsuarioEmpresa",
                    data: { user: newuser.value, empresa: empresa.value },
                    type: "POST",
                    success: function (data) {
                        if (data.resp == "correct") {
                            swal({
                                title: "Correcto",
                                text: "Usuario registrado",
                                icon: "success",
                                closeOnClickOutside: false,
                                closeOnEsc: false
                            }).then((acepta) => {
                                if (acepta) {
                                    location.reload();
                                } else {
                                    location.reload();
                                }
                            });
                        } else if (data.resp == "incorrect") {
                            swal({
                                title: "Error",
                                text: "Ocurrio un problema al insertar",
                                icon: "error",
                                closeOnClickOutside: false,
                                closeOnEsc: false
                            });
                            newuser.value = "", empresa.value = "";
                        }
                    }, error: function (error) {
                        console.log(error);
                    }
                });
            } else {
                swal({
                    title: "Atención",
                    text: "Selecciona una empresa",
                    icon: "warning",
                    closeOnClickOutside: false,
                    closeOnEsc: false
                }).then((acepta) => {
                    if (acepta) {
                        empresa.focus();
                    } else {
                        empresa.focus();
                    }
                });
            }
        } else {
            swal({
                title: "Atención",
                text: "Ingresa un nombre de usuario",
                icon: "warning",
                closeOnClickOutside: false,
                closeOnEsc: false
            }).then((acepta) => {
                if (acepta) {
                    newuser.focus();
                } else {
                    newuser.focus();
                }
            });
        }
    });

    setTimeout(() => {
        $("#tabusers").DataTable({
            "language": {
                "url": "//cdn.datatables.net/plug-ins/1.10.15/i18n/Spanish.json"
            }
        });
    }, 1000);

});