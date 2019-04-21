import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('state')
  getState(): Object {
    return this.appService.getState();
  }

  @Get('polls/:id/admin/:adminId')
  getAdminState(@Param('id') id, @Param('adminId') adminId): Object {
    // superficial authentication, reading all data is OK, I care about who can actually EDIT said data
    return this.appService.isValidAdminId(id, adminId)
  }
}
