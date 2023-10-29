import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class LabyrinthSchema {
  constructor(grid,userId, startCoordination?, endCoordination?, uuid?) {
    this.grid = grid
    this.startCoordination = startCoordination
    this.endCoordination = endCoordination
    this.uuid = uuid
    this.userId = userId
  }
  @Prop()
  grid: number[][];

  @Prop()
  startCoordination: [number, number];;

  @Prop()
  endCoordination: [number, number];

  @Prop({ unique: true })
  userId: string;

  @Prop({ unique: true })
  uuid: string;

}

export type LabyrinthDocument = HydratedDocument<LabyrinthSchema>;
export const LabyrinthModel = SchemaFactory.createForClass(LabyrinthSchema);