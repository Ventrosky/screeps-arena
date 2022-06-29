import { getObjectsByPrototype } from 'game/utils';
import { StructureSpawn, StructureContainer, Creep } from 'game/prototypes';
import { WORK, CARRY, MOVE, ATTACK, RESOURCE_ENERGY, ERR_NOT_IN_RANGE} from 'game/constants';
import { } from 'arena';

export function loop() {
    let spawn = getObjectsByPrototype(StructureSpawn).find(i => i.my);
    let containers = getObjectsByPrototype(StructureContainer).filter(i => i.store.getUsedCapacity() > 0)


    const creeps = getObjectsByPrototype(Creep).filter(c => c.my);
    if (creeps.length < 2){
        spawn.spawnCreep([WORK, CARRY, MOVE]);
    } else {
        spawn.spawnCreep([ATTACK, ATTACK, MOVE]);
    }

    //const targets = getObjectsByPrototype(Creep).filter(c => !c.my);
    const target = getObjectsByPrototype(StructureSpawn).find(i => !i.my);

    for (let creep of creeps){
        if (creep.body.some(b => b.type == ATTACK)){
            //let target = creep.findClosestByRange(targets);
            if(target && creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        if (creep.body.some(b => b.type == WORK)){
            if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
                let source = creep.findClosestByRange(containers);
                if (source && creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
    }
}
