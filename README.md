# Customer Profile Management System

## Prerequisites
- .NET Core 6.0 SDK
- Node.js (16+)
- Angular CLI
- SQL Server or LocalDB

## Backend Setup (.NET Core API)
1. Clone the repository
2. Navigate to Backend folder
3. Configure database connection in `appsettings.json`
4. Run database migrations:
   ```bash
   dotnet ef database update
   ```
5. Start the backend:
   ```bash
   dotnet run
   ```
   - Backend will run on `https://localhost:5001`

## Frontend Setup (Angular)
1. Navigate to Frontend folder
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start Angular development server:
   ```bash
   ng serve
   ```
   - Frontend will run on `http://localhost:4200`

## Configuration Steps
1. Ensure SQL Server connection string is correct
2. Check CORS settings in backend
3. Verify API endpoint in `customer-service.ts`

## Troubleshooting
- Verify all connection strings
- Ensure all NuGet/npm packages are installed
- Check network connectivity
- Validate database migrations

## Development Environment
- Visual Studio 2022 or VS Code
- SQL Server Management Studio
