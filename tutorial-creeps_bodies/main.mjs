import { getObjectsByPrototype } from 'game/utils';
import { Creep } from 'game/prototypes';
import { ERR_NOT_IN_RANGE, ATTACK, RANGED_ATTACK, HEAL } from 'game/constants';
import { } from 'arena';

export function loop() {
    let allCreeps  = getObjectsByPrototype(Creep);

    let myCreep = allCreeps.filter(creep => creep.my);
    let enemyCreep = allCreeps.find(creep => !creep.my);

    for (let creep of myCreep){
        if(creep.body.some(bodyPart => bodyPart.type == ATTACK)) {
            // this creep has ATTACK body parts
            if(creep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemyCreep);
            }
        } 
        if (creep.body.some(bodyPart => bodyPart.type == HEAL)) {
            let weakest;
            for (let c of myCreep){
                if (weakest == undefined || c.hits < weakest.hits){
                    weakest = c
                }
            }

            if(creep.heal(weakest) == ERR_NOT_IN_RANGE) {
                creep.moveTo(weakest);
            }
        } 
        if (creep.body.some(bodyPart => bodyPart.type == RANGED_ATTACK)) {
            if(creep.rangedAttack(enemyCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemyCreep);
            }
        }
    }
}
