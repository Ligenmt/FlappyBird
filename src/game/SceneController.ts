/**
 * 场景控制器
 * Created by ligen on 2019/4/29.
 */
class SceneController {

    static sceneController:SceneController

    private _stage:egret.DisplayObjectContainer

    private startScene:StartScene
    private gameScene:GameScene
    private overScene

    public constructor() {
        this.startScene = new StartScene()
        this.gameScene = new GameScene()
    }

    static get instance() {
        if (!this.sceneController) {
            this.sceneController = new SceneController()
        }
        return this.sceneController
    }

    public setStage(stage:egret.DisplayObjectContainer) {
        //将Main设置为stage
        this._stage = stage
    }

    static initGame() {
        let stage = this.instance._stage
        //todo ...

        stage.addChild(this.instance.startScene)
    }

    static startGameScene() {
        let stage = this.instance._stage
        //移除开始场景
        if (this.instance.startScene.parent) {
            stage.removeChild(this.instance.startScene)
            this.instance.startScene = new StartScene()
        }

        //数据初始化
        GameData.distance = 0
        GameData.barrierCount = 0
        GameData.eggCount = 0
        GameData.isAlive = true
        this.loadLevelData()
        //障碍物的位置
        // GameData.elements = GameData.elements.concat()

        stage.addChild(this.instance.gameScene)
    }

    private static loadLevelData() {
        // let levelData = RES.getRes("config_json")
        // GameData.elements = levelData.elements
    }

    //游戏开始
    public static startGame() {
        GameData.hasStart = true
        this.instance.gameScene.startGame()
        //定时器开始
        this.instance.gameScene.startTicker()
    }

    static gameEnd() {

    }
}