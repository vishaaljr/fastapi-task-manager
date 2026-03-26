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

    # update only provided fields
    if task_data.title is not None:
        task.title = task_data.title

    if task_data.description is not None:
        task.description = task_data.description

    if task_data.completed is not None:
        task.completed = task_data.completed

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

