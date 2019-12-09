/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import DAOFactory.DAOFactory;
import Interfaces.UsuarioDAO;
import beans.GruposUsuarios;
import beans.Recargas;
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
                results = login(request, response);
                break;
            case "LOADALL":
                results = loadAll(request, response);
                break;
            case "CHANGESALDO":
                results = changesaldo(request, response);
                break;
            case "FIND":
                results = find(request, response);
                break;
            case "EDIT":
                results = edit(request, response);
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
        
        GruposUsuarios grupo = new GruposUsuarios();
        grupo.setIDGrupoUsuarios(Integer.parseInt(request.getParameter("GRUPOFK")));

        Usuarios usuario = new Usuarios();
        usuario.setNombre(request.getParameter("NOMBRE"));
        usuario.setApellido(request.getParameter("APELLIDO"));
        usuario.setApodo(request.getParameter("APODO"));
        usuario.setPassword(request.getParameter("PASSWORD"));
        usuario.setEmail(request.getParameter("EMAIL"));
        usuario.setTelefono(request.getParameter("TELEFONO"));
        usuario.setIDGrupoUsuarioFK(grupo);
        
        System.out.println(usuario);
        
        Map<String, String> res = usuarioDAO.insertarUsuario(usuario);

        return Util.toJson(res);
    }
    
    private String loadAll(HttpServletRequest request, HttpServletResponse response) {
        UsuarioDAO usuarioDAO = bd.getUsuarioDAO();
        
        Map<String, String> res = usuarioDAO.loadAll();

        return Util.toJson(res);
    }

    private String changesaldo(HttpServletRequest request, HttpServletResponse response) {
        UsuarioDAO usuarioDAO = bd.getUsuarioDAO();

        Usuarios usuario = new Usuarios();
        usuario.setIDUsuario(Integer.parseInt(request.getParameter("IDUSUARIO")));
        
        Recargas recarga = new Recargas();
        recarga.setCantidad(Double.parseDouble(request.getParameter("CANTIDAD")));
        recarga.setNotas(request.getParameter("NOTAS"));
        recarga.setIDUsuarioFK(usuario);
        
        Map<String, String> res = usuarioDAO.changeSaldo(recarga);

        return Util.toJson(res);
    }

    private String find(HttpServletRequest request, HttpServletResponse response) {
        UsuarioDAO usuarioDAO = bd.getUsuarioDAO();

        Usuarios usuario = new Usuarios();
        usuario.setIDUsuario(Integer.parseInt(request.getParameter("IDUSUARIO")));
        
        Map<String, String> res = usuarioDAO.find(usuario);

        return Util.toJson(res);
    }

    private String edit(HttpServletRequest request, HttpServletResponse response) {
        UsuarioDAO usuarioDAO = bd.getUsuarioDAO();
        
        GruposUsuarios grupo = new GruposUsuarios();
        
        if(request.getParameter("GRUPOFK") != null){
            grupo.setIDGrupoUsuarios(Integer.parseInt(request.getParameter("GRUPOFK")));
        }

        Usuarios usuario = new Usuarios();
        usuario.setIDUsuario(Integer.parseInt(request.getParameter("IDUSUARIO")));
        usuario.setNombre(request.getParameter("NOMBRE"));
        usuario.setApellido(request.getParameter("APELLIDO"));
        usuario.setApodo(request.getParameter("APODO"));
        usuario.setPassword(request.getParameter("PASSWORD"));
        usuario.setEmail(request.getParameter("EMAIL"));
        usuario.setTelefono(request.getParameter("TELEFONO"));
        usuario.setIDGrupoUsuarioFK(grupo);
        
        Map<String, String> res = usuarioDAO.editarUsuario(usuario);

        return Util.toJson(res);
    }
    
}
