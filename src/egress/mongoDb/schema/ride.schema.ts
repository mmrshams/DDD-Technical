import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Ticket } from 'src/domain/travel/ticket';

@Schema()
export class RideSchema {
  constructor(segments, capacity, uuid, ticket?) {
    this.segments = segments
    this.capacity = capacity
    this.uuid = uuid
    if(ticket) this.tickets= ticket

  }
  @Prop()
  segments: string[];

  @Prop()
  capacity: number;

  @Prop()
  tickets: Ticket[];

  @Prop({ unique: true})
  uuid: string;

}

export type RideDocument = HydratedDocument<RideSchema>;
export const RideModel = SchemaFactory.createForClass(RideSchema);