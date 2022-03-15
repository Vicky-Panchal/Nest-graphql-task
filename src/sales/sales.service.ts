import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BooksService } from 'src/books/books.service';
import { Book } from 'src/books/entities/book.entity';
import { Connection, getConnection, Repository } from 'typeorm';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale) private saleRepository: Repository<Sale>,
    @InjectRepository(Book) private booksRepository: Repository<Book>
    ) {}

  async create(createSaleInput: CreateSaleInput) {
    const book = await this.booksRepository.findOne(createSaleInput.book_id);
    const book_sale = await this.saleRepository.findOne({book_id: createSaleInput.book_id});
    if(book_sale)
    {
      book_sale.total += (book_sale.total)/(book_sale.quantity);
      book_sale.quantity += 1;
      await this.saleRepository.save(book_sale);
      return book_sale;
    }
    const sale = this.saleRepository.create(createSaleInput);
    if(!sale)
    {
      console.log("no create");
      throw new BadGatewayException("Unable to create a entry at the moment");
    }

    try {
      sale.book = book;
      sale.quantity = 1;
      sale.total = sale.book.price;
      await this.saleRepository.save(sale);
    }
    catch(error) {
      console.log(error);
      throw new BadGatewayException("Unable to create a entry at the moment");
    }
    return sale;
  }

  findAll() {
    const sales = this.saleRepository.find();
    if(!sales)
    {
      throw new NotFoundException("No entry exists");
    }
    return sales;
  }

  findOne(id: number) {
    const sale = this.saleRepository.findOne(id);
    if(!sale)
    {
      throw new NotFoundException("No entry exists");
    }
    return sale;
  }

  async generateCSV()
  {
    const sale = await getConnection()
    .getRepository(Sale)
    .createQueryBuilder("sale")
    .leftJoinAndSelect(Book,"book", "book.book_id = sale.id" )
    .getMany()

    console.log(sale);

    return "CSV file has been created";

  }

  // update(id: number, updateSaleInput: UpdateSaleInput) {
  //   return `This action updates a #${id} sale`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} sale`;
  // }
}
