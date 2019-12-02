package Controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.org.apache.xpath.internal.operations.And;

import Dao.Dao;


/**
 * Servlet implementation class Login
 */
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String user	=(String)request.getParameter("user");
		String pass	=(String)request.getParameter("pass");
		String user1="Wrong Email/Password";
		Dao obj=new Dao();
		int j=obj.log(user,pass);
		if(j==1)	
		{
				HttpSession session=request.getSession();
			session.setAttribute("username",user);
				try {
					
					response.sendRedirect("Home.jsp");
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} 
		}
		else{
			try {             

				HttpSession session=request.getSession();
				session.setAttribute("user",user1);
				response.sendRedirect("Login.jsp");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
}