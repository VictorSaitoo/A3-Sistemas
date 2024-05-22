import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParameters, TaskDTO, TaskStatusEnum, UpdateTaskDTO } from './task.DTO';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Tasks } from './entity/task.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Tasks)
        private taskRepository: Repository<Tasks>,
        private userService: UsersService
    ){}

    async create(newTask: TaskDTO): Promise<Tasks> {
        const user = await this.userService.findById(newTask.id);
        if (!user) {
          throw new NotFoundException(`Usuário não encontrado.`);
        }
        const createTask = this.taskRepository.create({
          ...newTask,
          user: user, 
        });
        return await this.taskRepository.save(createTask);
    }

    async findById(id: number): Promise<Tasks> {
        const foundTask = await this.taskRepository.findOne({
            where: {id: id},
            relations: ['user'],
        });

        if (!foundTask){
            throw new NotFoundException(`Task não encontrada.`)
        }
        return foundTask
    }

    async findAll(): Promise<User[]> {
        return await this.userService.findAll();
    }
   /* findAll(params: FindAllParameters) : TaskDTO[]{
        return this.task.filter(t => {
            let match = true;

        if (params.title != undefined && !t.title.includes(params.title)){
              match = false;
         }
           if (params.status != undefined && !t.status.includes(params.status)){
               match = false;
            }
           return match;
      })
    } */

    async update(
        id: number,
        updateTask: UpdateTaskDTO
    ): Promise<Tasks> {
        const task = await this.findById(id);
        delete updateTask.id;

        const update = this.taskRepository.merge(task, updateTask);
        return await this.taskRepository.save(update);
    }

    async remove(id: number): Promise<void>{
        const task = await this.findById(id);
        await this.taskRepository.remove(task);
    }
}
