
import { Entity } from "src/domain/common/entity.abstract";
import { Ticket, TicketProps } from "./ticket";

type RideProps = {
  segments: string[],
  capacity: number,
  tickets?: Ticket[]
}

/**[NOTE]: Ride is the aggregate root */
export class Ride extends Entity {

  private segments: string[];
  private capacity: number;
  /** value object */
  private tickets: Ticket[]

  private constructor({
    segments,
    capacity,
    tickets,
  }: RideProps, uuid?: string) {
    super(uuid);
    tickets?.length ? this.tickets = tickets : this.tickets = []
    this.segments = segments
    this.capacity = capacity
  }

  get getSegments() {
    return this.segments;
  }

  get getCapacity() {
    return this.capacity;
  }

  get getTicket() {
    return this.tickets;
  }

  public static create(props: RideProps, guid?: string) {
    if (!props.segments || props.capacity === undefined) {
      throw new Error('Unable to create the Ride!');
    }
    return new Ride(props, guid);
  }

  public ticketPurchase(data: TicketProps) {
    const ticketRef = new Ticket(data)
    this.tickets.push(ticketRef)
    this.capacity = this.capacity - ticketRef.getCount
    if (this.capacity < 0) throw Error('Cannot Purchase a ticket!')
    return this.tickets
  }
}