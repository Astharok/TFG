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
        String cadDestino = "";
        String action = (String) request.getParameter("ACTION");
        String[] arrayAction = action.split("\\.");

        switch (arrayAction[1]) {
            case "REGISTER":
                cadDestino = register(request, response);
                break;
        }

        return cadDestino;
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
