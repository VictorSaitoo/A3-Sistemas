import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtSecret: string;

  constructor(
    private readonly jwtService: JwtService, 
    private readonly configService: ConfigService
  ){
    this.jwtSecret = this.configService.get<string>('JWT_SECRET')
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFronHeader(request);

    if(!token){
      throw new UnauthorizedException();
    }

    try{
      const payload = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.jwtSecret
        }
      )

      request ['user'] = payload;
    }catch{
      throw new UnauthorizedException();
    }
    return true ;
  }

  private extractTokenFronHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token: undefined;
  }
}