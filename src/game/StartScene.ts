/**
 * 游戏开始场景
 */
class StartScene extends egret.DisplayObjectContainer {

    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }

    private initView() {
        //背景
        let background = GameUtil.createBitmapByName("bg_day");
        this.addChild(background);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        background.width = stageW;
        background.height = stageH;

        //开始按钮
        let startBtn = GameUtil.createBitmapByName("button_play");
        this.addChild(startBtn);
        startBtn.x = (this.stage.stageWidth-startBtn.width)/2;
        startBtn.y = (this.stage.stageHeight-startBtn.height)/2;
        startBtn.touchEnabled = true
        startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this)
    }

    private startGame() {
        SceneController.startGameScene()
    }
}