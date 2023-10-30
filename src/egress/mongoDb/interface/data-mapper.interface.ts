export interface DataMapperInterface<TSchemaEntity, TDomainEntity> {
  toDomain(dalEntity: TSchemaEntity): TDomainEntity;
  toDalEntity(entity: TDomainEntity): TSchemaEntity;
}
