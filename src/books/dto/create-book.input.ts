import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';

@InputType()
export class CreateBookInput {

  @IsString()
  @Field()
  book_name: string;


  @IsString()
  @Field()
  author_name: string;

}
