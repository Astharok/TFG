/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import DAOFactory.DAOFactory;
import Interfaces.AvisoDAO;
import beans.Avisos;
import beans.GruposUsuarios;
import beans.Usuarios;
import interfaces.Action;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import util.Util;

/**
 *
 * @author Jose Raimundo Montes Lopez
 */
public class AvisoAction implements Action {
    
    DAOFactory bd = DAOFactory.getDAOFactory(DAOFactory.MY_SQL);

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) {
        String results = "";
        String action = (String) request.getParameter("ACTION");
        String[] arrayAction = action.split("\\.");

        switch (arrayAction[1]) {
            case "INSERT":
                results = insert(request, response);
                break;
            case "FINDBYUSER":
                results = findByUser(request, response);
                break;
        }

        return results;
    }

    private String insert(HttpServletRequest request, HttpServletResponse response) {
        AvisoDAO avisoDAO = bd.getAvisoDAO();
        
        Map<String, String> gruposMap;
        List<GruposUsuarios> grupos = new ArrayList<>();
        String gruposJson;
        
        gruposJson = request.getParameter("GRUPOS");
        
        gruposMap = Util.fromJson(gruposJson);
        
        for(String val: gruposMap.values()){
            GruposUsuarios grupo = new GruposUsuarios();
            grupo.setIDGrupoUsuarios(Integer.valueOf(val));
            grupos.add(grupo);
        }
        
        Avisos aviso = new Avisos();
        aviso.setTitulo(request.getParameter("TITULO"));
        aviso.setTexto(request.getParameter("TEXTO"));
        
        Map<String, String> res = avisoDAO.insert(aviso, grupos);

        return Util.toJson(res);
    }

    private String findByUser(HttpServletRequest request, HttpServletResponse response) {
        AvisoDAO avisoDAO = bd.getAvisoDAO();
        
        Usuarios usuario = new Usuarios();
        usuario.setIDUsuario(Integer.valueOf(request.getParameter("IDUSUARIO")));
        
        Map<String, String> res = avisoDAO.findByUser(usuario);

        return Util.toJson(res);
    }
    
}
