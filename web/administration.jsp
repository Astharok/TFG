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
        <link rel="stylesheet" href="css/administration.css">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/CustomFunctions.js"></script>
    </head>
    <body onload="javascript:loadContent()">
        <header>
            <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse navbar-dark bg-dark navbar-right">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="index.html">Gamer Zone</a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li><button type="button" class="btn btn-secondary" onclick="disconnect();">Desconectar</button></li>
                    </ul>
                </div>
            </nav>
        </header>
        <div class="container-fluid">
            <div class="tab">
                <button class="tablinks" onclick="openTab(event, 'Equipos')" id="defaultOpen">Equipos</button>
                <button class="tablinks" onclick="openTab(event, 'Usuarios')">Usuarios</button>
                <button class="tablinks" onclick="openTab(event, 'Ajustes')">Ajustes</button>
            </div>

            <div id="Equipos" class="tabcontent content">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Equipo</th>
                                <th scope="col">Hora inicio</th>
                                <th scope="col">Contador</th>
                            </tr>
                        </thead>
                            <tbody id="EquiposRows" class="">
                            </tbody>
                    </table>
            </div>

            <div id="Usuarios" class="tabcontent">
                <h3>Paris</h3>
                <p>Paris is the capital of France.</p>
            </div>

            <div id="Ajustes" class="tabcontent">
                <h3>Tokyo</h3>
                <p>Tokyo is the capital of Japan.</p>
            </div>
        </div>
    </body>
</html>
