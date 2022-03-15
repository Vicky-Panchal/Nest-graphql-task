import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateSaleInput {

  @IsOptional()
  @IsNumber()
  @Field(() => Int, {nullable:true})
  total: number;

  @IsOptional()
  @IsNumber()
  @Field(() => Int, {nullable:true})
  quantity: number;

  @IsNumber()
  @Field(() => Int)
  book_id: number;




}
