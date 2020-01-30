package Log;

import java.io.IOException;
import java.security.NoSuchAlgorithmException;
import java.security.spec.InvalidKeySpecException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.org.apache.xpath.internal.operations.And;



/**
 * 
 * @author Soumyadip Chowdhury
 *
 */
@WebServlet("/Login")
public class Login extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String a="21232f297a57a5a743894a0e4a801fc3";
		String user	=(String)request.getParameter("user");
		String pass	=(String)request.getParameter("pass");
	
		String chk="o";
	
			// chk=encryption.pass(pass);
		
		//System.out.println(chk);
		if(user.equals("sexyass") && pass.equals("iamthebest"))	
		{
			//request.setAttribute("user",user);
			//RequestDispatcher rd=request.getRequestDispatcher("Welcome1.jsp");
				//rd.forward(request,response);
			HttpSession session=request.getSession();
			session.setAttribute("username",user);
				try {
					
					response.sendRedirect("adminhome.jsp");

				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} 
		}
		else{
			try {             

				response.sendRedirect("Login.jsp");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
	}
}