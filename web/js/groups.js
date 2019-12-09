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
                var i, x, htmlidgrupo, htmlnombregrupo, htmltarifagrupo, htmlpreciogrupo, htmlacciones;
                var html = "";
                for (i = 0; i < grupos.length; i++) {
                    htmlidgrupo = "";
                    htmlnombregrupo = "";
                    htmltarifagrupo = "";
                    htmlpreciogrupo = "";
                    htmlacciones = "";
                    if (getCookie('GROUP_NAME') === 'Administradores') {
                        htmlidgrupo += "id=\"" + grupos[i].iDGrupoUsuarios + "\"";
                        htmlnombregrupo += grupos[i].nombre;
                        htmltarifagrupo += grupos[i].iDTarifaFK.nombre;
                        htmlpreciogrupo += grupos[i].iDTarifaFK.precioporhora + "€/hora";
                        htmlacciones += "<select id=\"selectedGroup" + grupos[i].iDGrupoUsuarios + "\" class=\"form-control\" onchange=\"updateTarifaGroup(" + grupos[i].iDGrupoUsuarios + ")\">";
                        for (x = 0; x < tarifas.length; x++) {
                            htmlacciones += "<option value=\"" + tarifas[x].iDTarifa + "\"";
                            if(grupos[i].iDTarifaFK.iDTarifa === tarifas[x].iDTarifa){
                                htmlacciones += " selected";
                            }
                            htmlacciones += ">";
                            htmlacciones += tarifas[x].nombre + " (" + tarifas[x].precioporhora + "€/hora)";
                            htmlacciones += "</option>";
                        }
                        htmlacciones += "</select>";
                        html += ""
                                + "<tr" + htmlidgrupo + ">"
                                + "<th scope=\"row\">" + (i + 1) + "</th>"
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
                                + htmlacciones
                                + "</td>"
                                + "</tr>";
                    }
                }
                document.getElementById("gruposRows").innerHTML = html;
            }
            if (responseText.STATE === "FAILURE") {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function updateTarifaGroup(idGrupo){
    var idTarifa = document.getElementById("selectedGroup" + idGrupo).value;
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.UPDATETARIFA',
            IDGRUPO: idGrupo,
            IDTARIFA: idTarifa
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                toast("mainToast", "Tarifa cambiada correctamente.");
                loadGroups()
            }
            if (responseText.STATE === "FAILURE") {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}