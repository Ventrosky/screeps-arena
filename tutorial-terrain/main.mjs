import { getObjectsByPrototype } from 'game/utils';
import { Creep, Flag } from 'game/prototypes';
import { } from 'game/constants';
import { } from 'arena';

export function loop() {
    for (const creep of getObjectsByPrototype(Creep)){
        creep.moveTo(creep.findClosestByPath(getObjectsByPrototype(Flag)));
    }
}
