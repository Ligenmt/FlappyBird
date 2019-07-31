
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        //创建场景
        this.createGameScene()
    }

    private async loadResource() {
        try {
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0);
        }
        catch (e) {
            console.error(e);
        }
    }

    private textfield: egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        let container:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        this.addChild(container)
        SceneController.instance.setStage(container)
        SceneController.initGame()
    }

}