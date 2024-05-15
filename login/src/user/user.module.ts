import { Module } from '@nestjs/common';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { User } from './entity/user.entity';
import { Dados } from './entity/dados.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DadosService } from './service/dados.service';
import { DadosController } from './controller/dados.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Dados])],
  providers: [UserService, DadosService],
  controllers: [UserController, DadosController]
})
export class UserModule {}