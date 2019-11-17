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