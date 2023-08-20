import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy( Strategy ){

    constructor(
        configService: ConfigService
    ){
        super({
            secretOrKey: configService.get('JWT_LOTY_TOKEN_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderBearerToken()
        })
    }

    async validate( payload: any){
        console.log({payload})

        throw new Error('Not jwt strategy implement')
    }
}