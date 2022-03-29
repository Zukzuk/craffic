import { NotFoundException } from '@nestjs/common';

export class DefaultNotFoundException extends NotFoundException {
  constructor(id: number | string, label = '') {
    super(`${label || 'Object'} with id ${id} not found`);
  }
}

export class CustomNotFoundException extends NotFoundException {
  constructor(msg: string) {
    super(msg);
  }
}

export class CollectionNotFoundException extends NotFoundException {
  constructor() {
    super(`Collection could not be found`);
  }
}
