/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Jose Raimundo Montes Lopez
 */
@WebServlet(name = "Controller", urlPatterns = {"/Controller"})
public class Controller extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response){
        response.setContentType("text/plain;charset=UTF-8");
        PrintWriter out;
        String mensaje = "";
        try {
            out = response.getWriter();
            String action = request.getParameter("ACTION");
            String arrayAction[] = action.split("\\.");

            switch (arrayAction[0]) {

                case "Usuario":
                    mensaje = new UsuarioAction().execute(request, response);
                    break;
                    
                default:
            }
            
            out.print(mensaje);
            
        } catch (IOException ex) {
            mensaje += "CONTROLLER_FAILURE: Fallo en processRequest";
            mensaje += "/n" + "DETALLE: Error al obtener el Writer del HttpServletResponse";
            mensaje += "/n" + ex.getCause();
            mensaje += "/n" + ex.getMessage();
            
            System.err.println(mensaje);
        }
        
        request.setAttribute("mensaje", mensaje); //Se envía el mensaje a resultadoOperacion.jsp
        //Referenciamos la página resultadoOperacion.jsp mediante su ruta absoluta '/'
        RequestDispatcher rd = request.getRequestDispatcher("/resultadoOperacion.jsp");
        try {
            //Redirigimos la petición al recurso
            rd.forward(request, response);
        } catch (ServletException | IOException ex) {
            Logger.getLogger(Controller.class.getName()).log(Level.SEVERE, null, ex);
        }
        
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
