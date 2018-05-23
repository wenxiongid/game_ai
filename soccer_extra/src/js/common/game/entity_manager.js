class EntityManager{
  constructor(){
    this.m_EntityMap = {};
  }
  registerEntity(newEntity){
    this.m_EntityMap[newEntity.id()] = newEntity;
  }
  getEntityFromID(id){
    return this.m_EntityMap[id];
  }
  removeEntity(pEntity){
    this.m_EntityMap[pEntity.id()] = null;
  }
}

export default new EntityManager();