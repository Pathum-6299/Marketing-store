@echo off
REM run.bat - sets up backend venv, installs requirements and starts backend and frontend in separate cmd windows
REM IMPORTANT: Before running this script, you must import the database (Dump20251113.sql)
REM See DATABASE_SETUP.md for step-by-step instructions

REM Move to the script directory (repo root)
cd /d "%~dp0"

echo.
echo ============================================================
echo          STORE Application Startup
echo ============================================================
echo Running from: %cd%
echo.
echo REMINDER: Ensure MySQL is running and database is imported!
echo See DATABASE_SETUP.md for database setup instructions.
echo.
echo ============================================================
echo.

:: ----- Backend setup -----
cd /d "%~dp0backend"
necho Backend folder: %cd%
if not exist venv (
  echo Creating Python virtual environment...
  python -m venv venv
) else (
  echo Virtual environment already exists.
)

echo Installing backend requirements (may take a few minutes)...
call "%cd%\venv\Scripts\activate"
pip install -r requirements.txt

REM Start backend in a new cmd window so it runs independently
start "Backend" cmd /k "cd /d "%~dp0backend" && call venv\Scripts\activate && uvicorn app.main:app --reload"

:: ----- Frontend setup -----
cd /d "%~dp0frontend"
necho Frontend folder: %cd%
necho Installing frontend dependencies (if needed)...

REM Start frontend in its own window; runs npm install then npm run dev
start "Frontend" cmd /k "cd /d "%~dp0frontend" && npm install && npm run dev"

echo Started backend and frontend in separate windows.
echo If any window closed due to errors, open it to read the messages.
pause
