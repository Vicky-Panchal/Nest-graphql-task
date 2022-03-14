import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class SigninUserInput{

    @Field(() => Int)
    id: number;

    @Field()
    password: string;
}