function login() {
    var apodo = $('#userName').val();
    var password = hashcode($('#password').val());
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.LOGIN',
            APODO: apodo,
            PASSWORD: password
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                toast("mainToast", "Login correcto");
                var user = $.parseJSON(responseText.LOGUED_USER);
                setCookie("ID_USUARIO", user.iDUsuario, 1);
                setCookie("NOMBRE", user.nombre, 1);
                setCookie("APELLIDO", user.apellido, 1);
                setCookie("APODO", user.apodo, 1);
                setCookie("EMAIL", user.email, 1);
                setCookie("TELEFONO", user.telefono, 1);
                setCookie("SALDO", user.saldo, 1);
                setCookie("GROUP_NAME", user.iDGrupoUsuarioFK.nombre, 1);
                setCookie("SESSION_ID", responseText.SESSION_ID, 1);
                if (user.iDGrupoUsuarioFK.nombre === "Administradores") {
                    window.location.href = "administration.jsp";
                } else if (user.iDGrupoUsuarioFK.nombre === "Clientes") {
                    window.location.href = "client.jsp";
                }
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function disconnect() {
    deleteAllCookies();
    toast("mainToast", "Desconectado");
    window.location.href = "index.jsp";
}

function loadUsers() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.LOADALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var myArr = $.parseJSON(responseText.USUARIOS);
                var i;
                var html = "";
                for (i = 0; i < myArr.length; i++) {
                    html += ""
                            + "<tr>"
                            + "<th scope=\"row\">" + myArr[i].iDUsuario + "</th>"
                            + "<td>" + myArr[i].apodo + "</td>"
                            + "<td>" + myArr[i].nombre + "</td>"
                            + "<td>" + myArr[i].apellido + "</td>"
                            + "<td>" + myArr[i].email + "</td>"
                            + "<td>" + myArr[i].telefono + "</td>"
                            + "<td>" + myArr[i].saldo + " €" + "</td>"
                            //+ "<td>" + "<button class=\"btn btn-secondary dropdown-toggle\" type=\"button\" id=\"usersMenu\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Menú</button>" + "</td>"
                            + "<td>"
                            + "<button onclick=\"formToogleShow('main-saldo-form', " + myArr[i].iDUsuario + ");\" type=\"button\" class=\"btn btn-primary btn-sm\">Saldo</button>"
                            + "  "
                            + "<button onclick=\"formToogleShow('main-edit-user-form', " + myArr[i].iDUsuario + ");\" type=\"button\" class=\"btn btn-secondary btn-sm\">Editar</button>"
                            + "  "
                            + "<button onclick=\"formToogleShow('main-chat-form', " + myArr[i].iDUsuario + ");\" type=\"button\" class=\"btn btn-info btn-sm\">Mensaje</button>"
                            + "</td>"
                            + "</tr>";
                }
                document.getElementById("UsuariosRows").innerHTML = html;
            }
            if (responseText.STATE === "FAILURE") {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function register() {
    var nombre = $('#name').val();
    var apellido = $('#surname').val();
    var apodo = $('#userName').val();
    var password = hashcode($('#password').val());
    var email = $('#email').val();
    var telefono = $('#phone').val();
    var grupo = $('#group').val();
    if (grupo === 'Cliente') {
        grupo = 'Clientes';
    }
    if (grupo === 'Administrador') {
        grupo = 'Administradores';
    }
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FIND',
            GRUPO: grupo
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var grupofk = responseText.ID;
                $.ajax({
                    url: '/TFG_Web/ControllerTFG',
                    data: {
                        ACTION: 'Usuario.REGISTER',
                        NOMBRE: nombre,
                        APELLIDO: apellido,
                        APODO: apodo,
                        PASSWORD: password,
                        EMAIL: email,
                        TELEFONO: telefono,
                        GRUPOFK: grupofk
                    },
                    success: function (responseText) {
                        toast("mainToast", "Usuario registrado");
                        loadUsers();
                        formToogleShow('main-register-form');
                    }
                });
            }
            if (responseText.STATE === "FAILURE") {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function getUserForEdit(idUser) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.FIND',
            IDUSUARIO: idUser
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var user = $.parseJSON(responseText.USUARIO);
                document.getElementById("idUsuarioEdit").value = user.iDUsuario;
                document.getElementById("userNameEdit").value = user.apodo;
                document.getElementById("emailEdit").value = user.email;
                document.getElementById("nameEdit").value = user.nombre;
                document.getElementById("surnameEdit").value = user.apellido;
                document.getElementById("phoneEdit").value = user.telefono;
                if (user.iDGrupoUsuarioFK.nombre === "Clientes") {
                    document.getElementById("groupEdit").value = "Cliente";
                }
                if (user.iDGrupoUsuarioFK.nombre === "Administradores") {
                    document.getElementById("groupEdit").value = "Administrador";
                }
            }
        }
    });
}

function getUserForOwnEdit() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.FIND',
            IDUSUARIO: getCookie("ID_USUARIO")
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var user = $.parseJSON(responseText.USUARIO);
                document.getElementById("idUsuarioEdit").value = user.iDUsuario;
                document.getElementById("userNameEdit").value = user.apodo;
                document.getElementById("emailEdit").value = user.email;
                document.getElementById("nameEdit").value = user.nombre;
                document.getElementById("surnameEdit").value = user.apellido;
                document.getElementById("phoneEdit").value = user.telefono;
                document.getElementById("passwordEdit").value = '';
            }
        }
    });
}

