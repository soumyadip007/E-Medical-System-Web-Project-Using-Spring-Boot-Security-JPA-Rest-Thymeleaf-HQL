package Controller;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;

/**
 * 
 * @author Soumyadip Chowdhury
 * @github soumyadip007
 *
 */
@WebServlet("/photo")
@MultipartConfig(fileSizeThreshold=1024*1024*100,maxFileSize=1024*1024*100,maxRequestSize=1024*1024*100)
public class photo extends HttpServlet {

	private static final long serialVersionUID = 1L;
	private static final String SAVE_DIR="image";   
    
	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		String imgpath=null;
		try{
			
			
			
			Class.forName("com.mysql.jdbc.Driver");

			ServletContext ct=getServletContext();
			
			Connection cn=(Connection) DriverManager.getConnection(ct.getInitParameter("path"),ct.getInitParameter("user"),ct.getInitParameter("pass"));
			
			//image parsing....
			String filepath="E:\\Eclipse EE Maven\\Eclipse Web Workplace\\File\\WebContent\\Image\\";
			
			
			File directory=new File(filepath);
			if(!directory.exists()){
				directory.mkdir();
			}
			Part part=request.getPart("file");
			String path=extractpath(part);
			
			String filename=path;
			System.out.println("Part "+part);
			System.out.println("Path "+path);
			//String filename=path.substring(path.lastIndexOf("\\")+1,path.length());
			imgpath=filepath+File.separator+filename;
			part.write(imgpath);
			

			System.out.println("\nFilename"+filename);
			System.out.println("\nSep"+File.separator);
			System.out.println("\nFilePath"+filepath);
			System.out.println("\nImagepath"+imgpath);
			String sql="insert into file(pic) values(?) ";
			PreparedStatement ps=cn.prepareStatement(sql);
		
			ps.setString(1, imgpath);
			
			ps.execute();
			
			RequestDispatcher rd=request.getRequestDispatcher("camera.html");
			rd.include(request, response);
			
		}catch(Exception e){
			System.out.println(e);
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