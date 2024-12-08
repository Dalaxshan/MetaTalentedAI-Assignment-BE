import { Controller, Post, Get, Body, Param, Put, Query } from '@nestjs/common';
import { TaskService } from './task.service';

import { TaskModel } from './task.model';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(@Body() createTaskDto: CreateTaskDto): Promise<TaskModel> {
    return this.taskService.createTask(createTaskDto);
  }

  @Put(':id')
  async update(
    @Param('id') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<TaskModel> {
    return this.taskService.updateTask(taskId, updateTaskDto);
  }

  @Get()
  async findAll(
    @Query('status') status?: string,
    @Query('assignedUserId') assignedUserId?: string,
  ): Promise<TaskModel[]> {
    return this.taskService.findAllTasks(status, assignedUserId);
  }
}
