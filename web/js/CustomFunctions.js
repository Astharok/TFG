function formToogleShow(formName, value) {
    if (formName == 'main-saldo-form') {
        document.getElementById("idUsuarioSaldo").value = value;
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
            if (responseText.STATE == "SUCCESS") {
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
                            + "<button type=\"button\" class=\"btn btn-secondary btn-sm\">Editar</button>"
                            + "  "
                            + "<button type=\"button\" class=\"btn btn-info btn-sm\">Mensaje</button>"
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
    var password = $('#password').val();
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
    if(action === "Restar al saldo"){
        cantidad = -1 * cantidad;
    }
    $('#alert').fadeIn();     
  setTimeout(function() {
       $("#alert").fadeOut();           
  },2000);
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
                alert("Saldo cambiado");
                loadUsers();
                formToogleShow('main-saldo-form');
            }
            if (responseText.STATE == "FAILURE") {
                //alert(responseText.STATE + ": " + responseText.MESSAGE);
            }
        }
    });
}