function loginFormToogleShow(){
    var docClasses = document.getElementById('main-login-form').classList;
    if(docClasses.contains('hidden')){
        docClasses.replace('hidden', 'visible');
        return;
    }
    if(docClasses.contains('visible')){
        docClasses.replace('visible', 'hidden');
        return;
    }
}

function login(){
    var apodo = $('#userName').val();
    var password = $('#password').val();
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Usuario.LOGIN',
            APODO: apodo,
            PASSWORD: password
        },
        dataType: 'json',
        success: function (responseText) {
            if(responseText.STATE == "SUCCESS"){
                if(responseText.GROUP_NAME == "Administradores"){
                    window.location.href = "administration.jsp";
                }else{
                    alert(responseText.STATE + ": " + responseText.MESSAGE);
                }
            }
            if(responseText.STATE == "FAILURE"){
                alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function loadContent() {
    document.getElementById("defaultOpen").click();
    loadEquipos();
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
}

function loadEquipos() {
    $.ajax({
        url: '/TFG_Web/ControllerTFG',
        data: {
            ACTION: 'Equipo.LOADALL'
        },
        dataType: 'json',
        success: function (responseText) {
            if(responseText.STATE == "SUCCESS"){
                var myArr = $.parseJSON(responseText.EQUIPOS);
                var i;
                var html = "";
                for (i = 0; i < myArr.length; i++) {
                    html += ""
                        + "<tr>"
                            + "<th scope=\"row\">" + ( i + 1) + "</th>"
                            + "<td>" + myArr[i].nombre + "</td>"
                            + "<td></td>"
                            + "<td></td>"
                        + "</tr>";
                }
                document.getElementById("EquiposRows").innerHTML = html;
            }
            if(responseText.STATE == "FAILURE"){
                alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}

function register() {
    var nombre = $('#RegisterName').val();
    var apellido = $('#RegisterApellido').val();
    var apodo = $('#RegisterApodo').val();
    var password = $('#RegisterPassword').val();
    var email = $('#RegisterEmail').val();
    var telefono = $('#RegisterTelefono').val();
    $.ajax({
        url: '/TFG_Web/Controller',
        data: {
            ACTION: 'Usuario.REGISTER',
            NOMBRE: nombre,
            APELLIDO: apellido,
            APODO: apodo,
            PASSWORD: password,
            EMAIL: email,
            TELEFONO: telefono
        },
        success: function (responseText) {
            window.location.href = "login.html";
        }
    });
}