package Controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.LinkedList;

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
@WebServlet("/addevents")
public class GetLoc extends HttpServlet {
	private static final long serialVersionUID = 1L;


	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		
		String name=request.getParameter("name");
		String start=request.getParameter("sdate");
		String end=request.getParameter("edate");
		String venue=request.getParameter("venue");
		String des=request.getParameter("des");

		String fee=request.getParameter("fee");
		String link=request.getParameter("link");
		try {
		
		
		Class.forName("com.mysql.jdbc.Driver");
		
		ServletContext ct=getServletContext();
		
		Connection con=(Connection) DriverManager.getConnection(ct.getInitParameter("path"),ct.getInitParameter("user"),ct.getInitParameter("pass"));
		
	//	Connection con=(Connection) DriverManager.getConnection("jdbc:mysql://node12654-getsaved.cloudjiffy.net/hackathon","root","THHrio35634");
		
		PreparedStatement st=con.prepareStatement("INSERT INTO event(name,start,end,venue,des,fee,link) values(?,?,?,?,?,?,?)");
		
			st.setString(1,name);
			st.setString(2,start);
			st.setString(3,end);
			st.setString(4,venue);
			st.setString(5,des);

			st.setString(6,fee);
			st.setString(7,link);
		
			int i=st.executeUpdate();
			
			st=con.prepareStatement("INSERT INTO allevents(name,start,end,venue) values(?,?,?,?)");
			
			st.setString(1,name);
			st.setString(2,start);
			st.setString(3,end);
			st.setString(4,venue);
			
		
			st.executeUpdate();
		
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

		response.sendRedirect("adminhome.jsp");
	}


}
