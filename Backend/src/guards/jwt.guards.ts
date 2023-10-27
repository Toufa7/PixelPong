import {
  CanActivate,
  ExecutionContext,
  //   ExecutionContext,
  Injectable,
  //   UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }
}


@Injectable()
export class WSGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client: Socket = context.switchToWs().getClient<Socket>();
    const isAuthenticated = this.authenticate(client);

    return isAuthenticated;
  }
  private authenticate(client: Socket): boolean {
    // You can access the client's handshake data to retrieve any authentication information
    const session = client.handshake.auth.session;

    // Perform your authentication checks
    if (!session || !session.user) {
      return false; // Not authenticated
    }

    // Additional authentication checks if needed

    return true; // Authenticated
  }
}
