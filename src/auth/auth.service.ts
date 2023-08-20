import { Injectable } from '@nestjs/common';
import { CreateAdimInput, CreateUserInput, Role } from 'src/graphql/graphql';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';



@Injectable()
export class AuthService {
    constructor(
        readonly userService: UsersService,
        private config: ConfigService,
    ){}
    
    async loginAdmin(email: string, password: string){
        const findUser = await this.userService.findOne({ email });

        const respnosePassword = await this.verifyPassword(password, findUser.password);

        if (respnosePassword == false) throw new Error('UnAuthorized')

        return this.generateJwtToken({email});
    }

    async createAdmin(input: CreateAdimInput){
        let query :any = {email: input.email}
        const response = await this.userService.findAll(query)
        
        if( response.total > 0 ) throw new Error('Email already use')
        
        const pass = await this.encryptPassword(input.password);
        let responseUser = await this.userService.create({...input, password: pass, role: [Role.ADMIN]})
        responseUser.password = ''

        return responseUser;
    }



    async encryptPassword(str: string): Promise<string> {
        const saltOrRounds = 10;
        return await bcrypt.hash(str, saltOrRounds);
    }

    async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const result = await bcrypt.compare(password, hashedPassword);
    
        return result;
    }

    generateJwtToken(payload: any): string {
        const secretKey = this.config.get<string>('JWT_LOTY_TOKEN_SECRET');
        const options: jwt.SignOptions = {
          expiresIn: this.config.get<string>('JWT_TOKEN_EXPIRATION'),
        };
    
        return jwt.sign(payload, secretKey, options);
      }
}
