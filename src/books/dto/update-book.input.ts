import { CreateBookInput } from './create-book.input';
import { IsNumber, IsString, IsOptional } from 'class-validator';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateBookInput extends PartialType(CreateBookInput) {
 
  @IsOptional()
  @IsString()
  @Field()
  book_name: string;


  @IsOptional()
  @IsString()
  @Field()
  author_name: string;

  @IsOptional()
  @IsNumber()
  @Field()
  user_id: number;
}
