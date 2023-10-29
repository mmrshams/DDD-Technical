import { Module } from '@nestjs/common';
import { QueryService } from './query/query.service';
import { CommandService } from './command/command.service';
import { EgressModule } from 'src/egress/egress.module';
import { PassportModule } from '@nestjs/passport';
import { BasicStrategy } from './auth/auth-basic.strategy';

@Module({
  imports: [EgressModule, PassportModule],
  providers: [QueryService, CommandService, BasicStrategy],
  exports: [QueryService, CommandService],
})
export class UseCaseModule {}
