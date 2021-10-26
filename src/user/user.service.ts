import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'bson'
import { User, UserDocument } from './models/user.model';
import { UserInput } from './dto/user.input';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(userInput: UserInput): Promise<User> {
    const createdUser = new this.userModel(userInput);
    return createdUser.save();
  }

  async findAll():Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findOne(_id: ObjectId): Promise<User> {
    return await this.userModel.findById(_id).exec();
  }

  async update(_id: ObjectId, userInput: UserInput): Promise<User> {
    await this.userModel.findByIdAndUpdate(_id, userInput);
    return this.userModel.findById(_id).exec();
  }

  async remove(_id: ObjectId): Promise<User> {
    return await this.userModel.findByIdAndDelete({ "_id": _id }).exec();
  }
}
