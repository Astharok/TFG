/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import DAOFactory.DAOFactory;
import Interfaces.EquipoDAO;
import beans.Equipos;
import beans.HistorialesEquipos;
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
public class EquipoAction implements Action {
    
    DAOFactory bd = DAOFactory.getDAOFactory(DAOFactory.MY_SQL);

    @Override
    public String execute(HttpServletRequest request, HttpServletResponse response) {
        String results = "";
        String action = (String) request.getParameter("ACTION");
        String[] arrayAction = action.split("\\.");

        switch (arrayAction[1]) {
            case "LOADALL":
                results = loadAll(request, response);
                break;
            case "ACTIVAR":
                results = activar(request, response);
                break;
            case "DESACTIVAR":
                results = desactivar(request, response);
                break;
        }

        return results;
    }
    
    private String loadAll(HttpServletRequest request, HttpServletResponse response) {
        EquipoDAO equipoDAO = bd.getEquipoDAO();
        
        Map<String, String> res = equipoDAO.loadAll();

        return Util.toJson(res);
    }
    
    private String activar(HttpServletRequest request, HttpServletResponse response) {
        EquipoDAO equipoDAO = bd.getEquipoDAO();
        
        Equipos equipo = new Equipos();
        equipo.setIDEquipo(Integer.valueOf(request.getParameter("EQUIPOID")));
        
        Usuarios usuario = new Usuarios();
        usuario.setIDUsuario(Integer.valueOf(request.getParameter("USUARIOID")));
        
        Map<String, String> res = equipoDAO.activar(equipo, usuario);

        return Util.toJson(res);
    }
    
    private String desactivar(HttpServletRequest request, HttpServletResponse response) {
        EquipoDAO equipoDAO = bd.getEquipoDAO();
        
        HistorialesEquipos historial = new HistorialesEquipos();
        historial.setIDHistorialEquipo(Integer.valueOf(request.getParameter("HISTORIALID")));
        
        Map<String, String> res = equipoDAO.desactivar(historial);

        return Util.toJson(res);
    }
    
}
