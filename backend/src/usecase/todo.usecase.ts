import { ITodoRepository } from '../repository/todo.repository.js';
import { Todo, CreateTodoDTO, UpdateTodoDTO } from '../model/todo.model.js';
import { DomainError } from '../common/error/domain.error.js';

export class TodoUsecase {
  constructor(private repo: ITodoRepository) { }

  getAllTodos(): Todo[] {
    return this.repo.findAll();
  }

  getTodoById(id: string): Todo {
    const todo = this.repo.findById(id);
    if (!todo) throw new DomainError(404, 'Todo not found');
    return todo;
  }

  createTodo(data: CreateTodoDTO): Todo {
    if (!data.title || !data.title.trim()) {
      throw new DomainError(400, 'Title is required');
    }
    return this.repo.create({ title: data.title.trim() });
  }

  updateTodo(id: string, data: UpdateTodoDTO): Todo {
    if (data.title !== undefined && !data.title.trim()) {
      throw new DomainError(400, 'Title cannot be empty');
    }

    const updated = this.repo.update(id, data);
    if (!updated) throw new DomainError(404, 'Todo not found');
    return updated;
  }

  deleteTodo(id: string): void {
    const deleted = this.repo.delete(id);
    if (!deleted) throw new DomainError(404, 'Todo not found');
  }
}
