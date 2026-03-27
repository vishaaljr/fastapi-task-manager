from sqlalchemy.orm import Session
from app.models.task import Task

def create_task(db: Session, title: str, description: str, user_id: int):
    task = Task(
        title=title,
        description=description,
        owner_id=user_id,
        completed=False  
    )
    db.add(task)
    db.commit()
    db.refresh(task)
    return task


def get_tasks(db: Session, user_id: int):
    return db.query(Task).filter(Task.owner_id == user_id).all()

def update_task(db: Session, task_id: int, user_id: int, task_data):
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == user_id
    ).first()

    if not task:
        return None

    update_data = task_data.dict(exclude_unset=True)

    for key, value in update_data.items():
        setattr(task, key, value)
    db.commit()
    db.refresh(task)
    return task


def delete_task(db: Session, task_id: int, user_id: int):
    task = db.query(Task).filter(
        Task.id == task_id,
        Task.owner_id == user_id   
    ).first()

    if not task:
        return None

    db.delete(task)
    db.commit()
    return True

