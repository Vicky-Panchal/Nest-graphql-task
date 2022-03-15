import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Sale {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}
