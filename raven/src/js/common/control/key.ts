class ControlKey {
  private m_pressKeys: string[]
  private handleKeyDown(e: KeyboardEvent) {
    const key = e.key
    if(!this.m_pressKeys.includes(key)) {
      this.m_pressKeys.push(key)
    }
  }
  private handleKeyUp(e: KeyboardEvent) {
    const key = e.key
    const i = this.m_pressKeys.indexOf(key)
    if(i >= 0) {
      this.m_pressKeys = this.m_pressKeys.splice(i, 1)
    }
  }
  constructor() {
    this.m_pressKeys = []
    document.addEventListener('keydown', this.handleKeyDown.bind(this))
    document.addEventListener('keyup', this.handleKeyUp.bind(this))
  }
  isKeyPress(key: string) {
    return this.m_pressKeys.includes(key)
  }
}

export default new ControlKey()