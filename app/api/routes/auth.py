from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserLogin
from app.services.auth_service import register_user, authenticate_user
from app.api.deps import get_db
from fastapi.security import OAuth2PasswordRequestForm
from fastapi import HTTPException, status


router = APIRouter(prefix="/auth",tags=["user"])

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    
    new_user = register_user(db, user.email, user.password)

    if new_user is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )

    return {"Message":"New User Created Successfully!"}


@router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    token = authenticate_user(db, form_data.username, form_data.password)

    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )

    return {"access_token": token, "token_type": "bearer"}