<%-- 
    Document   : administration
    Created on : 22-nov-2019, 15:40:13
    Author     : Jose Raimundo Montes Lopez
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <title>GamingCenter</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.css">
        <link rel="stylesheet" href="css/client.css">
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src="js/utils.js"></script>
        <script src="js/client.js"></script>
        <script src="js/equipos.js"></script>
        <script src="js/users.js"></script>
        <script src="js/chat.js"></script>
        <%@include  file="forms/chatform.html" %>
    </head>
    <body onload="javascript:loadContent()">
        <header>
            <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse navbar-dark bg-dark navbar-right">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="index.jsp">Gamer Zone</a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li><button type="button" class="btn btn-secondary" onclick="disconnect();">Desconectar</button></li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="container-fluid">
            <h5 id="userTitle" class="card-header">Bienvenido Usuario</h5>
        </div>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Saldo actual</h5>
                            <p id="saldoMainView" class="card-text">Tu saldo actual es de XX.XX €</p>
                            <a href="#" onclick="test()" class="btn btn-primary">Recargar</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Avisos</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="tab">
                <button class="tablinks" onclick="openTab(event, 'Equipos')" id="defaultOpen">Equipos</button>
                <button class="tablinks" onclick="openTab(event, 'Mensajes')">Mensajes</button>
                <button class="tablinks" onclick="openTab(event, 'Datos de usuario')">Datos de usuario</button>
            </div>
            <div id="Equipos" class="tabcontent">
                <table id="tableEquipos" class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Equipo</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Hora inicio</th>
                            <th scope="col">Contador</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="EquiposRows">
                    </tbody>
                </table>
            </div>

            <div id="Mensajes" class="tabcontent" >
                <div class="dropdown">
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button class="dropdown-item" type="button" onclick="formToogleShow('main-register-form');">Crear usuario</button>
                        <button class="dropdown-item" type="button">Crear alerta</button>
                    </div>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Apodo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="UsuariosRows" class="">
                    </tbody>
                </table>
            </div>

            <div id="Datos de usuario" class="tabcontent">
                <h3>Tokyo</h3>
                <p>Tokyo is the capital of Japan.</p>
            </div>
        </div>
    </body>
</html>
