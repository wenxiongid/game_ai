import Vector2D, { vec2DDistance, vec2dNormalize } from "./common/2D/Vector2D";
import Wall2D from "./common/2D/Wall2D";
import BaseGameEntity from "./common/game/base_game_entity";
import ITelegram from "./common/messaging/telegram";
import gdi from "./common/misc/cgdi";
import { clamp } from "./common/misc/utils";
import Raven_Map from "./Raven_Map";
import message_type from "./Raven_Messages";
import TYPE from "./raven_objectEnumerations";

enum door_status {
  open,
  opening,
  closed,
  closing
}

export default class Raven_Door extends BaseGameEntity {
  m_Status: door_status
  m_pWall1: Wall2D
  m_pWall2: Wall2D
  m_Switches: number[]
  m_iNumTicksStayOpen: number
  m_iNumTicksCurrentlyOpen: number
  m_vP1: Vector2D
  m_vP2: Vector2D
  m_dSize: number
  m_vtoP2Norm: Vector2D
  m_dCurrentSize: number
  protected open() {
    if(this.m_Status === door_status.opening) {
      if(this.m_dCurrentSize < 2) {
        this.m_Status = door_status.open
        this.m_iNumTicksCurrentlyOpen = this.m_iNumTicksStayOpen
        return
      }
      this.m_dCurrentSize -= 1
      this.m_dCurrentSize = clamp(this.m_dCurrentSize, 0, this.m_dSize)
      this.changePosition(this.m_vP1, this.m_vP1.add(this.m_vtoP2Norm.crossNum(this.m_dCurrentSize)))
    }
  }
  protected close() {
    if(this.m_Status === door_status.closing) {
      if(this.m_dCurrentSize === this.m_dSize) {
        this.m_Status = door_status.closed
        return
      }
      this.m_dCurrentSize += 1
      this.m_dCurrentSize = clamp(this.m_dCurrentSize, 0, this.m_dSize)
      this.changePosition(this.m_vP1, this.m_vP1.add(this.m_vtoP2Norm.crossNum(this.m_dCurrentSize)))
    }
  }
  protected changePosition(newP1: Vector2D, newP2: Vector2D) {
    this.m_vP1 = newP1
    this.m_vP2 = newP2
    const perp = this.m_vtoP2Norm.perp()
    this.m_pWall1.setFrom(this.m_vP1.add(perp))
    this.m_pWall1.setTo(this.m_vP2.add(perp))
    this.m_pWall2.setFrom(this.m_vP1.add(perp.getReverse()))
    this.m_pWall2.setTo(this.m_vP2.add(perp.getReverse()))
  }
  constructor(pMap: Raven_Map, p1: Vector2D, p2: Vector2D, r:number, id?: number, switchesId?: number[]) {
    super(TYPE.type_sliding_door, new Vector2D(0, 0), r, id || 0)
    this.m_vP1 = p1
    this.m_vP2 = p2
    this.m_Switches = switchesId || []

    this.m_Status = door_status.closed
    this.m_iNumTicksStayOpen = 60
    this.m_vtoP2Norm = vec2dNormalize(this.m_vP2.add(this.m_vP1.getReverse()))
    this.m_dCurrentSize = this.m_dSize = vec2DDistance(this.m_vP2, this.m_vP1)
    const perp = this.m_vtoP2Norm.perp()
    this.m_pWall1 = pMap.addWall(this.m_vP1.add(perp), this.m_vP2.add(perp))
    this.m_pWall2 = pMap.addWall(this.m_vP1.add(perp.getReverse()), this.m_vP2.add(perp.getReverse()))
  }
  render() {
    gdi.thickBluePen()
    gdi.line(this.m_vP1, this.m_vP2)
  }
  update() {
    switch(this.m_Status) {
      case door_status.opening:
        this.open()
        break
      case door_status.closing:
        this.close()
        break
      case door_status.open:
        if(this.m_iNumTicksCurrentlyOpen-- < 0) {
          this.m_Status = door_status.closing
        }
    }
  }
  handleMessage(msg: ITelegram) :boolean {
    if(msg.msg === message_type.Msg_OpenSesame) {
      if(this.m_Status !== door_status.open) {
        this.m_Status = door_status.opening
      }
      return true
    }
    return false
  }
  getSwitchIDs() { return this.m_Switches }
  addSwirch(id: number) {
    let bfound = false
    for (const sw of this.m_Switches) {
      if(sw === id) {
        bfound = true
        break
      }
    }
    if(!bfound) {
      this.m_Switches.push(id)
    }
  }
}