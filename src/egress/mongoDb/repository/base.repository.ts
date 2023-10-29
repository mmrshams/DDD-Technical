
export interface Repository<T> {
  findAll(): Promise<T[]>

  findOneById(guid: string): Promise<T | null>

  doesExists(guid: string): Promise<boolean>

  save(entity: T): Promise<void>

  delete(id: string): Promise<void>
}
