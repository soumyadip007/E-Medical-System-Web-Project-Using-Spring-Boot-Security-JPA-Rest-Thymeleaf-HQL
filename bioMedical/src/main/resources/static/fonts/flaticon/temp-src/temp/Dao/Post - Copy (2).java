package Controller;


import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.util.List;
import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.xml.ws.Response;
import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.catalina.ssi.ResponseIncludeWrapper;

//import com.sun.xml.internal.bind.v2.schemagen.xmlschema.List;

import Dao.Dao;

/**
 * Servlet implementation class Post
 */

@MultipartConfig(fileSizeThreshold=1024*1024,maxFileSize=1024*1024*10,maxRequestSize=1024*1024*50)
public class Post extends HttpServlet {
	
	private static final String SAVE_DIR="image1";  
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String type=request.getParameter("type");
		String title=request.getParameter("title");
		String brand=request.getParameter("price1");
		String price=request.getParameter("price");
		String summary=request.getParameter("summary");
		String cond=request.getParameter("cond");
		String Name=request.getParameter("name");
		String Email=request.getParameter("email");
		String num=request.getParameter("num");
		String city=request.getParameter("city");
		String imgpath=null;
		
	/*	
		String filepath="F:\\Github\\E-Marketplace-for-buying-and-reselling-goods\\ Online Classifieds Project (BechDo)\\WebContent\\image"+File.separator+SAVE_DIR;
		File directory=new File(filepath);
		if(!directory.exists()){
			directory.mkdir();
		}
		Part part=request.getPart("file");
		String path=extractpath(part);
		String filename=path.substring(path.lastIndexOf("\\")+1,path.length());
		imgpath=filepath+File.separator+filename;
		part.write(imgpath);
		System.out.println(imgpath);
		
		*/
		Dao obj=new Dao();
		
		
		if(obj.post(type, title, brand, price, summary, cond, Name, Email, num, city,imgpath))
		{
				response.sendRedirect("Postad.jsp");
		}
		else {
			response.sendRedirect("Home.jsp");
		}
		
	}
	
	private String extractpath(Part part){
		String Content_dis=part.getHeader("Content-Disposition");
		String items[]=Content_dis.split(";");
		for(String x:items){
			if(x.trim().startsWith("filename")){
				return x.substring(x.indexOf("=")+2, x.length()-1);
			}
		}
		return null;
	}

}

/*ServletFileUpload sf=new ServletFileUpload(new DiskFileItemFactory());
try {
	List<FileItem> multifiles= sf.parseRequest(request);

	for(FileItem item:multifiles)
	{
		try {
			item.write(new File("E:\\Eclipse EE Maven\\Eclipse Web Workplace\\Training" ));
			System.out.println("Sucess");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
} catch (FileUploadException e) {
	
}
*/