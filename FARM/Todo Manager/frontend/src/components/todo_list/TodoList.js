import TodoItem from "../todo_item/TodoItem";

const TodoList = (props) => {
  return (
    <div>
      <ul>
        {props.todoList.map((todo, index) => <TodoItem
          key={index}
          todo={todo}
        />)}
      </ul>
    </div>
  )
}

export default TodoList
