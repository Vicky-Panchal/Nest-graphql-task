import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Sales')
@ObjectType()
export class Sale {

  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int, {nullable:true})
  quantity: number;

  @Column()
  @Field(() => Int, {nullable:true})
  total: number;

  @OneToOne(() => Book)
  @JoinColumn({name: "book_id"})
  @Field(type => Book)
  book: Book;

  @Column()
  @Field(() => Int)
  book_id: number;


}
