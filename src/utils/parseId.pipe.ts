import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ObjectId } from 'bson';

@Injectable()
export class ParseObjectIdPipe  implements PipeTransform<string, ObjectId> {
  transform(value: string, metadata: ArgumentMetadata): ObjectId {
    if (!ObjectId.isValid(value)) {
      throw new BadRequestException('nest custom pipe: id must be a mongodb id');
    }
    return new ObjectId(value);
  }
}