from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.task import Task
from app.schemas.task import TaskCreate, TaskUpdate
from app.services.task_service import create_task, get_tasks, update_task, delete_task
from app.api.deps import get_db
from app.api.deps import get_current_user
from app.models.user import User

router = APIRouter(prefix="/tasks",tags=["tasks"])


@router.post("/")
def create(task: TaskCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)):
    
    return create_task(db, task.title, task.description, current_user.id)

@router.get("/")
def read_all(db: Session = Depends(get_db),
            current_user: User = Depends(get_current_user)):
    
    return get_tasks(db, current_user.id)

@router.put("/{task_id}")
def update(
    task_id: int,
    task: TaskUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    updated_task = update_task(db, task_id, current_user.id, task)

    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")

    return updated_task
from fastapi import HTTPException

@router.delete("/{task_id}")
def delete(
    task_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = delete_task(db, task_id, current_user.id)

    if not result:
        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    return {"message": "Task deleted successfully"}