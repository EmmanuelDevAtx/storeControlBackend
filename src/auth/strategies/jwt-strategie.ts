import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { JwtInterface } from "../interfaces/jwt.Interface";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){

    constructor(
        configService: ConfigService,
        readonly authService: AuthService
    ){
        super({
            secretOrKey: configService.get('JWT_TOKEN_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        })
    }

    async validate( payload: JwtInterface){
        console.log({payload})
        try {
            const repsonse = await this.authService.validateUser(payload.email);
            return repsonse;
        } catch (error) {
            
            throw new Error(error)
        }


    }
}