import { Module } from '@nestjs/common';
import { UsersModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest_blog'),
    PostsModule,
    AuthModule
  ],
  controllers: [AuthController],
  providers: [],
})
export class AppModule {}
