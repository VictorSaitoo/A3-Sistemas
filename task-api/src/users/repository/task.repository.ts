import { EntityRepository, Repository } from "typeorm";
import { Tasks } from "../entity/task.entity";

@EntityRepository(Tasks)
export class TaskRepository extends Repository<Tasks>{
    async deleteTask(id:number): Promise<void>{
        await this.delete(id);
    }
}