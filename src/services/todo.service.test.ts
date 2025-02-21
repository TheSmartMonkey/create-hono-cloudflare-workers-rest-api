/**
 * @group unit
 */
import { deleteTodo, getAllTodos, getAllUserTodos, getTodoById, updateTodo } from './todo.service';

describe('Todo Service', () => {
  describe('getAllUserTodos', () => {
    test('should return a string with the user ID', async () => {
      const userId = 'user-id';
      const result = await getAllUserTodos(userId);
      expect(result).toBe('List Todos of user: ' + userId);
    });
  });

  describe('getAllTodos', () => {
    test('should return a string indicating all todos', async () => {
      const result = await getAllTodos();
      expect(result).toBe('List Todos');
    });
  });

  describe('getTodoById', () => {
    test('should return a string with the todo ID', async () => {
      const todoId = 'todo-id';
      const result = await getTodoById(todoId);
      expect(result).toBe('Get Todo: ' + todoId);
    });
  });

  describe('deleteTodo', () => {
    test('should return a string with the todo ID for deletion', async () => {
      const todoId = 'todo-id';
      const result = await deleteTodo(todoId);
      expect(result).toBe('Delete Todo: ' + todoId);
    });
  });

  describe('updateTodo', () => {
    test('should return a string with the todo ID for update', async () => {
      const todoId = 'todo-id';
      const result = await updateTodo(todoId);
      expect(result).toBe('Update Todos: ' + todoId);
    });
  });
});
