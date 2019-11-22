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