import { Injectable } from '@nestjs/common';
import { LabyrinthRepository } from 'src/egress/mongoDb/repository/labyrinth.repository';
import {
  Labyrinth,
  LabyrinthFulfillmentType,
} from 'src/domain/labyrinth/Labyrinth';
import { LabyrinthDataMapper } from 'src/egress/mongoDb/dataMapper/labyrinth.data-mapper';
import { User } from 'src/domain/labyrinth/user';
import { UserRepository } from 'src/egress/mongoDb/repository/user.repository';
import { UserDataMapper } from 'src/egress/mongoDb/dataMapper/user.data-mapper';

@Injectable()
export class CommandService {
  constructor(
    private readonly labyrinthRepositoryRepository: LabyrinthRepository,
    private readonly labyrinthDataMapperDataMapper: LabyrinthDataMapper,
    private readonly userRepository: UserRepository,
    private readonly userDataMapperDataMapper: UserDataMapper,
  ) {}
  async createLabyrinth(userId): Promise<boolean> {
    const userInstance = Labyrinth.create({ userId });
    return this.labyrinthRepositoryRepository.create(
      this.labyrinthDataMapperDataMapper.toDalEntity(userInstance),
    );
  }

  async setLabyrinthStartPoint(
    id: string,
    x: number,
    y: number,
    userId: string,
    version: number,
  ) {
    const labyrinthSchema =
      await this.labyrinthRepositoryRepository.getByIdAndUserId(id, userId);
    const labyrinthInstance = Labyrinth.create(
      labyrinthSchema,
      labyrinthSchema.uuid,
    );
    labyrinthInstance.setStartCoordination(x, y);
    return this.labyrinthRepositoryRepository.replace(
      labyrinthInstance.uuid,
      this.labyrinthDataMapperDataMapper.toDalEntity(labyrinthInstance),
      version,
    );
  }

  async setLabyrinthEndPoint(
    id: string,
    x: number,
    y: number,
    userId: string,
    version: number,
  ) {
    const labyrinthSchema =
      await this.labyrinthRepositoryRepository.getByIdAndUserId(id, userId);
    if (!labyrinthSchema) {
      throw Error('labyrinth not found!');
    }
    const labyrinthInstance = Labyrinth.create(
      labyrinthSchema,
      labyrinthSchema.uuid,
    );
    labyrinthInstance.setEndCoordination(x, y);
    return this.labyrinthRepositoryRepository.replace(
      labyrinthInstance.uuid,
      this.labyrinthDataMapperDataMapper.toDalEntity(labyrinthInstance),
      version,
    );
  }

  async setLabyrinthPlayfieldPoint(
    id: string,
    x: number,
    y: number,
    type: LabyrinthFulfillmentType,
    userId: string,
    version: number,
  ) {
    const labyrinthSchema =
      await this.labyrinthRepositoryRepository.getByIdAndUserId(id, userId);
    if (!labyrinthSchema) {
      throw Error('labyrinth not found!');
    }
    const labyrinthInstance = Labyrinth.create(
      labyrinthSchema,
      labyrinthSchema.uuid,
    );
    labyrinthInstance.setPlayField(x, y, type);
    return this.labyrinthRepositoryRepository.replace(
      labyrinthInstance.uuid,
      this.labyrinthDataMapperDataMapper.toDalEntity(labyrinthInstance),
      version,
    );
  }

  async setLabyrinthSolution(id: string, userId: string) {
    const labyrinthSchema =
      await this.labyrinthRepositoryRepository.getByIdAndUserId(id, userId);
    if (!labyrinthSchema) {
      throw Error('labyrinth not found!');
    }
    const labyrinthInstance = Labyrinth.create(
      labyrinthSchema,
      labyrinthSchema.uuid,
    );
    return labyrinthInstance.generateSolution(userId) as any as string[];
  }

  async createUserOnTheFly(username: string, password: string) {
    const UserSchema = await this.userRepository.doesExists(username);
    if (!UserSchema) {
      const userInstance = User.create({ password, username });
      await this.userRepository.create(
        this.userDataMapperDataMapper.toDalEntity(userInstance),
      );
    }
    return true;
  }
}
