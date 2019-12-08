function getUserForChat(idUserReceptor) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.FIND',
            IDUSUARIO: idUserReceptor
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var user = $.parseJSON(responseText.USUARIO);
                document.getElementById("chatUserTitle").innerHTML = 'Chat con ' + user.nombre;
                //getSessionUserForConversacion(idUserReceptor, user.nombre);
                getConversacion(idUserReceptor, getCookie("ID_USUARIO"), user.nombre);
            }
        }
    });
}

function getSessionUserForConversacion(idUserReceptor, receptorNombre) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Sesion.FIND',
            SESSIONID: getCookie("SESSION_ID")
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
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
            if (responseText.STATE === "SUCCESS") {
                document.getElementById("idConversacion").value = responseText.CONVERSACION_ID;
                document.getElementById("idUsuarioChat").value = idUserEmisor;
                setCookie('IDCONVERSACION', responseText.CONVERSACION_ID, 1);
                setCookie('IDUSERRECEPTOR', idUserReceptor, 1);
                setCookie('IDUSEREMISOR', idUserEmisor, 1);
                setCookie('RECEPTORNOMBRE', receptorNombre, 1);
                getMensajesChat();
            }
        }
    });
}

function getMensajesChat() {
    var idConversacion = getCookie('IDCONVERSACION');
    var idUserReceptor = getCookie('IDUSERRECEPTOR');
    var receptorNombre = getCookie('RECEPTORNOMBRE');
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Mensaje.FINDBYCONVER',
            IDCONVERSACION: idConversacion
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
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
                    var date = dia + ' ' + mes + ' ' + year;
                    if (lastdate !== date) {
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
                    if (lastuser !== arrayMensajes[i].iDUsuarioFK.iDUsuario || changedate) {
                        lastuser = arrayMensajes[i].iDUsuarioFK.iDUsuario;
                        changedate = false;
                        var hora = fechaArray[3];
                        html += '\n';
                        html += hora + ' - ';
                        if (arrayMensajes[i].iDUsuarioFK.iDUsuario === parseInt(idUserReceptor)) {
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
            if (responseText.STATE === "SUCCESS") {
                getMensajesChat(getCookie('IDCONVERSACION'), getCookie('IDUSEREMISOR'), getCookie('IDUSERRECEPTOR'), getCookie('RECEPTORNOMBRE'));
                document.getElementById('mensaje').value = '';
            }
            if (responseText.STATE === "FAILURE") {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}