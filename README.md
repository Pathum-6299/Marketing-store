# STORE — Run Instructions (Windows)

This repository contains two apps:

- backend (FastAPI)
- frontend (React / Vite)

This README explains how to run both on Windows and includes a convenient `run.bat` you can send to other users so they can start both apps with a double-click or from Command Prompt.

## Prerequisites

Make sure the target machine has:

- Python 3.10+ (or compatible) on PATH
- Node.js (16+) and npm on PATH
- Git (optional, if cloning)

If any of these are missing, install them before running `run.bat`.

## Quick start (manual)

Open a Command Prompt and run the following commands if you prefer to run manually:

Backend:

```powershell
cd C:\Users\USER\Desktop\STORE\backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Frontend:

```powershell
cd C:\Users\USER\Desktop\STORE\frontend
npm install
npm run dev
```

## run.bat (automated)

A `run.bat` file is included at the repository root (`C:\Users\USER\Desktop\STORE\run.bat`). Double-click it or run it from Command Prompt. What it does:

1. Creates a Python virtual environment in `backend/venv` (if it doesn't already exist).
2. Installs backend Python requirements from `backend/requirements.txt`.
3. Starts the backend using `uvicorn app.main:app --reload` in a new Command Prompt window (so it runs independently).
4. Installs frontend npm packages and starts the Vite dev server (`npm run dev`) in another Command Prompt window.

Both servers will run in separate windows so you can keep this setup terminal free.

### Notes & Troubleshooting

- If `python` is not found, install Python and ensure it's added to PATH. Use `python --version` to verify.
- If Node/NPM are not found, install Node from https://nodejs.org/ and verify with `node --version` and `npm --version`.
- If ports are already in use (backend default: 8000; frontend default: 5173), stop the service that uses them or change the port configurations.
- The script uses `uvicorn --reload` intended for development only.

If you want the script to run using PowerShell instead of cmd windows, let me know and I can add a `run.ps1` alternative.

---

Created for: `C:\Users\USER\Desktop\STORE`
