import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesResolver } from './sales.resolver';
import { Sale } from './entities/sale.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from 'src/books/books.module';
import { Book } from 'src/books/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sale, Book]), BooksModule],
  providers: [SalesResolver, SalesService]
})
export class SalesModule {

}
