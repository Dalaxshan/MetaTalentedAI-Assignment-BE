import { IsString, IsNotEmpty, IsEnum, IsMongoId } from 'class-validator';
import { Status } from '../enum/status';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Status)
  status: Status;

  @IsMongoId()
  assignedUser: string;
}
