import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
import { Tasks } from './entity/task.entity';

@Module({
    imports: [
        DatabaseModule,
        TypeOrmModule.forFeature([User, Tasks]),
      ],
      exports: [TaskService],
    controllers: [TaskController],
    providers: [TaskService]
})
export class TaskModule {}
