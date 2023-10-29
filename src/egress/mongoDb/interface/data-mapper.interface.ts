export interface DataMapperInterface<TSchemaEntity, TDomainEntity> {
  toDomain(dalEntity: TSchemaEntity): TDomainEntity;
  //  TODO: fix this later
  toDalEntity(entity: TDomainEntity): TSchemaEntity;
}
