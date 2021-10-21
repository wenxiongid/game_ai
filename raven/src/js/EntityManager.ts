import BaseGameEntity from "./common/game/base_game_entity";

type EntityMap = {
  [key: number]: BaseGameEntity
}

class EntityManager {
  m_EntityMap: EntityMap = {}
  registerEntity(newEntity: BaseGameEntity): void {
    this.m_EntityMap[newEntity.id()] = newEntity
  }
  getEntityFromID(id: number): BaseGameEntity {
    return this.m_EntityMap[id]
  }
  removeEntity(pEntity: BaseGameEntity) {
    this.m_EntityMap[pEntity.id()] = null
  }
  reset() {
    this.m_EntityMap = {}
  }
}

export default new EntityManager()