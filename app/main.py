from fastapi import FastAPI
from app.api.routes import auth, task
from app.db.base import Base
from app.db.session import engine
from fastapi.middleware.cors import CORSMiddleware



Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def welcome():
    return {"message":"Welcome to task manager"}

app.include_router(auth.router)
app.include_router(task.router)