function editUser() {
    var idUsuarioEdit = $('#idUsuarioEdit').val();
    var userNameEdit = $('#userNameEdit').val();
    var emailEdit = $('#emailEdit').val();
    var nameEdit = $('#nameEdit').val();
    var surnameEdit = $('#surnameEdit').val();
    var phoneEdit = $('#phoneEdit').val();
    var passwordEdit = hashcode($('#passwordEdit').val());
    var groupEdit = $('#groupEdit').val();
    if (groupEdit === 'Cliente') {
        groupEdit = 'Clientes';
    }
    if (groupEdit === 'Administrador') {
        groupEdit = 'Administradores';
    }
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FIND',
            GRUPO: groupEdit
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var grupofk = responseText.ID;
                $.ajax({
                    url: '/TFG_Web/ControllerTFG',
                    data: {
                        ACTION: 'Usuario.EDIT',
                        IDUSUARIO: idUsuarioEdit,
                        NOMBRE: nameEdit,
                        APELLIDO: surnameEdit,
                        APODO: userNameEdit,
                        PASSWORD: passwordEdit,
                        EMAIL: emailEdit,
                        TELEFONO: phoneEdit,
                        GRUPOFK: grupofk
                    },
                    success: function (responseText) {
                        loadUsers();
                        toast("mainToast", "Usuario editado");
                        formToogleShow('main-edit-user-form');
                    }
                });
            }
            if (responseText.STATE === "FAILURE") {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function editOwnUser() {
    var idUsuarioEdit = $('#idUsuarioEdit').val();
    var userNameEdit = $('#userNameEdit').val();
    var emailEdit = $('#emailEdit').val();
    var nameEdit = $('#nameEdit').val();
    var surnameEdit = $('#surnameEdit').val();
    var phoneEdit = $('#phoneEdit').val();
    var passwordEdit = hashcode($('#passwordEdit').val());
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.EDIT',
            IDUSUARIO: idUsuarioEdit,
            NOMBRE: nameEdit,
            APELLIDO: surnameEdit,
            APODO: userNameEdit,
            PASSWORD: passwordEdit,
            EMAIL: emailEdit,
            TELEFONO: phoneEdit
        },
        success: function (responseText) {
            toast("mainToast", "Usuario editado");
            getUserForOwnEdit();
        }
    });
}

function comprobarSaldo(idusuariosaldo) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.FIND',
            IDUSUARIO: idusuariosaldo
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var user = $.parseJSON(responseText.USUARIO);
                var saldo = user.saldo;
                var tarifa = user.iDGrupoUsuarioFK.iDTarifaFK.precioporhora;
                var equipoActivo = document.getElementById("equipoActivo");
                if (equipoActivo !== null) {
                    var horaini = equipoActivo.cells.namedItem("horaini");
                    var segundos = 0;
                    var counterIni = 0;
                    var counterActual = 0;
                    var momentoActual = new Date();
                    var horaIniArray = horaini.innerHTML.split(':');
                    counterIni += parseInt(horaIniArray[0]) * 3600;
                    counterIni += parseInt(horaIniArray[1]) * 60;
                    counterIni += parseInt(horaIniArray[2]);
                    counterActual += momentoActual.getHours() * 3600;
                    counterActual += momentoActual.getMinutes() * 60;
                    counterActual += momentoActual.getSeconds();
                    segundos = counterActual - counterIni;
                    var precioHora = user.iDGrupoUsuarioFK.iDTarifaFK.precioporhora;
                    var precioSegundo = precioHora / 3600;
                    saldo = saldo - segundos * precioSegundo;
                    if (saldo <= 0) {
                        toast("mainToast", "Equipo desactivado por falta de saldo");
                        desactivarEquipo(null);
                    }
                }
                document.getElementById("saldoMainView").innerHTML = 'Tu saldo actual es de ' + Math.round(saldo * 100) / 100 + ' €';
                document.getElementById("tarifaMainView").innerHTML = 'Tu tarifa actual es: ' + Math.round(tarifa * 100) / 100 + ' €/hora';
            }
            if (responseText.STATE === "FAILURE") {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function changeSaldo() {
    var action = $('#actionSaldo').val();
    var idusuariosaldo = $('#idUsuarioSaldo').val();
    var cantidad = $('#cantidad').val();
    var notas = $('#notas').val();
    if (action === "Restar al saldo") {
        cantidad = -1 * cantidad;
    }
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.CHANGESALDO',
            IDUSUARIO: idusuariosaldo,
            CANTIDAD: cantidad,
            NOTAS: notas
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                loadUsers();
                toast("mainToast", "Saldo modificado");
                formToogleShow('main-saldo-form');
            }
            if (responseText.STATE === "FAILURE") {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function loadUsersForChat() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.LOADALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var myArr = $.parseJSON(responseText.USUARIOS);
                var i;
                var html = "";
                for (i = 0; i < myArr.length; i++) {
                    if(myArr[i].iDUsuario !== parseInt(getCookie("ID_USUARIO"))){
                        html += ""
                            + "<tr>"
                            + "<th scope=\"row\">" + myArr[i].iDUsuario + "</th>"
                            + "<td>" + myArr[i].apodo + "</td>"
                            + "<td>" + myArr[i].nombre + "</td>"
                            + "<td>" + myArr[i].apellido + "</td>"
                            + "<td>"
                            + "<button onclick=\"formToogleShow('main-chat-form', " + myArr[i].iDUsuario + ");\" type=\"button\" class=\"btn btn-info btn-sm\">Mensaje</button>"
                            + "</td>"
                            + "</tr>";
                    }
                }
                document.getElementById("UsuariosRows").innerHTML = html;
            }
            if (responseText.STATE === "FAILURE") {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}