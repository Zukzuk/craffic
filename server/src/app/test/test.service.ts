import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getResponse(): string {
    return 'Hello World!';
  }

  postResponse(): string {
    return 'This response is coming from POST Method';
  }
}
