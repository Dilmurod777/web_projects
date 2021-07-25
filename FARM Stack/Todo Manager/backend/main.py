from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import Todo
from database import (
    fetch_one_todo,
    fetch_all_todos,
    remove_todo,
    create_todo,
    update_todo
)

app = FastAPI()
origins = [
    'http://localhost:3000'
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)


@app.get('/api/todo')
async def get_todo():
    response = await fetch_all_todos()
    return response


@app.get('/api/todo{title}', response_model=Todo)
async def get_todo_by_id(title):
    response = await fetch_one_todo(title)
    if response:
        return response

    raise HTTPException(404, f"There is no todo item with this title {title}")


@app.post('/api/todo', response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo(todo.dict())
    if response:
        return response

    raise HTTPException(400, f'Could not create new todo.')


@app.put('/api/todo{title}', response_model=Todo)
async def put_todo(title: str, description: str):
    response = await update_todo(title, description)
    if response:
        return response

    raise HTTPException(400, f'Could not update new todo.')


@app.delete('/api/todo{title}')
async def delete_todo(title: str):
    response = await remove_todo(title)
    if response:
        return "Successfully deleted todo."

    raise HTTPException(404, f'Could not delete new todo.')
