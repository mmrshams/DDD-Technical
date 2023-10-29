import { Injectable } from '@nestjs/common';
import { LabyrinthRepository } from 'src/egress/mongoDb/repository/labyrinth.repository';
import { CreateTicketDto } from './dto/command.dto';
import { Labyrinth, LabyrinthFulfillmentType } from 'src/domain/labyrinth/Labyrinth';
import { LabyrinthDataMapper } from 'src/egress/mongoDb/dataMapper/labyrinth.data-mapper';

@Injectable()
export class CommandService {
  constructor(
    private readonly labyrinthRepositoryRepository: LabyrinthRepository,
    private readonly labyrinthDataMapperDataMapper: LabyrinthDataMapper
  ) {

  }
  async createLabyrinth(userId): Promise<boolean> {
    const rideInstance = Labyrinth.create({ userId })
    return this.labyrinthRepositoryRepository.create(this.labyrinthDataMapperDataMapper.toDalEntity(rideInstance))
  }

  async setLabyrinthStartPoint(id: string, x: number, y: number, userId: string) {
    const labyrinthSchema = await this.labyrinthRepositoryRepository.getById(id)
    const labyrinthInstance = Labyrinth.create(labyrinthSchema, labyrinthSchema.uuid)
    // TODO : check userId here for validity
    labyrinthInstance.setStartCoordination(x, y)
    await this.labyrinthRepositoryRepository.replace(
      labyrinthInstance.uuid,
      this.labyrinthDataMapperDataMapper.toDalEntity(labyrinthInstance))
    return true
  }

  async setLabyrinthEndPoint(id: string, x: number, y: number, userId: string) {
    const labyrinthSchema = await this.labyrinthRepositoryRepository.getById(id)
    const labyrinthInstance = Labyrinth.create(labyrinthSchema, labyrinthSchema.uuid)
    // TODO : check userId here for validity
    labyrinthInstance.setEndCoordination(x, y)
    await this.labyrinthRepositoryRepository.replace(
      labyrinthInstance.uuid,
      this.labyrinthDataMapperDataMapper.toDalEntity(labyrinthInstance))
    return true
  }

  async setLabyrinthPlayfieldPoint(id: string, x: number, y: number, type: LabyrinthFulfillmentType, userId: string) {
    const labyrinthSchema = await this.labyrinthRepositoryRepository.getById(id)
    const labyrinthInstance = Labyrinth.create(labyrinthSchema, labyrinthSchema.uuid)
    // TODO : check userId here for validity
    labyrinthInstance.setPlayField(x, y, type)
    await this.labyrinthRepositoryRepository.replace(
      labyrinthInstance.uuid,
      this.labyrinthDataMapperDataMapper.toDalEntity(labyrinthInstance))
    return true
  }

  async setLabyrinthSolution(id: string, userId: string) {
    const labyrinthSchema = await this.labyrinthRepositoryRepository.getById(id)
    const labyrinthInstance = Labyrinth.create(labyrinthSchema, labyrinthSchema.uuid)
    // TODO : check userId here for validity
    // fix it
    return labyrinthInstance.generateSolution() as any as string[]
  }
}
