import { prototypes, utils, constants } from 'game';

export function loop() {
    const tower = utils.getObjectsByPrototype(prototypes.StructureTower)[0];
    const creep = utils.getObjectsByPrototype(prototypes.Creep).find(c => c.my);
    const target = utils.getObjectsByPrototype(prototypes.Creep).find(c => !c.my);
    const container = utils.getObjectsByPrototype(prototypes.StructureContainer)[0];

    if (container.store.getUsedCapacity() != 0 && creep.store[constants.RESOURCE_ENERGY] < creep.store.getCapacity()) {
        if (creep.withdraw(container, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
            creep.moveTo(container);
        }
    } else {
        if (creep.transfer(tower, constants.RESOURCE_ENERGY) == constants.ERR_NOT_IN_RANGE) {
            creep.moveTo(tower);
        }
    }

    tower.attack(target);
}
