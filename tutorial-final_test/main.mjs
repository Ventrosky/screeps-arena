import { getObjectsByPrototype } from 'game/utils';
import { Creep, StructureSpawn, Source } from 'game/prototypes';
import { WORK, CARRY, MOVE, ATTACK, RESOURCE_ENERGY, ERR_NOT_IN_RANGE } from 'game/constants';
import { } from 'arena';


export function loop() {
    const spawn = getObjectsByPrototype(StructureSpawn)[0];
    let activeSources = getObjectsByPrototype(Source).filter(i => i.energy > 0)
    
    const creeps = getObjectsByPrototype(Creep).filter(c => c.my);

    if (creeps.length % 2 == 0){
        spawn.spawnCreep([WORK, CARRY, MOVE]);
    } else {
        spawn.spawnCreep([ATTACK, ATTACK, MOVE]);
    }

    const targets = getObjectsByPrototype(Creep).filter(c => !c.my);
    
    for (let creep of creeps){
        if (creep.body.some(b => b.type == ATTACK) && (targets != undefined && targets.length > 0)){
            let target = creep.findClosestByRange(targets);
            if(target && creep.attack(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
        if (creep.body.some(b => b.type == WORK)){
            if (creep.store[RESOURCE_ENERGY] < creep.store.getCapacity()) {
                let source = creep.findClosestByRange(activeSources);
                if (source && creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            } else if (creep.transfer(spawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        }
    }
}
