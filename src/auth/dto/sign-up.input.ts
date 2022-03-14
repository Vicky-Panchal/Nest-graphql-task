import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class SignUpUserInput{

  @Field()
  username: string;

  
  @Field()
  first_name: string;

  
  @Field()
  last_name: string;

  
  @Field()
  email: string;

  
  @Field()
  password: string;
}