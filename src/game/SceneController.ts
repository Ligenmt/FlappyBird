/**
 * 场景控制器
 * Created by ligen on 2019/4/29.
 */
class SceneController {

    static sceneController:SceneController

    private _stage:egret.DisplayObjectContainer

    private startScene:StartScene
    private gameScene:GameScene
    private gameOverScene:GameOverScene

    public constructor() {
        this.startScene = new StartScene()
        this.gameScene = new GameScene()
        this.gameOverScene = new GameOverScene()
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
        if( this.instance.gameScene.parent){
            stage.removeChild( this.instance.gameScene );
            this.instance.gameScene = new GameScene();
        }
        if (this.instance.gameOverScene.parent) {
            stage.removeChild(this.instance.gameOverScene)
            this.instance.gameOverScene = new GameOverScene()
        }

        stage.addChild(this.instance.startScene)
    }

    static startGameScene() {
        let stage = this.instance._stage
        //移除开始场景
        if (this.instance.startScene.parent) {
            stage.removeChild(this.instance.startScene)
            this.instance.startScene = new StartScene()
        }
        if( this.instance.gameScene.parent){
            stage.removeChild( this.instance.gameScene );
            this.instance.gameScene = new GameScene();
        }
        if (this.instance.gameOverScene.parent) {
            stage.removeChild(this.instance.gameOverScene)
            this.instance.gameOverScene = new GameOverScene()
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
        GameData.hasStart = false;
        this.instance.gameScene.stopTicker();
        this.instance._stage.addChild(this.instance.gameOverScene)
    }
}