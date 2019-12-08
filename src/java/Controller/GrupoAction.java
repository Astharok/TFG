/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import DAOFactory.DAOFactory;
import Interfaces.GrupoDAO;
import beans.GruposUsuarios;
import interfaces.Action;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import util.Util;

/**
 *
 * @author Jose Raimundo Montes Lopez
 */
public class GrupoAction implements Action {
    
    DAOFactory bd = DAOFactory.getDAOFactory(DAOFactory.MY_SQL);

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) {
        String results = "";
        String action = (String) request.getParameter("ACTION");
        String[] arrayAction = action.split("\\.");

        switch (arrayAction[1]) {
            case "FIND":
                results = find(request, response);
                break;
        }

        return results;
    }

    private String find(HttpServletRequest request, HttpServletResponse response) {
        GrupoDAO grupoDAO = bd.getGrupoDAO();

        GruposUsuarios grupo = new GruposUsuarios();
        grupo.setNombre(request.getParameter("GRUPO"));
        
        Map<String, String> res = grupoDAO.find(grupo);

        return Util.toJson(res);
    }
    
}
