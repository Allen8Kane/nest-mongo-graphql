import { ObjectType, Field, Int } from '@nestjs/graphql';
import { ObjectId } from 'bson'

@ObjectType()
export class User {
  @Field(() => String)
  _id: ObjectId;
  @Field(() => String)
  name: string
  @Field(() => Int)
  salary: number
}
