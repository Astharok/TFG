/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import DAOFactory.DAOFactory;
import Interfaces.MensajeDAO;
import beans.Conversaciones;
import beans.Mensajes;
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
public class MensajeAction implements Action {

    DAOFactory bd = DAOFactory.getDAOFactory(DAOFactory.MY_SQL);

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) {
        String results = "";
        String action = (String) request.getParameter("ACTION");
        String[] arrayAction = action.split("\\.");

        switch (arrayAction[1]) {
            case "INSERT":
                System.out.println("TRACE: " + "INSERT");
                results = insert(request, response);
                break;
            case "FINDBYCONVER":
                System.out.println("TRACE: " + "FINDBYCONVER");
                results = findByConversacion(request, response);
                break;
        }

        return results;
    }

    private String insert(HttpServletRequest request, HttpServletResponse response) {
        MensajeDAO mensajeDAO = bd.getMensajeDAO();
        
        Conversaciones conversacion = new Conversaciones();
        conversacion.setIDConversacion((int)Double.parseDouble(request.getParameter("IDCONVERSACION")));
        
        Usuarios usuario = new Usuarios();
        usuario.setIDUsuario(Integer.parseInt(request.getParameter("IDUSUARIO")));
        
        Mensajes mensaje = new Mensajes();
        mensaje.setTextoMensaje(request.getParameter("MENSAJE"));
        mensaje.setIDConversacionFK(conversacion);
        mensaje.setIDUsuarioFK(usuario);
        
        Map<String, String> res = mensajeDAO.insert(mensaje);

        return Util.toJson(res);
    }

    private String findByConversacion(HttpServletRequest request, HttpServletResponse response) {
        MensajeDAO mensajeDAO = bd.getMensajeDAO();
        
        Conversaciones conversacion = new Conversaciones();
        conversacion.setIDConversacion((int)Double.parseDouble(request.getParameter("IDCONVERSACION")));
        
        Map<String, String> res = mensajeDAO.findByConversacion(conversacion);

        return Util.toJson(res);
    }
    
}
