function loadEquipos() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Equipo.LOADALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var equipos = $.parseJSON(responseText.EQUIPOS);
                var i;
                var htmldisabled = "";
                for (i = 0; i < equipos.length; i++) {
                    if (equipos[i].historialesEquiposCollection[0].iDHistorialEquipo !== 0 && parseInt(getCookie("ID_USUARIO")) === equipos[i].historialesEquiposCollection[0].iDUsuarioFK.iDUsuario) {
                        htmldisabled = " disabled";
                    }
                }
                var htmlidequipo;
                var htmlstatus;
                var htmlapodouser;
                var htmlhorainicio;
                var htmlcontadorequipo;
                var htmlaccion;
                var html = "";
                for (i = 0; i < equipos.length; i++) {
                    htmlidequipo = "";
                    htmlstatus = "Disponible";
                    htmlapodouser = "";
                    htmlhorainicio = "";
                    htmlcontadorequipo = "";
                    htmlaccion = "<button ";
                    htmlidequipo = "";
                    htmlcontadorequipo = " id=\"contador" + equipos[i].iDEquipo + "\" ";
                    if (equipos[i].historialesEquiposCollection[0].iDHistorialEquipo !== 0) {
                        htmlhorainicio = getHora24H(equipos[i].historialesEquiposCollection[0].fechaInicio);
                    }
                    if (getCookie('GROUP_NAME') === 'Administradores') {
                        htmlapodouser += "<td>";
                        if (equipos[i].historialesEquiposCollection[0].iDHistorialEquipo !== 0) {
                            htmlapodouser += equipos[i].historialesEquiposCollection[0].iDUsuarioFK.nombre;
                        }
                        htmlapodouser += "</td>";
                        if (equipos[i].historialesEquiposCollection[0].iDHistorialEquipo !== 0) {
                            htmlaccion += " onclick=\"desactivarEquipo(" + equipos[i].historialesEquiposCollection[0].iDHistorialEquipo + ")\" "
                                    + " type=\"button\" class=\"btn btn-primary btn-sm\">Desactivar</button>";
                            htmlstatus = "En uso"
                            htmlidequipo += " class=\"busy\"";
                        } else {
                            htmlaccion += " onclick=\"\" "
                                    + " type=\"button\" class=\"btn btn-primary btn-sm\">Activar</button>";
                            htmlstatus = "Disponible"
                            htmlidequipo += " class=\"free\"";
                        }
                    }
                    if (getCookie('GROUP_NAME') === 'Clientes') {
                        if (equipos[i].historialesEquiposCollection[0].iDHistorialEquipo !== 0 && parseInt(getCookie("ID_USUARIO")) === equipos[i].historialesEquiposCollection[0].iDUsuarioFK.iDUsuario) {
                            htmlaccion += " onclick=\"desactivarEquipo(null)\" "
                                    + " type=\"button\" class=\"btn btn-primary btn-sm\">Desactivar</button>";
                            htmlstatus = "En uso"
                            htmlidequipo += " id=\"equipoActivo\" equipoActivoId=\"" + equipos[i].historialesEquiposCollection[0].iDHistorialEquipo + "\"";
                            htmlidequipo += " class=\"use\"";
                        } else {
                            if (equipos[i].historialesEquiposCollection[0].iDHistorialEquipo !== 0) {
                                htmlaccion += " onclick=\"\" "
                                        + " type=\"button\" class=\"btn btn-primary btn-sm\" disabled>Activar</button>";
                                htmlstatus = "En uso"
                                htmlidequipo += " class=\"busy\"";

                            } else {
                                htmlaccion += " onclick=\"activarEquipo(" + equipos[i].iDEquipo + ", null)\" "
                                        + " type=\"button\" class=\"btn btn-primary btn-sm\"" + htmldisabled + ">Activar</button>";
                                htmlstatus = "Disponible"
                                htmlidequipo += " class=\"free\"";

                            }
                        }
                    }
                    html += ""
                            + "<tr" + htmlidequipo + ">"
                            + "<th scope=\"row\">" + (i + 1) + "</th>"
                            + "<td>" + equipos[i].nombre + "</td>"
                            + "<td>"
                            + htmlstatus
                            + "</td>"
                            + htmlapodouser
                            + "<td id=\"horaini\">"
                            + htmlhorainicio
                            + "</td>"
                            + "<td id=\"contador\"></td>"
                            + "<td>"
                            + htmlaccion
                            + "</td>"
                            + "</tr>";
                }
                document.getElementById("EquiposRows").innerHTML = html;
                initContadores();
            }
            if (responseText.STATE === "FAILURE") {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function activarEquipo(idEquipo, idusuariosaldo) {
    if (idusuariosaldo === null) {
        idusuariosaldo = getCookie("ID_USUARIO");
    }
    if (idusuariosaldo !== null) {
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
                    document.getElementById("saldoMainView").innerHTML = 'Tu saldo actual es de ' + user.saldo + ' €';
                    if (user.saldo <= 0) {
                        desactivarEquipo();
                    } else {
                        $.ajax({
                            url: '/TFG_Web/ControllerTFG',
                            data: {
                                ACTION: 'Equipo.ACTIVAR',
                                EQUIPOID: idEquipo,
                                USUARIOID: idusuariosaldo
                            },
                            dataType: 'json',
                            success: function (responseText) {
                                if (responseText.STATE === "SUCCESS") {
                                    loadEquipos();
                                }
                                if (responseText.STATE === "FAILURE") {
                                    alert(responseText.STATE + ": " + responseText.MESSAGE);
                                }
                            }
                        });
                    }
                }
                if (responseText.STATE === "FAILURE") {
                    alert(responseText.STATE + ": " + responseText.MESSAGE);
                }
            }
        });
    }
}

function desactivarEquipo(idHistorialEquipo) {
    if(idHistorialEquipo === null){
        var equipoActivo = document.getElementById("equipoActivo");
        if (equipoActivo !== null) {
            idHistorialEquipo = equipoActivo.getAttribute("equipoActivoId");
        }
    }
    if (idHistorialEquipo !== null) {
        $.ajax({
            url: '/TFG_Web/ControllerTFG',
            data: {
                ACTION: 'Equipo.DESACTIVAR',
                HISTORIALID: idHistorialEquipo
            },
            dataType: 'json',
            success: function (responseText) {
                if (responseText.STATE === "SUCCESS") {
                    loadEquipos();
                }
                if (responseText.STATE === "FAILURE") {
                    alert(responseText.STATE + ": " + responseText.MESSAGE);
                }
            }
        });
    }
}

function initContadores() {
    var table = document.getElementById("tableEquipos");
    var i;
    var horaini;
    var contador;
    for (i = 0; i < table.rows.length; i++) {
        horaini = table.rows[i].cells.namedItem("horaini");
        contador = table.rows[i].cells.namedItem("contador");
        if (horaini !== null) {
            if (horaini !== "Hora inicio") {
                var horas = 0;
                var minutos = 0;
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
                if (segundos > 60) {
                    minutos = Math.floor(segundos / 60);
                    segundos = segundos - minutos * 60;
                    if (minutos > 60) {
                        horas = Math.floor(minutos / 60);
                        minutos = minutos - horas * 60;
                    }
                }
            }
            var time = horas + ":" + minutos + ":" + segundos;
            if (horaini.innerHTML === "") {
                contador.innerHTML = "";
            } else {
                contador.innerHTML = time;
            }
        }
    }

}