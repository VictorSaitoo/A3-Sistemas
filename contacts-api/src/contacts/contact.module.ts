import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactsService } from './contact.service';
import { ContactsController } from './contact.controller';
import { Contact } from './contact.entity';
import { UsersModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), UsersModule],
  providers: [ContactsService],
  controllers: [ContactsController],
})
export class ContactsModule {}
