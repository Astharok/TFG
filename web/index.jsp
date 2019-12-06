<%-- 
    Document   : indexPrueba
    Created on : 22-nov-2019, 12:18:16
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
        <link rel="stylesheet" href="css/index.css">
        <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
        <script src="js/jquery-3.3.1.min.js"></script>
        <script src="js/utils.js"></script>
        <script src="js/index.js"></script>
        <%@include  file="forms/loginform.html" %>
    </head>
    <body onload="javascript:loadContent()">
        <header>
            <nav class="navbar navbar-toggleable-md navbar-inverse bg-inverse navbar-dark bg-dark navbar-right">
                <div class="container-fluid">
                    <div class="navbar-header">
                        <a class="navbar-brand" href="index.jsp">Gamer Zone</a>
                    </div>
                    <ul class="nav navbar-nav navbar-right">
                        <li><button type="button" class="btn btn-secondary" onclick="formToogleShow('main-login-form');">Login</button></li>
                    </ul>
                </div>
            </nav>
        </header>

        <div class="container-fluid bg-light ">
            <div class="page-header">
                <img src="images/Logo_GZ.png" class="img-fluid rounded mx-auto d-block logoMain" alt="Responsive image">
            </div>
            <div class="container">
                <div class="row justify-content-md-center">
                    <div class="jumbotron vertical-center">
                        <h1>Bienvenido a Gamer Zone</h1>
                    </div>
                </div>
            </div>
        </div>
    </body>
</html>
