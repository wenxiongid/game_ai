enum TYPE {
  type_wall,
  type_bot,
  type_unused,
  type_waypoint,
  type_health,
  type_spawn_point,
  type_rail_gun,
  type_rocket_launcher,
  type_shotgun,
  type_blaster,
  type_obstacle,
  type_sliding_door,
  type_door_trigger
}

export function getNameOfType(w: number) {
  let s:string
  switch(w) {
    case TYPE.type_wall:
      s = 'Wall'
      break
    case TYPE.type_bot:
      s = 'bot'
      break
    case TYPE.type_unused:
      s = 'knife'
      break
    case TYPE.type_waypoint:
      s = 'Waypoint'
      break
    case TYPE.type_health:
      s = 'Health'
      break
    case TYPE.type_spawn_point:
      s = 'Spawn Point'
      break
    case TYPE.type_rail_gun:
      s = 'Railgun'
      break
    case TYPE.type_rocket_launcher:
      s = 'rocket_launcher'
      break
    case TYPE.type_shotgun:
      s = 'shotgun'
      break
    case TYPE.type_blaster:
      s = 'Blaster'
      break
    case TYPE.type_obstacle:
      s = 'Obstacle'
      break
    case TYPE.type_sliding_door:
      s = 'sliding_door'
      break
    case TYPE.type_door_trigger:
      s = 'door_trigger'
      break
  }
}

export default TYPE