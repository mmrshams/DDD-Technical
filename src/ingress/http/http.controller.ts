import { Controller, Get, Param, Post, Query, UseGuards, Request, Put } from '@nestjs/common';
import { CommandService } from 'src/useCase/command/command.service';
import { QueryService } from 'src/useCase/query/query.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Labyrinth, LabyrinthFulfillmentType } from 'src/domain/labyrinth/Labyrinth';
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
    const { id: userId } = req.user
    return this.queryService.getLabyrinth(userId)
  }

  @Post('')
  async createLabyrinth(@Request() req) {
    const { id: userId } = req.user
    return this.commandService.createLabyrinth(userId);
  }

  @Get('/:id')
  async getLabyrinthById(@Request() req, @Param('id') id: string): Promise<Labyrinth> {
    const { id: userId } = req.user
    return this.queryService.getLabyrinthById(id, userId)
  }

  @Put('/:id/start/:x/:y')
  async setLabyrinthStartPoint(
    @Request() req,
    @Param('id') id: string,
    @Param('x') x: string,
    @Param('y') y: string): Promise<boolean> {
    const { id: userId } = req.user
    return this.commandService.setLabyrinthStartPoint(id, Number(x),Number(y), userId)
  }

  @Put('/:id/end/:x/:y')
  async setLabyrinthEndPoint(
    @Request() req,
    @Param('id') id: string,
    @Param('x') x: string,
    @Param('y') y: string): Promise<boolean> {
    const { id: userId } = req.user
    return this.commandService.setLabyrinthEndPoint(id, Number(x),Number(y), userId)
  }


  @Put('/:id/playfield/:x/:y/:type')
  async setLabyrinthPlayfieldPoint(
    @Request() req,
    @Param('id') id: string,
    @Param('x') x: string,
    @Param('y') y: string,
    @Param('y') type: LabyrinthFulfillmentType): Promise<boolean> {
    const { id: userId } = req.user
    return this.commandService.setLabyrinthPlayfieldPoint(id, Number(x),Number(y), type, userId)
  }



  @Get('/:id/solution')
  async setLabyrinthSolution(
    @Request() req,
    @Param('id') id: string): Promise<Array<string>> {
    const { id: userId } = req.user
    return this.commandService.setLabyrinthSolution(id, userId)
  }




}
