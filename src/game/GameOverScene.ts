class GameOverScene extends egret.DisplayObjectContainer {

    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initScene, this);
    }

    private _gameOverText:egret.Bitmap

    public initScene() {
        this.touchEnabled = true
        this._gameOverText = GameUtil.createBitmapByName("text_game_over")
        this._gameOverText.x = (this.stage.stageWidth - this._gameOverText.width ) / 2
        this._gameOverText.y = this.stage.stageHeight / 5 * 1
        this.addChild(this._gameOverText)


        let menuButton = GameUtil.createBitmapByName("button_menu")
        menuButton.x = (this.stage.stageWidth - menuButton.width ) / 2
        menuButton.y = this.stage.stageHeight / 5 * 2
        menuButton.touchEnabled = true
        menuButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickMenu, this)
        this.addChild(menuButton)
        let okButton = GameUtil.createBitmapByName("button_ok")
        okButton.x = (this.stage.stageWidth - okButton.width ) / 2
        okButton.y = this.stage.stageHeight / 5 * 3
        okButton.touchEnabled = true
        okButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this)
        this.addChild(okButton)
    }

    public onClick() {
        console.log("restart")
        SceneController.startGameScene()
    }

    public onClickMenu() {
        console.log("onClickMenu")
        SceneController.initGame()
    }

}