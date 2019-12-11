/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import DAOFactory.DAOFactory;
import Interfaces.GrupoDAO;
import beans.GruposUsuarios;
import beans.Tarifas;
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
            case "FINDALL":
                results = findall(request, response);
                break;
            case "INSERTAGRUPO":
                results = insertaGrupo(request, response);
                break;
            case "UPDATEGRUPO":
                results = updateGrupo(request, response);
                break;
            case "INSERTATARIFA":
                results = insertaTarifa(request, response);
                break;
            case "UPDATETARIFA":
                results = updateTarifa(request, response);
                break;
            case "FINDTARIFA":
                results = findTarifa(request, response);
                break;
            case "ELIMINARGRUPO":
                results = eliminarGrupo(request, response);
                break;
            case "ELIMINARTARIFA":
                results = eliminarTarifa(request, response);
                break;
        }

        return results;
    }

    private String find(HttpServletRequest request, HttpServletResponse response) {
        GrupoDAO grupoDAO = bd.getGrupoDAO();

        GruposUsuarios grupo = new GruposUsuarios();
        grupo.setIDGrupoUsuarios(Integer.parseInt(request.getParameter("IDGRUPO")));
        
        Map<String, String> res = grupoDAO.find(grupo);

        return Util.toJson(res);
    }

    private String findall(HttpServletRequest request, HttpServletResponse response) {
        GrupoDAO grupoDAO = bd.getGrupoDAO();
        
        Map<String, String> res = grupoDAO.findall();

        return Util.toJson(res);
    }

    private String insertaGrupo(HttpServletRequest request, HttpServletResponse response) {
        GrupoDAO grupoDAO = bd.getGrupoDAO();
        
        Tarifas tarifa = new Tarifas();
        tarifa.setIDTarifa(Integer.valueOf(request.getParameter("IDTARIFA")));
        
        GruposUsuarios grupo = new GruposUsuarios();
        grupo.setNombre(request.getParameter("NOMBRE"));
        grupo.setIDTarifaFK(tarifa);
        
        Map<String, String> res = grupoDAO.insertaGrupo(grupo);

        return Util.toJson(res);
    }

    private String updateGrupo(HttpServletRequest request, HttpServletResponse response) {
        GrupoDAO grupoDAO = bd.getGrupoDAO();
        
        Tarifas tarifa = new Tarifas();
        tarifa.setIDTarifa(Integer.valueOf(request.getParameter("IDTARIFA")));
        
        GruposUsuarios grupo = new GruposUsuarios();
        grupo.setIDGrupoUsuarios(Integer.valueOf(request.getParameter("IDGRUPO")));
        grupo.setNombre(request.getParameter("NOMBRE"));
        grupo.setIDTarifaFK(tarifa);
        
        Map<String, String> res = grupoDAO.updateGrupo(grupo);

        return Util.toJson(res);
    }
    
    private String insertaTarifa(HttpServletRequest request, HttpServletResponse response) {
        GrupoDAO grupoDAO = bd.getGrupoDAO();
        
        Tarifas tarifa = new Tarifas();
        tarifa.setNombre(request.getParameter("NOMBRE"));
        tarifa.setPrecioporhora(Double.valueOf(request.getParameter("PRECIO")));
        
        Map<String, String> res = grupoDAO.insertaTarifa(tarifa);

        return Util.toJson(res);
    }
    
    private String updateTarifa(HttpServletRequest request, HttpServletResponse response) {
        GrupoDAO grupoDAO = bd.getGrupoDAO();
        
        Tarifas tarifa = new Tarifas();
        tarifa.setIDTarifa(Integer.valueOf(request.getParameter("IDTARIFA")));
        tarifa.setNombre(request.getParameter("NOMBRE"));
        tarifa.setPrecioporhora(Double.valueOf(request.getParameter("PRECIO")));
        
        Map<String, String> res = grupoDAO.updateTarifa(tarifa);

        return Util.toJson(res);
    }

    private String findTarifa(HttpServletRequest request, HttpServletResponse response) {
        GrupoDAO grupoDAO = bd.getGrupoDAO();
        
        Tarifas tarifa = new Tarifas();
        tarifa.setIDTarifa(Integer.valueOf(request.getParameter("IDTARIFA")));
        
        Map<String, String> res = grupoDAO.findTarifa(tarifa);

        return Util.toJson(res);
    }

    private String eliminarGrupo(HttpServletRequest request, HttpServletResponse response) {
        GrupoDAO grupoDAO = bd.getGrupoDAO();
        
        GruposUsuarios grupo = new GruposUsuarios();
        grupo.setIDGrupoUsuarios(Integer.valueOf(request.getParameter("IDGRUPO")));
        
        Map<String, String> res = grupoDAO.eliminarGrupo(grupo);

        return Util.toJson(res);
    }

    private String eliminarTarifa(HttpServletRequest request, HttpServletResponse response) {
        GrupoDAO grupoDAO = bd.getGrupoDAO();
        
        Tarifas tarifa = new Tarifas();
        tarifa.setIDTarifa(Integer.valueOf(request.getParameter("IDTARIFA")));
        
        Map<String, String> res = grupoDAO.eliminarTarifa(tarifa);

        return Util.toJson(res);
    }
    
}
