import { Injectable } from '@nestjs/common';
import { Labyrinth } from 'src/domain/labyrinth/labyrinth';
import { LabyrinthDataMapper } from 'src/egress/mongoDb/dataMapper/labyrinth.data-mapper';
import { LabyrinthRepository } from 'src/egress/mongoDb/repository/labyrinth.repository';

@Injectable()
export class QueryService {
  constructor(
    private readonly labyrinthRepository: LabyrinthRepository,
    private readonly labyrinthDataMapper: LabyrinthDataMapper,
  ) {}

  async getLabyrinth(userId: string): Promise<any[]> {
    return this.labyrinthRepository.get({ userId });
  }

  async getLabyrinthById(id: string, userId: string): Promise<any> {
    return this.labyrinthRepository.getByIdAndUserId(id, userId);
  }
}
