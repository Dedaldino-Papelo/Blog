import { BadRequestException, Injectable,NotFoundException } from '@nestjs/common';
import {Model} from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { Post,PostDocument } from 'src/schemas/post.schemas';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User, UserDocument } from 'src/schemas/user.schemas';
import {UserService} from '../users/user.service'

@Injectable()
export class PostsService {
constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createPostDto: CreatePostDto,id: string) {

    try {
      const user = await this.userModel.findById(id)
      
      if(!user){
        throw new NotFoundException("user not found")

      } else {
        const post = await this.postModel.create({
          ...createPostDto,
          user
        })
        return post.save()
      }
      
    } catch (error) {
      console.log("Internal server error")
    }
  }

  async findAll() {
    return this.postModel.find().populate('user').exec()
  }

  async findOne(id: string) {
    try {
      const posts = await this.postModel.findById(id).populate('user').exec();

      if(!posts){
        throw new NotFoundException("posts not found")
      }
      return posts
      
    } catch (error) {
      throw new BadRequestException("Server denied")
    }
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    return this.postModel.findByIdAndUpdate({
      _id:id
    }, {
      $set: updatePostDto
    }, {
      new: true
    });
  }

 async remove(id: string) {
  return this.postModel.deleteOne({
    _id: id
  });
  }
}
