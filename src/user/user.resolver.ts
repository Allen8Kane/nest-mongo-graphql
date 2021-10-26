import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObjectId } from 'bson'
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserInput } from './dto/user.input';
import { ParseObjectIdPipe } from 'src/utils/parseId.pipe';
import { NotFoundException } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('userInput') userInput: UserInput) {
    return await this.userService.create(userInput);
  }

  @Query(() => [User], {nullable: true})
  async getUsers() {
    return await this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => String }, ParseObjectIdPipe) _id: ObjectId) {
    const res = await this.userService.findOne(_id);
    if (!res) throw new NotFoundException();
    return res;
  }

  @Mutation(() => User)
  async updateUser(
    @Args('_id', { type: () => String }, ParseObjectIdPipe) _id: ObjectId,
    @Args('userInput') userInput: UserInput,
    ) {
    const res = await this.userService.update(_id, userInput);
    if (!res) throw new NotFoundException();
    return res;
  }

  @Mutation(() => User)
  async removeUser(@Args('_id', { type: () => String }, ParseObjectIdPipe) _id: ObjectId) {
    const res = await this.userService.remove(_id);
    if (!res) throw new NotFoundException();
    return res;
  }
}
