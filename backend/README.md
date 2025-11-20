How to run the app

pip install -r requirements.txt
python -m venv venv
.\venv\Scripts\activate
uvicorn app.main:app --reload
