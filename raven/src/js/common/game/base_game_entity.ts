import ENTITYTYPE from './entity_type';
import Vector2D from '../2D/Vector2D';
import IVector2D from '../2D/Vector2D/index.d';
import IBaseGameEntity from './base_game_entity.d'
import ITelegram from '../messaging/telegram.d';

let nextID = 0;
function nextValidID(){
  return nextID++;
}

export default class BaseGameEntity implements IBaseGameEntity{
  m_ID: number
  m_dBoundingRadius: number
  m_vPos: IVector2D
  m_vScale: IVector2D
  m_EntityType: number
  m_bTag: boolean
  constructor(entityType: number, pos: IVector2D, r: number, forceID?: number){
    this.m_ID = forceID || nextValidID();
    this.m_dBoundingRadius = r || 0.0;
    this.m_vPos = pos || new Vector2D(0, 0);
    this.m_vScale = new Vector2D(1.0, 1.0);
    this.m_EntityType = entityType || ENTITYTYPE.default;
    this.m_bTag = false;
  }
  update(){}
  render(){}
  handleMessage(telegram: ITelegram){
    return false;
  }
  write(){}
  read(){}
  pos(){ return this.m_vPos; }
  setPos(newPos: IVector2D){ this.m_vPos = newPos; }
  bRadius(){ return this.m_dBoundingRadius; }
  setBRadius(r: number){ this.m_dBoundingRadius = r; }
  id(){ return this.m_ID; }
  isTagged(){ return this.m_bTag; }
  tag(){ this.m_bTag = true; }
  unTag(){ this.m_bTag = false; }
  scale(){ return this.m_vScale; }
  setScale(vec: IVector2D){
    if(typeof vec == 'number'){
      this.m_dBoundingRadius *= vec / Math.max(this.m_vScale.x, this.m_vScale.y);
      this.m_vScale = new Vector2D(vec, vec);
    }else{
      this.m_dBoundingRadius *= Math.max(vec.x, vec.y) / Math.max(this.m_vScale.x, this.m_vScale.y);
      this.m_vScale = vec;
    }
  }
  entityType(){ return this.m_EntityType; }
  setEntityType(newType: number){ this.m_EntityType = newType; }
}