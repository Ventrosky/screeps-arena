import { getObjectsByPrototype } from 'game/utils';
import { StructureSpawn, Flag  } from 'game/prototypes';
import { MOVE } from 'game/constants';
import { } from 'arena';

let creep1, creep2;
export function loop() {
    let mySpawn = getObjectsByPrototype(StructureSpawn)[0];
    let flags = getObjectsByPrototype(Flag);

    if(!creep1) {
        creep1 = mySpawn.spawnCreep([MOVE]).object;
        creep1.target = flags[0];
    } else {
        creep1.moveTo(creep1.target);
        if(!creep2) {
            creep2 = mySpawn.spawnCreep([MOVE]).object;
            creep2.target = flags[1];
        } else {
            creep2.moveTo(creep2.target);
        }
    }
}
