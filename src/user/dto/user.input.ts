import { InputType, Field, Int, PartialType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
// import { UpdateUserInput } from './update-user.input';

@InputType()
class TMPUserInput extends PartialType(User, InputType) { } //TODO: исправить


@InputType()
export class UserInput extends OmitType(TMPUserInput,['_id'], InputType) { }
