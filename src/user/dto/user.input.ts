import { InputType, PartialType, OmitType } from '@nestjs/graphql';
import { MinLength, MaxLength, Min, Max } from 'class-validator';
import { User } from '../entities/user.entity';
// import { UpdateUserInput } from './update-user.input';

@InputType()
class TMPUserInput extends PartialType(User, InputType) { } //TODO: исправить


@InputType()
export class UserInput extends OmitType(TMPUserInput,['_id'], InputType) { 
  @MaxLength(20)
  @MinLength(2)
  name: string
  @Min(0)
  @Max(100_000)
  salary: number
}
