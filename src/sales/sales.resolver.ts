import { Resolver, Query, Mutation, Args, Int, ResolveField } from '@nestjs/graphql';
import { SalesService } from './sales.service';
import { Sale } from './entities/sale.entity';
import { CreateSaleInput } from './dto/create-sale.input';
import { UpdateSaleInput } from './dto/update-sale.input';

@Resolver(() => Sale)
export class SalesResolver {
  constructor(private readonly salesService: SalesService) {}

  @Mutation(() => Sale)
  createSale(@Args('createSaleInput') createSaleInput: CreateSaleInput) {
    return this.salesService.create(createSaleInput);
  }

  @Query(() => [Sale], { name: 'sales' })
  findAll() {
    return this.salesService.findAll();
  }

  @Query(() => Sale, { name: 'sale' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.salesService.findOne(id);
  }

  @Query(() => String, { name: 'generateCSV' })
  generateCSV() {
    console.log("dddfd");
    return this.salesService.generateCSV();
  }

  // @Mutation(() => Sale)
  // updateSale(@Args('updateSaleInput') updateSaleInput: UpdateSaleInput) {
  //   return this.salesService.update(updateSaleInput.id, updateSaleInput);
  // }

  // @Mutation(() => Sale)
  // removeSale(@Args('id', { type: () => Int }) id: number) {
  //   return this.salesService.remove(id);
  // }
}
