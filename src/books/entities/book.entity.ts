import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('book')
@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  book_name: string;

  @Column()
  @Field()
  author_name: string;

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({name: "user_id"})
  @Field(type => User)
  user: User;

  @Column()
  @Field()
  user_id: number;

}
