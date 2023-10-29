import { Injectable } from '@nestjs/common';
import { RideRepository } from 'src/egress/mongoDb/repository/ride.repository';
import { CreateRideDto, CreateTicketDto } from './dto/command.dto';
import { Ride } from 'src/domain/travel/ride';
import { RideDataMapper } from 'src/egress/mongoDb/dataMapper/ride.data-mapper';

@Injectable()
export class CommandService {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly rideDataMapper: RideDataMapper
  ) {

  }
  async addRide(data: CreateRideDto): Promise<boolean> {
    const rideInstance = Ride.create(data)
    return this.rideRepository.create(this.rideDataMapper.toDalEntity(rideInstance))
  }

  async purchaseTicket(data: CreateTicketDto): Promise<boolean> {
    const rideSchema = await this.rideRepository.getById(data.rideId)
    const rideInstance = Ride.create(rideSchema, rideSchema.uuid)
    rideInstance.ticketPurchase({ count: data.count })
    await this.rideRepository.replace(rideInstance.uuid, this.rideDataMapper.toDalEntity(rideInstance), data.version)
    return true
  }
}
