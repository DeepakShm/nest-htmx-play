import { Inject, Injectable } from '@nestjs/common';
import { DbType, DrizzleAsyncProvider } from './drizzle/drizzle.provider';
import { NewTodo, todo } from './drizzle/schema/schema';
import { eq, not } from 'drizzle-orm';

@Injectable()
export class AppService {
  constructor(@Inject(DrizzleAsyncProvider) private db: DbType) {}
  getHello(): string {
    return 'Hello World!';
  }

  async getTodos() {
    const todos = await this.db.select().from(todo);
    return todos;
  }

  async addTodo(task: NewTodo) {
    const newTodo = await this.db.insert(todo).values(task).returning();
    return newTodo.length > 0 && newTodo[0];
  }

  async updateTodo(id: number) {
    const updatedTodo = await this.db
      .update(todo)
      .set({ completed: not(todo.completed) })
      .where(eq(todo.id, id))
      .returning();
    return updatedTodo.length > 0 && updatedTodo[0];
  }

  async deleteTodo(id: number) {
    const res = await this.db.delete(todo).where(eq(todo.id, id));
  }
}
