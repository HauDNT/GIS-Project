import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { PayLoadType } from "src/common/contants/types";

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('secret_key'),
        })
    }

    async validate(payload: PayLoadType) {
        return {
            userId: payload.userId,
            email: payload.email,
        }
    }
}