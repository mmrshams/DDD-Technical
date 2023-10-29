import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { CommandService } from 'src/useCase/command/command.service';
import { CreateRideDto, CreateTicketDto } from 'src/useCase/command/dto/command.dto';
import { QueryService } from 'src/useCase/query/query.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Ride } from 'src/domain/travel/ride';

@Controller('/Ride')
@UseGuards(AuthGuard('basic'))
@ApiBearerAuth('basic')
export class HttpController {
  constructor(
    private readonly commandService: CommandService,
    private readonly queryService: QueryService
  ) { }

  /**[NOTE]: this is the one of open discussions for me 
   * regarding should we use standard rest convention or this should be action based 
   * and even based on action that is applicable on aggregation ?
  */

  @Get('get-ride')
  async getRide(@Query() query: any): Promise<Ride[]> {
    return this.queryService.getRide(query)
  }

  @Post('add-ride')
  async addRide(@Body() createRideDto: CreateRideDto) {
    return this.commandService.addRide(createRideDto);
  }

  @Post('add-ticket')
  async purchaseTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.commandService.purchaseTicket(createTicketDto);
  }
}
