import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/schemas/user.schemas';
import { Injectable, Res,BadRequestException,UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { UserLoginDto } from './dto/user.login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel("user") private userModel: Model<UserDocument>,
    private jwtService: JwtService
    ) {}

  // Sign up Logic
  async create(CreateUserDto:CreateUserDto) {
    const {email,password,username} = CreateUserDto
    const hash = await bcrypt.hash(password, 10)

    // Check users exists
    const user = await this.userModel.findOne({email})

    if(user){
      throw new UnauthorizedException("This user already exists")
    }
    const createUser = await this.userModel.create({
      username,
      email,
      password: hash
    })

    const token = this.jwtService.sign({ id:createUser._id })

    const result = {
      createUser,
      token
    }
    return { result }
  }

  // Sign In Login
  async login(userLoginDto:UserLoginDto)  {
    const { email,password } = userLoginDto 

    const createUser = await this.userModel.findOne({email})

    if(!createUser){
      throw new UnauthorizedException("Invalid email or password")
    }
    const isPaswordMatched = await bcrypt.compare(password,createUser.password)

    if(!isPaswordMatched){
      throw new UnauthorizedException("Invalid email or password")
    }
    const token = this.jwtService.sign({ id:createUser._id })

    const result = {
      createUser,
      token
    }
    return { result }
    
  }

  async findAll(){
    return this.userModel.find()
  }
}
