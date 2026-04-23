# FastAPI Task Manager

## Project Overview
The FastAPI Task Manager is a web application designed for managing your tasks efficiently. Built on top of the FastAPI framework, it enables rapid development and high performance.

## Features
- User Authentication
- Task Creation, Update, and Deletion
- Task Filtering and Sorting
- API Documentation automatically generated
- Asynchronous Support for high performance

## Setup Instructions
### Prerequisites
- Python 3.7+
- FastAPI
- Uvicorn
- A database (SQLite is used by default)

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/vishaaljr/fastapi-task-manager.git
   cd fastapi-task-manager
   ```
2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # for UNIX
   venv\Scripts\activate  # for Windows
   ```
3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## API Endpoints
Here are some key API endpoints:
- **POST /tasks** - Create a new task
- **GET /tasks** - Get all tasks
- **GET /tasks/{id}** - Get task by ID
- **PUT /tasks/{id}** - Update an existing task
- **DELETE /tasks/{id}** - Delete a task

## Usage Guidelines
To run the application:
```bash
uvicorn main:app --reload
```

Visit `http://127.0.0.1:8000/docs` to access the automatically generated API documentation and try out the endpoints.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.
