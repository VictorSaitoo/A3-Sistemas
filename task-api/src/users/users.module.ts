import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tasks } from 'src/task/entity/task.entity';
import { User } from './entity/user.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([User, Tasks]),],
  controllers: [UsersController],
  exports: [UsersModule],
  providers: [UsersService]
})
export class UsersModule {}
