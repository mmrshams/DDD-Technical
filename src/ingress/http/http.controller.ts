import { Controller, Get, Param, Post, UseGuards, Request, Put, Body, UseFilters } from '@nestjs/common';
import { CommandService } from 'src/useCase/command/command.service';
import { QueryService } from 'src/useCase/query/query.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Labyrinth, LabyrinthFulfillmentType } from 'src/domain/labyrinth/Labyrinth';
import { LabyrinthDto } from 'src/useCase/command/dto/command.dto';
@Controller('/labyrinth')
@UseGuards(AuthGuard('basic'))
@ApiBearerAuth('basic')
export class HttpController {
  constructor(
    private readonly commandService: CommandService,
    private readonly queryService: QueryService
  ) { }

  /**
    * TODO Actions: 
    *  1. GET /labyrinth/:id [done]
    *  2. GET /labyrinth/:id [done]
    *  3. POST /labyrinth [done]
    *  4. PUT /labyrinth/:id/playfield/:x/:y/:type
    *  7. PUT /labyrinth/:id/start/:x/:y
    *  8. PUT /labyrinth/:id/end/:x/:y
    *  9. GET /labyrinth/:id/solution
    */
  @Get('')
  async getLabyrinth(@Request() req): Promise<Labyrinth[]> {
    return this.queryService.getLabyrinth(req.userId)
  }

  @Post('')
  async createLabyrinth(@Request() req) {
    return this.commandService.createLabyrinth(req.userId);
  }

  @Get('/:id')
  async getLabyrinthById(@Request() req, @Param('id') id: string): Promise<Labyrinth> {
    return this.queryService.getLabyrinthById(id, req.userId)
  }

  @Put('/:id/start/:x/:y')
  async setLabyrinthStartPoint(
    @Request() req,
    @Body() data: LabyrinthDto,
    @Param('id') id: string,
    @Param('x') x: string,
    @Param('y') y: string): Promise<any> {
    return this.commandService.setLabyrinthStartPoint(id, Number(x),Number(y), req.userId, data.version)
  }

  @Put('/:id/end/:x/:y')
  async setLabyrinthEndPoint(
    @Request() req,
    @Body() data: LabyrinthDto,
    @Param('id') id: string,
    @Param('x') x: string,
    @Param('y') y: string): Promise<any> {
    return this.commandService.setLabyrinthEndPoint(id, Number(x),Number(y), req.userId, data.version)
  }


  @Put('/:id/playfield/:x/:y/:type')
  async setLabyrinthPlayfieldPoint(
    @Request() req,
    @Body() data: LabyrinthDto,
    @Param('id') id: string,
    @Param('x') x: string,
    @Param('y') y: string,
    @Param('type') type: LabyrinthFulfillmentType): Promise<any> {
    return this.commandService.setLabyrinthPlayfieldPoint(id, Number(x),Number(y), Number(type), req.userId, data.version)
  }

  @Get('/:id/solution')
  async setLabyrinthSolution(
    @Request() req,
    @Param('id') id: string): Promise<Array<string>> {
    return this.commandService.setLabyrinthSolution(id, req.userId)
  }

}
