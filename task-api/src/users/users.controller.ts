import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDTO } from 'src/users/user.DTO';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService){}

    @Post()
    create(@Body() user: UserDTO){
        this.userService.create(user);
    }
}
