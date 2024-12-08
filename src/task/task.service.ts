import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskModel } from './task.model';

import { UserModel } from '../user/user.model';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { Status } from './enum/status';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel('Task') private readonly taskModel: Model<TaskModel>,
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<TaskModel> {
    const assignedUser = await this.userModel
      .findById(createTaskDto.assignedUser)
      .exec();
    if (!assignedUser) {
      throw new BadRequestException('Assigned user does not exist');
    }

    if (
      createTaskDto.status === Status.Completed &&
      !createTaskDto.description
    ) {
      throw new BadRequestException(
        'A task must have a description to be marked as Completed',
      );
    }

    const createdTask = new this.taskModel(createTaskDto);
    return createdTask.save();
  }

  async updateTask(
    taskId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<TaskModel> {
    const task = await this.taskModel.findById(taskId).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${taskId} not found`);
    }

    if (updateTaskDto.status === 'Completed' && !updateTaskDto.description) {
      throw new BadRequestException(
        'A task must have a description to be marked as Completed',
      );
    }

    if (updateTaskDto.assignedUser) {
      const assignedUser = await this.userModel
        .findById(updateTaskDto.assignedUser)
        .exec();
      if (!assignedUser) {
        throw new BadRequestException('Assigned user does not exist');
      }
    }

    Object.assign(task, updateTaskDto);
    return task.save();
  }

  async findAllTasks(
    status?: string,
    assignedUserId?: string,
  ): Promise<TaskModel[]> {
    const query = {};

    if (status) {
      query['status'] = status;
    }

    if (assignedUserId) {
      query['assignedUser'] = assignedUserId;
    }

    return this.taskModel.find(query).exec();
  }
}
