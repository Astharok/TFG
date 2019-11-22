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

function loginButton2(showhide){
    const vis = document.getElementById('main-login-form').style.visibility;
    if(vis == "hidden"){
        document.getElementById('main-login-form').style.visibility="visible";
    }
    if(showhide == "show"){
        document.getElementById('main-login-form').style.visibility="visible";
    }else if(showhide == "hide"){
        document.getElementById('main-login-form').style.visibility="hidden"; 
    }
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