export async function getAllUserTodos(userId: string): Promise<string> {
  return 'List Todos of user: ' + userId;
}

export async function getAllTodos(): Promise<string> {
  return 'List Todos';
}

export async function getTodoById(todoId: string): Promise<string> {
  return 'Get Todo: ' + todoId;
}

export async function deleteTodo(todoId: string): Promise<string> {
  return 'Delete Todo: ' + todoId;
}

export async function updateTodo(todoId: string): Promise<string> {
  return 'Update Todos: ' + todoId;
}
