export function getAllTodos(): string {
  return 'List Todos';
}

export function getTodoById(todoId: string): string {
  return 'Get Todo: ' + todoId;
}

export function deleteTodo(todoId: string): string {
  return 'Delete Todo: ' + todoId;
}

export function updateTodo(todoId: string): string {
  return 'Update Todos: ' + todoId;
}
