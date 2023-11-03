import { Injectable } from '@nestjs/common';
import { DataMapperInterface } from 'src/egress/mongoDb/interface/data-mapper.interface';
import { LabyrinthSchema } from '../schema/labyrinth.schema';
import { Labyrinth } from 'src/domain/labyrinth/labyrinth';

/**
 * Personally I prefer to persist data in document based persistance per aggregate
 * but there is more than on way to persist data
 */
@Injectable()
export class LabyrinthDataMapper
  implements DataMapperInterface<LabyrinthSchema, Labyrinth>
{
  toDomain(LabyrinthSchema) {
    return Labyrinth.create(LabyrinthSchema, LabyrinthSchema.uuid);
  }

  toDalEntity(labyrinth: Labyrinth) {
    return new LabyrinthSchema(
      labyrinth.getGrid,
      labyrinth.getUserId,
      labyrinth.getStartCoordination,
      labyrinth.getEndCoordination,
      labyrinth.uuid,
    );
  }
}
