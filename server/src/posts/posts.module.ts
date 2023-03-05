import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/post.schemas';
import { User, UserSchema } from 'src/schemas/user.schemas';
import { UsersModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {name: Post.name,schema: PostSchema},
      {name: User.name, schema: UserSchema}
    ])
]
})
export class PostsModule {}
