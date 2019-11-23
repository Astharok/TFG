/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import DAOFactory.DAOFactory;
import Interfaces.UsuarioDAO;
import beans.Usuarios;
import interfaces.Action;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import util.Util;

/**
 *
 * @author Jose Raimundo Montes Lopez
 */
public class UsuarioAction implements Action {
    
    DAOFactory bd = DAOFactory.getDAOFactory(DAOFactory.MY_SQL);

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) {
        String results = "";
        String action = (String) request.getParameter("ACTION");
        String[] arrayAction = action.split("\\.");

        switch (arrayAction[1]) {
            case "REGISTER":
                results = register(request, response);
                break;
            case "LOGIN":
                System.out.println("TRACE: " + "Controller.Usuario.Login");
                results = login(request, response);
                break;
        }

        return results;
    }
    
    private String login(HttpServletRequest request, HttpServletResponse response) {
        UsuarioDAO usuarioDAO = bd.getUsuarioDAO();

        Usuarios usuario = new Usuarios();
        usuario.setApodo(request.getParameter("APODO"));
        usuario.setPassword(request.getParameter("PASSWORD"));
        
        Map<String, String> res = usuarioDAO.logIn(usuario);

        return Util.toJson(res);
    }
    
    private String register(HttpServletRequest request, HttpServletResponse response) {
        UsuarioDAO usuarioDAO = bd.getUsuarioDAO();

        Usuarios usuario = new Usuarios();
        usuario.setNombre(request.getParameter("NOMBRE"));
        usuario.setApellido(request.getParameter("APELLIDO"));
        usuario.setApodo(request.getParameter("APODO"));
        usuario.setPassword(request.getParameter("PASSWORD"));
        usuario.setEmail(request.getParameter("EMAIL"));
        usuario.setTelefono(request.getParameter("TELEFONO"));

        Boolean insertar = usuarioDAO.insertarUsuario(usuario);
        
        String res = "";
        
        if(insertar){
            res = "SUCCESS";
            res += "Usuario '" + usuario.getApodo() + "' insertado";
        } else {
            res = "ERROR";
            res += "Error al insertar Usuario '" + usuario.getApodo() + "'";
        }

        return Util.toJson(res);
    }
    
}
