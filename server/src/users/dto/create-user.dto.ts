import {IsEmail} from 'class-validator'

export class CreateUserDto {
    @IsEmail({}, {message: 'Please enter a correct Email'})
    email: string;
    username: string;
    password: string
}
