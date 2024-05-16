import { Controller, Get, Post, Param } from '@nestjs/common';
import { ContactsService } from './contact.service';
import { Contact } from './contact.entity';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get(':userId')
  findAll(@Param('userId') userId: number): Promise<Contact[]> {
    return this.contactsService.findAll(userId);
  }

  @Post(':userId/:friendId')
  addContact(@Param('userId') userId: number, @Param('friendId') friendId: number): Promise<Contact> {
    return this.contactsService.addContact(userId, friendId);
  }
}
