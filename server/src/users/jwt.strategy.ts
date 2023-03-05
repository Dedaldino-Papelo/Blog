import { ExtractJwt, Strategy } from 'passport-jwt';
import {Model} from 'mongoose'
import { PassportStrategy } from '@nestjs/passport';
import { Injectable,UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from '../auth/constants';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schemas';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel("user") private userModel: Model<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload:any) {
    const {id} = payload
    const user = await this.userModel.findById(id)
    
    if(!user){
        throw new UnauthorizedException("You do not have permission to access this route")
    }
        return user
  }
}