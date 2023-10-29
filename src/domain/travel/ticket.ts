import { Entity } from "src/domain/common/entity.abstract";

export type TicketProps = { 
  count: number
} 

export class Ticket extends Entity {

  private stations: string[];
  private count: number;

   constructor({

    count,
  }: TicketProps, uuid?: string) {
    super(uuid);
    this.stations = [],
    this.count = count
  }

  get getStations() {
    return this.stations;
  }

  get getCount() {
    return this.count;
  }

}