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
  getHello(): any {
    throw new Error('Method not implemented.');
  }
  counter = 4;
  todos = [
    { content: 'Create api', id: 1, completed: true },
    { content: 'Learn Redux', id: 2, completed: false },
    { content: 'Create project form complete', id: 3, completed: false },
    { content: 'Learn HTMX', id: 4, completed: true },
  ];
  constructor(private readonly appService: AppService) {}

  @Get()
  async root(@Res() res: Response) {
    const tasks = await this.appService.getTodos();
    return res.render('index', { todos: tasks, page_name: 'Home' });
  }

  @Get('about')
  getAbout(@Res() res: Response) {
    return res.render('about', {
      page_name: 'About',
      message:
        'Name gives you access to AJAX, CSS Transitions, WebSockets and Server Sent Events directly in HTML, using attributes, so you can build modern user interfaces with the simplicity and power of hypertext',
    });
  }

  @Put('todo/:id')
  async updateTodo(@Param('id') id: string, @Res() res: Response) {
    const todo = await this.appService.updateTodo(+id);
    return res.render('partials/components/Todo', {
      todo,
      layout: false,
    });
  }

  @Delete('todo/:id')
  async deleteTodo(@Param('id') id: string) {
    await this.appService.deleteTodo(+id);
    return null;
  }

  @Post('todo')
  async addTodo(
    @Body() data: { todo: string; blogBody: string },
    @Res() res: Response,
  ) {
    console.log(data);
    const todo = await this.appService.addTodo({ content: data.todo });
    return res.render('partials/components/Todo', {
      todo: todo,
      layout: false,
    });
  }
}
