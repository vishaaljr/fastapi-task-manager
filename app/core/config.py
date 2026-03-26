from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "postgresql://postgres:1234@localhost/taskdb"
    SECRET_KEY: str = "b6624b50c6d4cf04cd954785ad43b3b1b574c2776361d15f538f57c1a849c05e"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15

settings = Settings()