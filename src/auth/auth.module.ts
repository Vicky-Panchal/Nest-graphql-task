import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([User]), 
    PassportModule.register({defaultStrategy: "jwt"}), 
    JwtModule.register({
      signOptions: {expiresIn: "36000s"},
      secret: "Area51",
  })],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
