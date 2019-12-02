package Dao;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import Connection.MyCon;

public class Dao {

	//private Connection con;
	
		int insert(String name,String user,long mob,String email,String pass) 
		{
			try{

				Connection con=MyCon.dbcon();
			//	String query="INSERT INTO account(name, user, mob, email, pass) VALUES(?,?,?,?,?)";
				PreparedStatement st=con.prepareStatement("INSERT INTO account(name, user, mob, email, pass) VALUES(?,?,?,?,?)");
				st.setString(1,name);
				st.setString(2,user);
				st.setLong(3, mob);
				st.setString(4,email);
				st.setString(5,pass);
				int i=0;
				i=st.executeUpdate();
				
				//Statement st=con.createStatement();
				
				//Statement sta=(Statement) con.createStatement(); 
			if(i==1)
				return 1;
			return 0;		
			}
			catch(Exception f)
			{
				f.printStackTrace();
			}
			
			return 0;
		}
		
		public int log(String user,String pass)
		{
			try{
				String sql="select * from account where email=? and pass=?";
				Connection con=MyCon.dbcon();
				PreparedStatement st=con.prepareStatement(sql);
				st.setString(1,user);
				st.setString(2,pass);
				ResultSet rs=st.executeQuery();
				if(rs.next())
				{
				
					return 1;
				}
				else{
				
					return 0;
				}
							
			}
			catch(Exception f)
			{
			}	
			
			return 0;	
		}
		
		public boolean post(String type,String title,String brand,String price,String summary,String cond,String Name,String Email,String num,String city,String imgpath) 
		{
			try{
				Connection con=MyCon.dbcon();
				PreparedStatement st=con.prepareStatement("INSERT INTO product(type, title, brand, price, summary,cond,Name,Email,num,city) VALUES(?,?,?,?,?,?,?,?,?,?)");
				st.setString(1,type);
				st.setString(2,title);
				st.setString(3,brand);
				st.setString(4,price);
				st.setString(5,summary);
				st.setString(6,cond);
				st.setString(7,Name);
				st.setString(8,Email);
				st.setString(9,num);
				st.setString(10,city);
			//	st.setString(11,imgpath);
			
				
				int i=st.executeUpdate();
			if(i==1)
				return true;
			return false;		
			}
			catch(Exception f)
			{
				f.printStackTrace();
			}
			
			return false;
		}

		
	}
