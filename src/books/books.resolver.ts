import { Resolver, Query, Mutation, Args, Int, ResolveField } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './entities/book.entity';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/users/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GetUser } from 'src/auth/get-user.decorator';

@Resolver(() => Book)
@UseGuards(JwtAuthGuard)
export class BooksResolver {
  constructor(private readonly booksService: BooksService) {}

  @Mutation(() => [Book])
  createBook(
    @Args({name: 'createBookInput',type: () => [CreateBookInput]},) 
    createBookInput: CreateBookInput[],
    @GetUser() user: User)
  {
    return this.booksService.create(createBookInput, user);
  }

  @Query(() => Book, { name: 'books' })
  findAll(@GetUser() user: User) {
    return this.booksService.findAll(user);
  }

  @Query(() => Book, { name: 'book' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
    @GetUser() user: User )
  {
    return this.booksService.findOne(id,user);
  }

  @Mutation(() => Book)
  updateBook(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateBookInput') updateBookInput: UpdateBookInput,
    @GetUser() user: User
    ) {
    return this.booksService.update(id, updateBookInput, user);
  }

  @Mutation(() => Book)
  removeBook(
    @Args('id', { type: () => Int }) id: number,@GetUser() user: User) {
    return this.booksService.remove(id, user);
  }
}
