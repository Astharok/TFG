function loadEquipos() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Equipo.LOADALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if (responseText.STATE === "SUCCESS") {
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
            if (responseText.STATE === "FAILURE") {
                alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}