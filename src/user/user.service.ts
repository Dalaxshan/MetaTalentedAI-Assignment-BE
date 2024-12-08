// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './user.model';
import { CreateUserDto } from './dto/create.user.dto';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserModel>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserModel> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOneById(userId: string): Promise<UserModel | null> {
    return this.userModel.findById(userId).exec();
  }

  async findAll(): Promise<UserModel[]> {
    return this.userModel.find().exec();
  }
}
