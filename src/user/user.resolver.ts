import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ObjectId } from 'bson'
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UserInput } from './dto/user.input';
import { ParseObjectIdPipe } from 'src/utils/parseId.pipe';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('userInput') userInput: UserInput) {
    return this.userService.create(userInput);
  }

  @Query(() => [User])
  async getUsers() {
    return this.userService.findAll();
  }

  @Query(() => User)
  async getUser(@Args('id', { type: () => String }, ParseObjectIdPipe) _id: ObjectId) {
    return this.userService.findOne(_id);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('_id', { type: () => String }, ParseObjectIdPipe) _id: ObjectId,
    @Args('userInput') userInput: UserInput,
    ) {
    return this.userService.update(_id, userInput);
  }

  @Mutation(() => User)
  async removeUser(@Args('_id', { type: () => String }, ParseObjectIdPipe) _id: ObjectId) {
    return this.userService.remove(_id);
  }
}
