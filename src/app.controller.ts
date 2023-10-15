import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  counter = 4;
  todos = [
    { content: 'Create api', id: 1, completed: true },
    { content: 'Learn Redux', id: 2, completed: false },
    { content: 'Create project form complete', id: 3, completed: false },
    { content: 'Learn HTMX', id: 4, completed: true },
  ];
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() res: Response) {
    return res.render('index', { todos: this.todos });
  }

  @Put('todo/:id')
  updateTodo(@Param('id') id: string, @Res() res: Response) {
    const todoIdx: number = this.todos.findIndex((i) => i.id === +id);
    this.todos[todoIdx].completed = !this.todos[todoIdx].completed;

    return res.render('partials/components/Todo', {
      todo: this.todos[todoIdx],
      layout: false,
    });
  }

  @Delete('todo/:id')
  deleteTodo(@Param('id') id: string) {
    const todoIdx: number = this.todos.findIndex((i) => i.id === +id);
    this.todos.splice(todoIdx, 1);
    return null;
  }

  @Post('todo')
  addTodo(@Body() data: { todo: string }, @Res() res: Response) {
    const todo = {
      completed: false,
      content: data.todo,
      id: ++this.counter,
    };
    this.todos.push(todo);
    return res.render('partials/components/Todo', {
      todo: todo,
      layout: false,
    });
  }
}
