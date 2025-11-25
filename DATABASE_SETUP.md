# Database Setup Guide

This guide explains how to import the SQL dump (`Dump20251113.sql`) into MySQL for the STORE application.

## Prerequisites

Before running the application, you need:

1. **MySQL Server** installed and running (default port: 3306)
2. **MySQL Workbench** (or any MySQL client)
3. The SQL dump file: `Dump20251113.sql`

## Setup Steps

### Option 1: Using MySQL Workbench (GUI - Recommended for beginners)

1. **Open MySQL Workbench**

   - Launch MySQL Workbench on your machine
   - Create a new connection if you don't have one (or use the default local connection)

2. **Connect to your MySQL Server**

   - Double-click your connection or click "+" to create a new one
   - Use default settings:
     - Host: `127.0.0.1` or `localhost`
     - Port: `3306`
     - Username: `root`
     - Password: `990522@Mysql`

3. **Import the SQL Dump**

   - Go to **Server** → **Data Import** (top menu)
   - Select **"Import from Self-Contained File"**
   - Click **"Browse"** and select the `Dump20251113.sql` file from your project folder
   - Click **"Start Import"** button
   - Wait for the import to complete (should see "Import completed successfully")

4. **Verify the Database**
   - Refresh the schema panel (press F5 or click the refresh icon)
   - You should see a new database called `store` with tables: `users`, `products`, `orders`, etc.

### Option 2: Using Command Line (Advanced)

If you prefer the command line:

```bash
mysql -u root -p < Dump20251113.sql
```

Or if you don't have a password:

```bash
mysql -u root < Dump20251113.sql
```

## Backend Configuration

After importing the database, ensure your backend `.env` or connection settings match:

- **Database Name**: `store`
- **Host**: `127.0.0.1` (or `localhost`)
- **Port**: `3306`
- **User**: `root`
- **Password**: `990522@Mysql`

Update these in your backend configuration file (typically `backend/app/config.py` or `.env`).

## Verify Connection

To test if the backend can connect to the database:

1. Start the backend server:

   ```
   cd backend
   .\venv\Scripts\activate
   uvicorn app.main:app --reload
   ```

2. Check the console for any database connection errors
3. Visit API endpoint: `http://localhost:8000/docs` and try a test endpoint

## Troubleshooting

### Error: "Access denied for user 'root'@'localhost'"

- Check your MySQL password in the backend config
- Verify MySQL is running (check Services or taskbar)

### Error: "Database 'store' does not exist"

- Make sure you completed the import successfully
- Try importing again or check for import errors in Workbench

### Error: "Port 3306 is already in use"

- MySQL is likely running on that port already, which is fine
- Or check if another service is using port 3306

## Next Steps

After database setup:

1. Run `run.bat` to start both backend and frontend
2. Backend will auto-connect to the `store` database
3. Frontend will connect to the backend API
4. You're ready to use the application!

---

**Note**: The SQL dump includes sample data for testing:

- Sample users with referral codes
- Sample products and orders
- Sample billing details

You can modify or clear this data as needed.
