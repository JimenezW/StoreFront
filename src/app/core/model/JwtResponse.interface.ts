import { ErrorResponseI } from "./errorResponse.interface"


export interface JwtResponseI extends ErrorResponseI {
        jwtToken:string,
        expireAt:string
        id:number,
        username:string
}
