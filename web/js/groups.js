function loadGroups() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FINDALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var grupos = $.parseJSON(responseText.GRUPOS);
                var tarifas = $.parseJSON(responseText.TARIFAS);
                var i, x, htmlidgrupo, htmlnombregrupo, htmltarifagrupo, htmlpreciogrupo, htmlacciontarifa, htmlaccioneditar;
                var html = "";
                for (i = 0; i < grupos.length; i++) {
                    htmlidgrupo = "";
                    htmlnombregrupo = "";
                    htmltarifagrupo = "";
                    htmlpreciogrupo = "";
                    htmlacciontarifa = "";
                    htmlaccioneditar = "";
                    if (getCookie('GROUP_NAME') === 'Administradores') {
                        htmlidgrupo += "id=\"" + grupos[i].iDGrupoUsuarios + "\"";
                        htmlnombregrupo += grupos[i].nombre;
                        htmltarifagrupo += grupos[i].iDTarifaFK.nombre;
                        htmlpreciogrupo += grupos[i].iDTarifaFK.precioporhora + "€/hora";
                        htmlacciontarifa += "<select id=\"selectedGroup" + grupos[i].iDGrupoUsuarios + "\" class=\"form-control\" onchange=\"updateTarifaGroup(" + grupos[i].iDGrupoUsuarios + ", '" + grupos[i].nombre + "')\">";
                        for (x = 0; x < tarifas.length; x++) {
                            htmlacciontarifa += "<option value=\"" + tarifas[x].iDTarifa + "\"";
                            if (grupos[i].iDTarifaFK.iDTarifa === tarifas[x].iDTarifa) {
                                htmlacciontarifa += " selected";
                            }
                            htmlacciontarifa += ">";
                            htmlacciontarifa += tarifas[x].nombre + " (" + tarifas[x].precioporhora + "€/hora)";
                            htmlacciontarifa += "</option>";
                        }
                        htmlacciontarifa += "</select>";
                        htmlaccioneditar += "<button onclick=\"formToogleShow('main-edit-group-form', " + grupos[i].iDGrupoUsuarios + ");\" type=\"button\" class=\"btn btn-primary btn-sm\">Editar</button>";
                        html += ""
                                + "<tr" + htmlidgrupo + ">"
                                + "<th scope=\"row\">" + htmlaccioneditar + "</th>"
                                + "<td>"
                                + htmlnombregrupo
                                + "</td>"
                                + "<td>"
                                + htmltarifagrupo
                                + "</td>"
                                + "<td>"
                                + htmlpreciogrupo
                                + "</td>"
                                + "<td>"
                                + htmlacciontarifa
                                + "</td>"
                                + "</tr>";
                    }
                }
                document.getElementById("gruposRows").innerHTML = html;
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function updateTarifaGroup(idGrupo, nombre) {
    var idTarifa = document.getElementById("selectedGroup" + idGrupo).value;
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.UPDATEGRUPO',
            IDGRUPO: idGrupo,
            NOMBRE: nombre,
            IDTARIFA: idTarifa
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                toast("mainToast", "Tarifa cambiada correctamente.");
                loadGroups();
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function getTarifasForNewGroup() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FINDALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var tarifas = $.parseJSON(responseText.TARIFAS);
                var i, htmlidtarifa, htmlnombretarifa, htmlpreciotarifa;
                var html = "";
                for (i = 0; i < tarifas.length; i++) {
                    htmlidtarifa = tarifas[i].iDTarifa;
                    htmlnombretarifa = tarifas[i].nombre;
                    htmlpreciotarifa = tarifas[i].precioporhora;
                    html += "<option value=\"" + htmlidtarifa + "\">" + htmlnombretarifa + "(" + htmlpreciotarifa + "€/hora)</option>"
                }
                document.getElementById("tarifaGroupNew").innerHTML = html;
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function insertGroup() {
    var idTarifa = document.getElementById("tarifaGroupNew").value;
    var nombre = document.getElementById("groupNameNew").value;
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.INSERTAGRUPO',
            NOMBRE: nombre,
            IDTARIFA: idTarifa
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                toast("mainToast", "Grupo registrado correctamente.");
                loadGroups();
                formToogleShow('main-create-group-form', null);
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function getGroupForEdit(iDGrupoUsuarios) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FIND',
            IDGRUPO: iDGrupoUsuarios
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var grupo = $.parseJSON(responseText.GRUPO);
                var tarifas = $.parseJSON(responseText.TARIFAS);
                document.getElementById("idGroupEdit").value = grupo.iDGrupoUsuarios;
                document.getElementById("groupNameEdit").value = grupo.nombre;
                var i, htmlidtarifa, htmlnombretarifa, htmlpreciotarifa;
                var html = "";
                for (i = 0; i < tarifas.length; i++) {
                    htmlidtarifa = tarifas[i].iDTarifa;
                    htmlnombretarifa = tarifas[i].nombre;
                    htmlpreciotarifa = tarifas[i].precioporhora;
                    html += "<option ";
                    if (parseInt(grupo.iDTarifaFK.iDTarifa) === parseInt(tarifas[i].iDTarifa)) {
                        html += "selected ";
                    }
                    html += "value=\"" + htmlidtarifa + "\">" + htmlnombretarifa + "(" + htmlpreciotarifa + "€/hora)</option>";
                }
                document.getElementById("tarifaGroupEdit").innerHTML = html;
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function updateGroup() {
    var idGrupo = document.getElementById("idGroupEdit").value;
    var idTarifa = document.getElementById("tarifaGroupEdit").value;
    var nombre = document.getElementById("groupNameEdit").value;
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.UPDATEGRUPO',
            IDGRUPO: idGrupo,
            NOMBRE: nombre,
            IDTARIFA: idTarifa
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                toast("mainToast", "Grupo editado correctamente.");
                loadGroups();
                formToogleShow('main-edit-group-form', null);
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function getgroupsForRegisterUser() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FINDALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var grupos = $.parseJSON(responseText.GRUPOS);
                var html = "";
                for (i = 0; i < grupos.length; i++) {
                    html += "<option value=\"" + grupos[i].iDGrupoUsuarios + "\">" + grupos[i].nombre + "</option>";
                }
                document.getElementById("groupUserRegister").innerHTML = html;
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function getgroupsForEditUser(iDGrupoUsuarios) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FINDALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var grupos = $.parseJSON(responseText.GRUPOS);
                var i;
                var html = "";
                for (i = 0; i < grupos.length; i++) {
                    html += "<option ";
                    if (parseInt(grupos[i].iDGrupoUsuarios) === parseInt(iDGrupoUsuarios)) {
                        html += "selected ";
                    }
                    html += "value=\"" + grupos[i].iDGrupoUsuarios + "\">" + grupos[i].nombre + "</option>";
                }
                document.getElementById("groupUserEdit").innerHTML = html;
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function insertTarifa() {
    var nombre = document.getElementById("nombreTarifaInsert").value;
    var precio = document.getElementById("precioTarifaInsert").value;
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.INSERTATARIFA',
            NOMBRE: nombre,
            PRECIO: precio
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                toast("mainToast", "Tarifa registrada correctamente.");
                loadGroups();
                formToogleShow('main-create-tarifa-form', null);
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function getTarifasForEdit () {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FINDALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var tarifas = $.parseJSON(responseText.TARIFAS);
                var i;
                var html = "";
                for (i = 0; i < tarifas.length; i++) {
                    html += "<option value=\"" + tarifas[i].iDTarifa + "\">" + tarifas[i].nombre + "(" + tarifas[i].precioporhora + "€/hora)" + "</option>";
                }
                document.getElementById("tarifaEdit").innerHTML = html;
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function getTarifasForEdit () {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FINDALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var tarifas = $.parseJSON(responseText.TARIFAS);
                var i;
                var html = "";
                for (i = 0; i < tarifas.length; i++) {
                    html += "<option value=\"" + tarifas[i].iDTarifa + "\">" + tarifas[i].nombre + "(" + tarifas[i].precioporhora + "€/hora)" + "</option>";
                }
                document.getElementById("tarifaEdit").innerHTML = html;
                if(tarifas.length > 0){
                    document.getElementById("idTarifaEdit").value = tarifas[0].iDTarifa;
                    document.getElementById("nombreTarifaEdit").value = tarifas[0].nombre;
                    document.getElementById("precioTarifaEdit").value = tarifas[0].precioporhora;
                }
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function selectorTarifa() {
    var idTarifa = document.getElementById("tarifaEdit").value;
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FINDTARIFA',
            IDTARIFA: idTarifa,
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var tarifa = $.parseJSON(responseText.TARIFA);
                document.getElementById("idTarifaEdit").value = tarifa.iDTarifa;
                document.getElementById("nombreTarifaEdit").value = tarifa.nombre;
                document.getElementById("precioTarifaEdit").value = tarifa.precioporhora;
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function updateTarifa() {
    var idTarifa = document.getElementById("idTarifaEdit").value;
    var nombre = document.getElementById("nombreTarifaEdit").value;
    var precio = document.getElementById("precioTarifaEdit").value;
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.UPDATETARIFA',
            IDTARIFA: idTarifa,
            NOMBRE: nombre,
            PRECIO: precio
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                toast("mainToast", "Tarifa editada correctamente.");
                loadGroups();
                formToogleShow('main-edit-tarifa-form', 'NotNull');
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function eliminarGrupo() {
    var idGrupo = document.getElementById("idGroupEdit").value;
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.ELIMINARGRUPO',
            IDGRUPO: idGrupo
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                toast("mainToast", "Grupo eliminado correctamente.");
                loadGroups();
                formToogleShow('main-edit-group-form', null);
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function eliminarTarifa() {
    var idTarifa = document.getElementById("idTarifaEdit").value;
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.ELIMINARTARIFA',
            IDTARIFA: idTarifa
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                toast("mainToast", "Tarifa eliminada correctamente.");
                loadGroups();
                formToogleShow('main-edit-tarifa-form', 'NotNull');
            } else {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}