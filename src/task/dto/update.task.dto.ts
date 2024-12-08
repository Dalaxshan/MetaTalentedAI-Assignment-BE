import { IsString, IsOptional, IsEnum, IsMongoId } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsEnum(['Pending', 'In Progress', 'Completed'])
  @IsOptional()
  status: 'Pending' | 'In Progress' | 'Completed';

  @IsMongoId()
  @IsOptional()
  assignedUser: string;
}
