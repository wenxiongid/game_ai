export const ENTITYNAME = {
  ent_Miner_Bob: 0,
  ent_Elsa: 1
};

export default function getNameOfEntity(n){
  switch (n) {
    case ENTITYNAME.ent_Miner_Bob:
      return "Miner Bob";
    case ENTITYNAME.ent_Elsa:
      return "Elsa";
    default:
      return "UNKNOW!";
  }
}