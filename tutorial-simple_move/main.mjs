import { getObjectsByPrototype } from 'game/utils';
import { Creep, Flag  } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';


export function loop() {
    // Your code goes here
    let creeps = getObjectsByPrototype(Creep);
    let flags = getObjectsByPrototype(Flag);
    if (( creeps.length < 1) || ( flags.length < 1)) {
        return
    }
    creeps[0].moveTo(flags[0]);
}
