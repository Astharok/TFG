function formToogleShow(formName, value) {
    if (formName == 'main-saldo-form' && value != null) {
        document.getElementById("idUsuarioSaldo").value = value;
    }
    if (formName == 'main-edit-user-form' && value != null) {
        getUserForEdit(value);
    }
    if (formName == 'main-chat-form' && value != null) {
        getUserForChat(value);
    }
    var docClasses = document.getElementById(formName).classList;
    if (docClasses.contains('hidden')) {
        docClasses.replace('hidden', 'visible');
        return;
    }
    if (docClasses.contains('visible')) {
        docClasses.replace('visible', 'hidden');
        return;
    }
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
            if (responseText.STATE == "SUCCESS") {
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

function getUserForChat(idUserReceptor) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.FIND',
            IDUSUARIO: idUserReceptor
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE == "SUCCESS") {
                var user = $.parseJSON(responseText.USUARIO);
                document.getElementById("chatUserTitle").innerHTML = 'Chat con ' + user.nombre;
                getSessionUserForConversacion(idUserReceptor, user.nombre);
            }
        }
    });
}

function getSessionUserForConversacion(idUserReceptor, receptorNombre) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Sesion.FIND',
            SESSIONID: getCookie("sessionid")
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE == "SUCCESS") {
                getConversacion(idUserReceptor, responseText.ID_Usuario_FK, receptorNombre);
            }
        }
    });
}

function getConversacion(idUserReceptor, idUserEmisor, receptorNombre) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Conversacion.FIND',
            IDUSUARIOA: idUserReceptor,
            IDUSUARIOB: idUserEmisor
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE == "SUCCESS") {
                document.getElementById("idConversacion").value = responseText.CONVERSACION_ID;
                document.getElementById("idUsuarioChat").value = idUserEmisor;
                getMensajesChat(responseText.CONVERSACION_ID, idUserReceptor, idUserEmisor, receptorNombre);
            }
        }
    });
}

function getMensajesChat(idConversacion, idUserReceptor, idUserEmisor, receptorNombre) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Mensaje.FINDBYCONVER',
            IDCONVERSACION: idConversacion
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE == "SUCCESS") {
                setCookie('IDCONVERSACION', idConversacion, 1);
                setCookie('IDUSEREMISOR', idUserReceptor, 1);
                setCookie('IDUSERRECEPTOR', idUserEmisor, 1);
                setCookie('RECEPTORNOMBRE', receptorNombre, 1);
                var arrayMensajes = $.parseJSON(responseText.HISTORIAL_CHAT);
                var i;
                var html = '';
                var lastdate = '';
                var lastuser = '';
                var changedate = true;
                var first = true;
                for (i = 0; i < arrayMensajes.length; i++) {
                    var fechaArray = arrayMensajes[i].fecha.split(' ');
                    var mes = fechaArray[0];
                    var dia = fechaArray[1].split(',')[0];
                    var year = fechaArray[2];
                    var date = dia + ' ' + mes + ' ' + year
                    if (lastdate != date) {
                        changedate = true;
                        if (first === false) {
                            html += '\n';
                            html += '\n';
                        }
                        first = false;
                        html += date;
                        lastdate = date;
                        html += '\n';
                    }
                    if (lastuser != arrayMensajes[i].iDUsuarioFK.iDUsuario || changedate) {
                        lastuser = arrayMensajes[i].iDUsuarioFK.iDUsuario;
                        changedate = false;
                        var hora = fechaArray[3];
                        html += '\n';
                        html += hora + ' - ';
                        if (arrayMensajes[i].iDUsuarioFK.iDUsuario === idUserReceptor) {
                            html += receptorNombre + ':';
                        } else {
                            html += 'Yo:';
                        }
                    }
                    html += '\n';
                    html += arrayMensajes[i].textoMensaje;
                }
                document.getElementById("historialChat").innerHTML = html;
                var ta = document.getElementById('historialChat');
                ta.scrollTop = ta.scrollHeight;
            }
        }
    });
}

function loginFormToogleShow() {
    var docClasses = document.getElementById('main-login-form').classList;
    if (docClasses.contains('hidden')) {
        docClasses.replace('hidden', 'visible');
        return;
    }
    if (docClasses.contains('visible')) {
        docClasses.replace('visible', 'hidden');
        return;
    }
}

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
            if (responseText.STATE == "SUCCESS") {
                setCookie("sessionid", responseText.SESSION_ID, 1);
                if (responseText.GROUP_NAME == "Administradores") {
                    window.location.href = "administration.jsp";
                } else {
                    alert(responseText.STATE + ": " + responseText.MESSAGE);
                }
            } else {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function disconnect() {
    deleteAllCookies();
    window.location.href = "index.jsp";
}

function loadContent() {
    document.getElementById("defaultOpen").click();
}

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";

    switch (tabName) {
        case "Equipos":
            loadEquipos();
            break;
        case "Usuarios":
            loadUsers();
            break;

    }
}

function loadEquipos() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Equipo.LOADALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE == "SUCCESS") {
                var myArr = $.parseJSON(responseText.EQUIPOS);
                var i;
                var html = "";
                for (i = 0; i < myArr.length; i++) {
                    html += ""
                            + "<tr>"
                            + "<th scope=\"row\">" + (i + 1) + "</th>"
                            + "<td>" + myArr[i].nombre + "</td>"
                            + "<td></td>"
                            + "<td></td>"
                            + "</tr>";
                }
                document.getElementById("EquiposRows").innerHTML = html;
            }
            if (responseText.STATE == "FAILURE") {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function loadUsers() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.LOADALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE == "SUCCESS") {
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
            if (responseText.STATE == "FAILURE") {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
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
    if (grupo == 'Cliente') {
        grupo = 'Clientes';
    }
    if (grupo == 'Administrador') {
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
            if (responseText.STATE == "SUCCESS") {
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
                        alert("Usuario registrado correctamente");
                        loadUsers();
                        formToogleShow('main-register-form');
                    }
                });
            }
            if (responseText.STATE == "FAILURE") {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
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
            if (responseText.STATE == "SUCCESS") {
                loadUsers();
                formToogleShow('main-saldo-form');
            }
            if (responseText.STATE == "FAILURE") {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
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
    var passwordEdit = $('#passwordEdit').val();
    var groupEdit = $('#groupEdit').val();
    if (groupEdit == 'Cliente') {
        groupEdit = 'Clientes';
    }
    if (groupEdit == 'Administrador') {
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
            if (responseText.STATE == "SUCCESS") {
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
                        formToogleShow('main-edit-user-form');
                    }
                });
            }
            if (responseText.STATE == "FAILURE") {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function sendChat() {
    var idConversacion = $('#idConversacion').val();
    var idUsuarioChat = $('#idUsuarioChat').val();
    var mensaje = $('#mensaje').val();
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Mensaje.INSERT',
            IDCONVERSACION: idConversacion,
            IDUSUARIO: idUsuarioChat,
            MENSAJE: mensaje
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE == "SUCCESS") {
                getMensajesChat(getCookie('IDCONVERSACION'), getCookie('IDUSEREMISOR'), getCookie('IDUSERRECEPTOR'), getCookie('RECEPTORNOMBRE'));
                document.getElementById('mensaje').value = '';
            }
            if (responseText.STATE == "FAILURE") {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

function hashcode(toHash) {
  var hash = 0, i, chr;
  if (toHash.length === 0) return hash;
  for (i = 0; i < toHash.length; i++) {
    chr   = toHash.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};