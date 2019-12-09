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
        <link rel="stylesheet" href="css/toasts.css">
        <link rel="stylesheet" href="css/administration.css">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/utils.js"></script>
        <script src="js/toasts.js"></script>
        <script src="js/administration.js"></script>
        <script src="js/equipos.js"></script>
        <script src="js/users.js"></script>
        <script src="js/chat.js"></script>
        <script src="js/advises.js"></script>
        <script src="js/groups.js"></script>
        <%@include  file="forms/registerform.html" %>
        <%@include  file="forms/changesaldoform.html" %>
        <%@include  file="forms/edituserform.html" %>
        <%@include  file="forms/chatform.html" %>
        <%@include  file="forms/adviseform.html" %>
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
        <div id="mainToast" class="cutomToast"></div>
        <div class="container-fluid">
            <div class="tab">
                <button class="tablinks" onclick="openTab(event, 'Equipos')" id="defaultOpen">Equipos</button>
                <button class="tablinks" onclick="openTab(event, 'Usuarios')">Usuarios</button>
                <button class="tablinks" onclick="openTab(event, 'Ajustes')">Ajustes</button>
            </div>
            <div id="Equipos" class="tabcontent">
                <table id="tableEquipos" class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Equipo</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Usuario</th>
                            <th scope="col">Hora inicio</th>
                            <th scope="col">Contador</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="EquiposRows" class="">
                    </tbody>
                </table>
            </div>
            <div id="Usuarios" class="tabcontent" >
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="usersMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Menú
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button class="dropdown-item" type="button" onclick="formToogleShow('main-register-form');">Crear usuario</button>
                                        <button class="dropdown-item" type="button" onclick="formToogleShow('main-advise-form', null);">Crear aviso</button>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">Apodo</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellidos</th>
                            <th scope="col">Email</th>
                            <th scope="col">Teléfono</th>
                            <th scope="col">Saldo</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="UsuariosRows" class="">
                    </tbody>
                </table>
            </div>

            <div id="Ajustes" class="tabcontent">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="groupsMenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Menú
                                    </button>
                                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                                        <button class="dropdown-item" type="button" onclick="formToogleShow('main-crear-grupo-form');">Crear grupo</button>
                                        <button class="dropdown-item" type="button" onclick="formToogleShow('main-editar-grupo-form', null);">Editar grupo</button>
                                        <button class="dropdown-item" type="button" onclick="formToogleShow('main-crear-tarifa-form', null);">Crear tarifa</button>
                                        <button class="dropdown-item" type="button" onclick="formToogleShow('main-editar-tarifa-form', null);">Editar tarifa</button>
                                    </div>
                                </div>
                            </th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Tarifa</th>
                            <th scope="col">Precio por hora</th>
                            <th scope="col">Cambiar tarifa</th>
                        </tr>
                    </thead>
                    <tbody id="gruposRows" class="">
                    </tbody>
                </table>
            </div>
        </div>
    </body>
</html>
