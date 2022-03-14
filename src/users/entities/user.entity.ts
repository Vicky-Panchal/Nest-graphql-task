import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';

import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({nullable:true})
  @Field()
  username: string;

  @Column()
  @Field()
  first_name: string;

  @Column()
  @Field()
  last_name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @OneToMany(() => Book, book => book.id)
  @Field(() => Book, {nullable: true})
  books?: Book[];


}
//   async validatePassowrd(password: string): Promise<boolean> {

    // const match = await bcrypt.compare(password, this.password);
    // return match;
// }