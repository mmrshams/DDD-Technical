import { Injectable } from '@nestjs/common';
import { Ride } from 'src/domain/travel/ride';
import { RideDataMapper } from 'src/egress/mongoDb/dataMapper/ride.data-mapper';
import { RideRepository } from 'src/egress/mongoDb/repository/ride.repository';

@Injectable()
export class QueryService {
  constructor(
    private readonly rideRepository: RideRepository,
    private readonly rideDataMapper: RideDataMapper
  ) { }

  async getRide(query): Promise<Ride[]> {
    return (await this.rideRepository.get(query)).map(item => this.rideDataMapper.toDomain(item))
  }
}
