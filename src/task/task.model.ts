import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from './enum/status';

@Schema({ timestamps: true })
export class TaskModel {
  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: false,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
  })
  assignedUser: string;

  @Prop({
    type: String,
    required: true,
    default: Status.Pending,
    enum: Status,
  })
  status: Status;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);
