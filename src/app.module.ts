import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { User } from './users/entities/user.entity';
import { Book } from './books/entities/book.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5433, // database host
      username: 'postgres', // username
      password: 'vicky3600', // user password
      database: 'postgres', // name of our database,
      entities: [User, Book], // models will be loaded automatically 
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    UsersModule,
    BooksModule,
    AuthModule,
  ]
})
export class AppModule {}
