package Controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * @author Soumyadip Chowdhury
 *
 */
@WebServlet("/deleteevents")
public class deleteevents extends HttpServlet {
	private static final long serialVersionUID = 1L;
   
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String ev=request.getParameter("ev");
		

		try {
			Class.forName("com.mysql.jdbc.Driver");
		
			ServletContext ct=getServletContext();
			
			Connection con=(Connection) DriverManager.getConnection(ct.getInitParameter("path"),ct.getInitParameter("user"),ct.getInitParameter("pass"));
			
		
			PreparedStatement st;
		
			st = con.prepareStatement("delete from allevents where id=?");
			st.setString(1,ev);
			int i=0;
			i=st.executeUpdate();
		
			
			response.sendRedirect("adminallevents.jsp");
			
		} catch (SQLException | ClassNotFoundException e ) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

}
