import { Types } from "mongoose";

export class CreatePostDto {
    categoria: string;
    title: string;
    Image: string;
    Description: string;
    user:Types.ObjectId
}
