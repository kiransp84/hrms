Software Installation on the server machine 
--------------------------------------------
Nodejs software - mandatory - https://nodejs.org/en/download/current 

Git             - optional 

Application Source Code download and build 
-------------------------------------------
If you have git then clone it from the link : https://github.com/kiransp84/hrms

Below steps assume that you have copied the source code to C:\HRMS\

-- booting the server up 
1)cd C:\HRMS\hrms\hrms-server
2)npm install
3)npm run dev

-- starting the website up  
1)C:\HRMS\hrms\hrms-client
2)npm install 
3)npm run dev
 
Application URL - http://<SERVER_MACHINE_IP>:3001/


Database Setup 
--------------------------------
Login with your atlas userid and password https://www.mongodb.com/atlas/database
Added new database 
Added new collection - employees
Added new user for accessing the database from application 
Added Specific Privilege for the user to allow read-and-write access only to the company db 

C:\HRMS\hrms\hrms-server\.env
C:\HRMS\hrms\hrms-dataloader\.env
In the two .env files we have mapped the username , password and database name ( case sensitive )



Data loading 
------------------------------------
Data loading is useful if you have a large set of records to be inserted and manual entering one by one is tedious 

baseFolder in C:\HRMS\hrms\hrms-dataloader\.env need to be set with the full folder path where the excel sheets having the data are kept 

C:\HRMS\hrms\hrms-dataloader
npm install 
npm run import-employees 

Using the Application 
----------------------
Create Employee 
View Employees 


Data Separation and Security achieved - how ?
----------------------------------------------
System admin is responsible for maintaining the Atlas db account.
Database administrator will create separate databases for each company.  
Database administrator will create separate dbuser for each company. The dbuser 's privilege should be containing read and write privilege to a single database.

Each application will talk to the corresponding data base via the dbuser allotted to that company. Thus its data visibility will be limited to that company alone. 

