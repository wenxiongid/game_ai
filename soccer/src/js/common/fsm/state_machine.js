class StateMachine{
  constructor(owner){
    this.m_pOwner = owner;
    this.m_pCurrentState = null;
    this.m_pPreviousState = null;
    this.m_pGlobalState = null;
  }
  setCurrentState(state){
    this.m_pCurrentState = state;
  }
  setGlobalState(state){
    this.m_pGlobalState = state;
  }
  setPreviousState(state){
    this.m_pPreviousState = state;
  }
  update(){
    if(this.m_pGlobalState){
      this.m_pGlobalState.execute(this.m_pOwner);
    }
    if(this.m_pCurrentState){
      this.m_pCurrentState.execute(this.m_pOwner);
    }
  }
  changeState(state){
    this.m_pPreviousState = this.m_pCurrentState;
    this.m_pCurrentState.exit(this.m_pOwner);
    this.m_pCurrentState = state;
    this.m_pCurrentState.enter(this.m_pOwner);
  }
  revertToPreviousState(){
    this.changeState(this.m_pPreviousState);
  }
  handleMessage(telegram){
    if(this.m_pCurrentState && this.m_pCurrentState.onMessage(this.m_pOwner, telegram)){
      return true;
    }
    if (this.m_pGlobalState && this.m_pGlobalState.onMessage(this.m_pOwner, telegram)) {
      return true;
    }
    return false;
  }
}

export default StateMachine;