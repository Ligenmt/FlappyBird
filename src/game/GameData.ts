/**
 * Created by ligen on 2019/4/29.
 */
class GameData {
    static isPause:boolean = false
    static distance:number = 0
    static barrierCount:number = 0
    static eggCount:number = 0
    static isAlive:boolean = true
    static landWidth: number;
    static landHeight: number;
    static speed: number = 1;
    static jumpSpeed:number = 5
    static hasStart: boolean;
    static gravity: number = 0.1;

    static player:Player

    static elements:Array<any>
}