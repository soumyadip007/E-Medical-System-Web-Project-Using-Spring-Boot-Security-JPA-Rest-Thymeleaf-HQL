package Controller;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class ProductRequest
 */
public class ProductRequest extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String product=request.getParameter("p");
		request.setAttribute("product", product);
		RequestDispatcher rd=request.getRequestDispatcher("Product.jsp");
		rd.forward(request,response);
		
	}

}
