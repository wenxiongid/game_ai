var m_iNextValidID = 0;

export default class BaseGameEntity{
  constructor(id){
    this.setID(id);
  }
  setID(id){
    if(id >= m_iNextValidID){
      this.m_ID = id;
      m_iNextValidID = id + 1;
    }
  }
  update(){}
  id(){
    return this.m_ID;
  }
}