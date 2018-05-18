import Miner from "./miner";
import MinersWife from "./miner_wife";
import { ENTITYNAME } from './entity_name';
import EntityManager from './entity_manager';
import MessageDispatcher from './message_dispatcher';

var miner = new Miner(ENTITYNAME.ent_Miner_Bob);
var minersWife = new MinersWife(ENTITYNAME.ent_Elsa);
EntityManager.registerEntity(miner);
EntityManager.registerEntity(minersWife);
setInterval(function(){
  miner.update();
  minersWife.update();
  MessageDispatcher.dispatchDelayedMessages();
}, 1600);
