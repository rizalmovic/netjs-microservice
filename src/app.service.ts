import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Credentials } from './credentials';

@Injectable()
export class AppService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  authenticate({ email, password }: Credentials) {
    this.authClient.emit('authenticate', new Credentials(email, password));
  }
}
