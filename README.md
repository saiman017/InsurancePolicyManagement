## Backend Setup

1. Open `PolicyManagement.API.sln` in **Visual Studio**

2. Open `appsettings.json` and add your connection string:
   {
     "ConnectionStrings": {
       "DefaultConnection": "Host=localhost;Port=5432;Database=PolicyDB;Username=postgres;Password=yourpassword"
     }
   }

3. Apply database migrations*(Run Command in Package Manager Console):
   Update-Database

4. Run the project:
   click the **Run** button in Visual Studio

The API will run at **http://localhost:7007**