import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private bookRepository: Repository<Book>) {}

  async create(createBookInput: CreateBookInput[], user: User) {

      const books = this.bookRepository.create(createBookInput);

    if(!books)
    {
      throw new BadGatewayException("Unable to create a new book entry");
    }

    for(let i = 0; i< books.length; i++) {
      books[i].user = user;
    }
    try {
      await this.bookRepository.insert(books);
    }
    catch(error){
      console.log(error);
      throw new BadGatewayException("Unable to create a new book entry");
    }

    return [...books];
  }

  async findAll(user: User) {
    const books = await this.bookRepository.find({where: {user_id:user.id}});

    if(!books)
    {
      throw new NotFoundException("No entries available");
    }


    return books;
  }

  async findOne(id: number, user: User) {
    const book = await this.bookRepository.findOne({where:{user_id:user.id}});

    if(!book)
    {
      throw new NotFoundException("No book found with the requested id");
    }

    return book;
  }

  async update(id: number, updateBookInput: Partial<UpdateBookInput>, user: User) {

    const book = await this.bookRepository.findOne({where:{id,user_id:user.id}});

    if(!book)
    {
      throw new NotFoundException("No book found with the requested id");
    }

    Object.assign(book, updateBookInput);

    try{
      await this.bookRepository.save(book);
    }
    catch(error){
      throw new BadGatewayException("Unable to update the book entry");
    }
    return book;
  }

  async remove(id: number, user: User) {
    const book  = await this.bookRepository.findOne({where:{user_id:user.id}});

    if(!book)
    {
      throw new NotFoundException("Book doesn't exist");
    }

    try{
      await this.bookRepository.delete(book);
    }
    catch(error)
    {
      throw new BadGatewayException("Unable to delete the book");
    }

  }
}
