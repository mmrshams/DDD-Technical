import { BasicStrategy as Strategy } from 'passport-http';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { CommandService } from '../command/command.service';
import { UserRepository } from 'src/egress/mongoDb/repository/user.repository';
import * as bcrypt from 'bcrypt';
@Injectable()
export class BasicStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly commandService: CommandService,
    private readonly userRepository: UserRepository,
  ) {
    super({
      passReqToCallback: true,
    });
  }

  public validate = async (req, username, password): Promise<boolean> => {
    if (!username || !password) throw new UnauthorizedException();
    await this.commandService.createUserOnTheFly(username, password);
    const userRef = await this.userRepository.getByUsername(username);

    // hash compare bcrypt need to be added here
    const passwordMatch = await bcrypt.compare(password, userRef.password);
    console.log('>>.userRef', passwordMatch);
    if (passwordMatch) {
      req.userId = userRef.uuid;
      return true;
    }
    throw new UnauthorizedException();
  };
}
