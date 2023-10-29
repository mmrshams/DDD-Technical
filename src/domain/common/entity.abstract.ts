import { v4 as UUID } from 'uuid';

export abstract class Entity {
  public readonly uuid: string;

  constructor(guid?: string) {
    this.uuid = guid || UUID();
  }
} 