package user;

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
@WebServlet("/apply")
public class apply extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
 
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		String name=request.getParameter("name");
		String start=request.getParameter("email");
		String end=request.getParameter("inst");
		String venue=request.getParameter("dob");
		String des=request.getParameter("skills");
		String venue1=request.getParameter("why");
		String des1=request.getParameter("role");
		String link=request.getParameter("edu");
	

		if(name.contains("select") || name.contains("*") ||  name.contains("'") || name.contains("insert") || name.contains("=") || name.contains("delete")
				|| start.contains("select") || start.contains("*") ||  start.contains("'") || start.contains("insert") || start.contains("=")  || start.contains("delete")
				|| end.contains("select") || end.contains("*") ||  end.contains("'") || end.contains("insert") || end.contains("=") || end.contains("delete")
				|| venue.contains("select") || venue.contains("*") ||  venue.contains("'") || venue.contains("insert") || venue.contains("=") || venue.contains("delete")
				|| venue1.contains("select") || venue1.contains("*") ||  venue1.contains("'") || venue1.contains("insert") || venue1.contains("=") || venue1.contains("delete")
				|| des.contains("select") || des.contains("*") ||  des.contains("'") || des.contains("insert") || des.contains("=") || des.contains("delete")
				|| link.contains("select") || link.contains("*") ||  link.contains("'") || link.contains("insert") || link.contains("=") || link.contains("delete"))
		{

			response.sendRedirect("error.html");
		}
		else {
		
		try {
		
		
		Class.forName("com.mysql.jdbc.Driver");
		
		ServletContext ct=getServletContext();
		
		Connection con=(Connection) DriverManager.getConnection(ct.getInitParameter("path"),ct.getInitParameter("user"),ct.getInitParameter("pass"));
		
	//	Connection con=(Connection) DriverManager.getConnection("jdbc:mysql://node12654-getsaved.cloudjiffy.net/hackathon","root","THHrio35634");
		
		PreparedStatement st=con.prepareStatement("INSERT INTO apply(name,email,inst,dob,skills,why,role,edu) values(?,?,?,?,?,?,?,?)");
		
			st.setString(1,name);
			st.setString(2,start);
			st.setString(3,end);
			st.setString(4,venue);
			st.setString(5,des);
			st.setString(6,venue1);
			st.setString(7,des1);
			st.setString(8,link);
		
			int i=st.executeUpdate();
		
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	
		
		
		
		
		response.getWriter().append("Served at: ").append(request.getContextPath());
		//response.sendRedirect("https://www.latlong.net/c/?lat="+latt+"&long="+longi);
	//	https://www.google.co.in/maps/@22.5601086,88.4904909,21z

		response.sendRedirect("index.html");
	}

}
}