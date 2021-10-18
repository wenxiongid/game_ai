import ITypeToString from "../common/misc/TypeToString.d";

export enum GOAL_TYPES {
  goal_think,
  goal_explore,
  goal_arrive_at_position,
  goal_seek_to_position,
  goal_follow_path,
  goal_traverse_edge,
  goal_move_to_position,
  goal_get_health,
  goal_get_shotgun,
  goal_get_rocket_launcher,
  goal_get_railgun,
  goal_wander,
  goal_negotiate_door,
  goal_attack_target,
  goal_hunt_target,
  goal_strafe,
  goal_adjust_range,
  goal_say_phrase
}

class GoalTypeToString implements ITypeToString {
  convert(goal: number) {
    switch(goal) {
      case GOAL_TYPES.goal_explore:
        return "explore";
      case GOAL_TYPES.goal_think:
        return "think";
      case GOAL_TYPES.goal_arrive_at_position:
        return "arrive_at_position";
      case GOAL_TYPES.goal_seek_to_position:
        return "seek_to_position";
      case GOAL_TYPES.goal_follow_path:
        return "follow_path";
      case GOAL_TYPES.goal_traverse_edge:
        return "traverse_edge";
      case GOAL_TYPES.goal_move_to_position:
        return "move_to_position";
      case GOAL_TYPES.goal_get_health:
        return "get_health";
      case GOAL_TYPES.goal_get_shotgun:
        return "get_shotgun";
      case GOAL_TYPES.goal_get_railgun:
        return "get_railgun";
      case GOAL_TYPES.goal_get_rocket_launcher:
        return "get_rocket_launcher";
      case GOAL_TYPES.goal_wander:
        return "wander";
      case GOAL_TYPES.goal_negotiate_door:
        return "negotiate_door";
      case GOAL_TYPES.goal_attack_target:
        return "attack_target";
      case GOAL_TYPES.goal_hunt_target:
        return "hunt_target";
      case GOAL_TYPES.goal_strafe:
        return "strafe";
      case GOAL_TYPES.goal_adjust_range:
        return "adjust_range";
      case GOAL_TYPES.goal_say_phrase:
        return "say_phrase";
      default:
        return "UNKNOWN GOAL TYPE!";
    }
  }
}

export default new GoalTypeToString()