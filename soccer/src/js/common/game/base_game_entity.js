import ENTITYTYPE from './entity_type';
import Vector2D from '../2d/vector2d';

let nextID = 0;
function nextValidID(){
  return nextID++;
}

export default class BaseGameEntity{
  constructor(entityType, pos, r, forceID){
    this.m_ID = forceID || nextValidID();
    this.m_dBoundingRadius = r || 0.0;
    this.m_vPos = pos || new Vector2D(0, 0);
    this.m_vScale = new Vector2D(1.0, 1.0);
    this.m_EntityType = entityType || ENTITYTYPE.default;
    this.m_bTag = false;
  }
  update(){}
  render(){}
  handleMessage(telegram){
    return false;
  }
  write(){}
  read(){}
  pos(){
    return this.m_vPos;
  }
  setPos(newPos){
    this.m_vPos = newPos;
  }
  bRadius(){
    return this.m_dBoundingRadius;
  }
  setBRadius(r){
    this.m_dBoundingRadius = r;
  }
  id(){
    return this.m_ID;
  }
  isTagged(){
    return this.m_bTag;
  }
  tag(){
    this.m_bTag = true;
  }
  unTag(){
    this.m_bTag = false;
  }
  scale(){
    return this.m_vScale;
  }
  setScale(vec){
    if(typeof vec == 'number'){
      this.m_dBoundingRadius *= vec / Math.max(this.m_vScale.x, this.m_vScale.y);
      this.m_vScale = new Vector2D(vec, vec);
    }else{
      this.m_dBoundingRadius *= Math.max(vec.x, vec.y) / Math.max(this.m_vScale.x, this.m_vScale.y);
      this.m_vScale = vec;
    }
  }
  entityType(){
    return this.m_EntityType;
  }
  setEntityType(newType){
    this.m_EntityType = newType;
  }
}