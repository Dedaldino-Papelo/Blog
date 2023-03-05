import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { UserService } from './user.service';
import {MongooseModule} from '@nestjs/mongoose'
import { User, UserSchema } from 'src/schemas/user.schemas';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        MongooseModule.forFeature([{name: "user",schema: UserSchema}]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [userController],
    providers: [UserService,JwtStrategy],
    exports: [UserService,JwtStrategy,PassportModule]
    
})
export class UsersModule {}
