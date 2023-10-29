import { Injectable } from '@nestjs/common';
import { Labyrinth } from 'src/domain/labyrinth/Labyrinth';
import { LabyrinthDataMapper } from 'src/egress/mongoDb/dataMapper/labyrinth.data-mapper';
import { LabyrinthRepository } from 'src/egress/mongoDb/repository/labyrinth.repository';

@Injectable()
export class QueryService {
  constructor(
    private readonly labyrinthRepository: LabyrinthRepository,
    private readonly labyrinthDataMapper: LabyrinthDataMapper
  ) { }

  async getLabyrinth(userId: string): Promise<Labyrinth[]> {
    return (await this.labyrinthRepository.get(userId)).map(item => this.labyrinthDataMapper.toDomain(item))
  }

  async getLabyrinthById(id: string, userId: string): Promise<Labyrinth> {
    // fix this
    return (await this.labyrinthRepository.get({id, userId})).map(item => this.labyrinthDataMapper.toDomain(item))[0]
  }
}

