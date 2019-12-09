function getgroupsForAdvise() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Grupo.FINDALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var myArr = $.parseJSON(responseText.GRUPOS);
                var i, idCheckbox, checkBoxValue, checkBoxName;
                var html = "";
                document.getElementById("checkboxes").innerHTML = html;
                for (i = 0; i < myArr.length; i++) {
                    idCheckbox = "checkBox" + myArr[i].iDGrupoUsuarios;
                    checkBoxValue = myArr[i].iDGrupoUsuarios;
                    checkBoxName = myArr[i].nombre;
                    html += ""
                            + "<div class=\"form-check form-check-inline\">"
                            + "<input class=\"form-check-input\" type=\"checkbox\" id=\"" + idCheckbox + "\" value=\"" + checkBoxValue + "\">"
                            + "<label class=\"form-check-label\" for=\"" + idCheckbox + "\">" + checkBoxName + "</label>"
                            + "</div>";
                }
                document.getElementById("checkboxes").innerHTML = html;
            }
            if (responseText.STATE === "FAILURE") {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function sendAdvise() {
    var tituloAviso, textoAviso, grupos, checkBoxes, i, x, gruposJson;
    tituloAviso = document.getElementById("tituloAviso").value;
    textoAviso = document.getElementById("textoAviso").value;
    checkBoxes = document.getElementById("checkboxes").childNodes;
    grupos = {};
    x = 1;
    for (i = 0; i < checkBoxes.length; i++) {
        if (checkBoxes[i].childNodes[0].checked) {
            grupos['iDGrupoUsuarios' + x] = checkBoxes[i].childNodes[0].value;
            x++;
        }
    }
    gruposJson = JSON.stringify(grupos);
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        contentType: "application/json",
        data: {
            ACTION: 'Aviso.INSERT',
            TITULO: tituloAviso,
            TEXTO: textoAviso,
            GRUPOS: gruposJson
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                document.getElementById("tituloAviso").value = "";
                document.getElementById("textoAviso").value = "";
                for (i = 0; i < checkBoxes.length; i++) {
                    checkBoxes[i].childNodes[0].checked = false;
                }
                toast("mainToast", "Aviso registrado");
                formToogleShow('main-advise-form', null);
            }
            if (responseText.STATE === "FAILURE") {
                toast("mainToast", responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function getAdvises(idUsuario) {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        contentType: "application/json",
        data: {
            ACTION: 'Aviso.FINDBYUSER',
            IDUSUARIO: idUsuario
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
                var avisosCards, avisosArray, i, html, avisoTitulo, avistoTexto;
                avisosCards = document.getElementById("avisosCards");
                avisosArray = $.parseJSON(responseText.AVISOS);
                avisosCards.innerHTML = "";
                html = "";
                if (avisosArray.length !== 0) {
                    for (i = 0; i < avisosArray.length; i++) {
                        avisoTitulo = avisosArray[i].titulo;
                        avistoTexto = avisosArray[i].texto;
                        avisoDate = avisosArray[i].fecha;
                        html += "<div class=\"card-body aviso-card\">"
                                + "<h5 class=\"card-title\">" + avisoTitulo + "</h5>"
                                + "<p class=\"card-text\">" + avistoTexto + "</p>"
                                + "<p class=\"card-text\"><small class=\"text-muted\">" + avisoDate + "</small></p>"
                                + "</div>";
                    }
                } else {
                    html += "<div class=\"card-body aviso-card\">"
                            + "<h5 class=\"card-title\">" + "Sin avisos" + "</h5>"
                            + "<p class=\"card-text\">" + "No tienes ningún aviso actualmente" + "</p>"
                            + "<p class=\"card-text\"><small class=\"text-muted\">" + new Date() + "</small></p>"
                            + "</div>";
                }
                avisosCards.innerHTML += html;
            }
            if (responseText.STATE === "FAILURE") {
                avisosCards = document.getElementById("avisosCards");
                avisosCards.innerHTML = "";
                var html = "";
                html += "<div class=\"card-body aviso-card\">"
                        + "<h5 class=\"card-title\">" + "Sin avisos" + "</h5>"
                        + "<p class=\"card-text\">" + "No tienes ningún aviso actualmente" + "</p>"
                        + "<p class=\"card-text\"><small class=\"text-muted\">" + new Date() + "</small></p>"
                        + "</div>";
                avisosCards.innerHTML += html;
            }
        }
    });
}