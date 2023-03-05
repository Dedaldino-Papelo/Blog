import { Controller, Get,Res,Req,Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { UserLoginDto } from './dto/user.login.dto';

@Controller('user')
export class userController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  create(@Body() CreateUserDto:CreateUserDto ){
   return this.userService.create(CreateUserDto)
  }

  @Post('login')
  login(@Body() userLoginDto:UserLoginDto){
    return this.userService.login(userLoginDto)
  }

  @Get()
    findAll(){
      return this.userService.findAll()
    }

}
