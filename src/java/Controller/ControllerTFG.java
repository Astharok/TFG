/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import util.Util;

/**
 *
 * @author Jose Raimundo Montes Lopez
 */
@WebServlet(name = "ControllerTFG", urlPatterns = {"/ControllerTFG"})
public class ControllerTFG extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        System.out.println("TRACE: " + "Controller");
        response.setContentType("text/plain;charset=UTF-8");
        PrintWriter out;
        String results = "";
        try {
            out = response.getWriter();
            String action = request.getParameter("ACTION");
            String arrayAction[] = action.split("\\.");

            switch (arrayAction[0]) {

                case "Usuario":
                    results = new UsuarioAction().execute(request, response);
                    break;
                case "Equipo":
                    results = new EquipoAction().execute(request, response);
                    break;
                case "Grupo":
                    results = new GrupoAction().execute(request, response);
                    break;
                    
                default:
            }
            
            if(results == null || results == ""){
                results = generateFailRequest();
            }
            
            out.print(results);
            
            Util.showResults(Util.fromJson(results));
            
            response.setStatus(HttpServletResponse.SC_OK);
            
        } catch (IOException ex) {
            results = "CONTROLLER_FAILURE: Fallo en processRequest";
            results += "/n" + "DETALLE: Error al obtener el Writer del HttpServletResponse";
            results += "/n" + ex.getCause();
            results += "/n" + ex.getMessage();
            
            System.err.println(results);
        }
        
        //request.setAttribute("mensaje", mensaje); //Se envía el mensaje a resultadoOperacion.jsp
        //Referenciamos la página resultadoOperacion.jsp mediante su ruta absoluta '/'
        /*RequestDispatcher rd = request.getRequestDispatcher("/resultadoOperacion.jsp");
        try {
            //Redirigimos la petición al recurso
            rd.forward(request, response);
        } catch (ServletException | IOException ex) {
            Logger.getLogger(Controller.class.getName()).log(Level.SEVERE, null, ex);
        }*/
    }
    
    private String generateFailRequest () {
        Map<String, String> resFail = new HashMap<String, String>();
        resFail.put("STATE", "FAILURE");
        resFail.put("MESSAGE", "Funcion requerida no implementada");
        return Util.toJson(resFail);
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
