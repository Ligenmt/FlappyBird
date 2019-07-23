class GameScene extends egret.DisplayObjectContainer {

    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this);
    }

    UIContainer:egret.DisplayObjectContainer
    roleContainer:egret.DisplayObjectContainer
    barrierContainer:egret.DisplayObjectContainer
    mileageContainer:egret.DisplayObjectContainer
    startGameContainer:egret.DisplayObjectContainer

    private initView() {
        let bg = GameUtil.createBitmapByName("bg_png");
        this.addChild(bg);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        bg.width = stageW;
        bg.height = stageH;

        this.UIContainer = new egret.DisplayObjectContainer()
        this.roleContainer = new egret.DisplayObjectContainer()
        this.barrierContainer = new egret.DisplayObjectContainer()
        this.mileageContainer = new egret.DisplayObjectContainer()
        this.startGameContainer = new egret.DisplayObjectContainer()

        this.addChild(this.barrierContainer)
        this.addChild(this.mileageContainer)
        this.addChild(this.roleContainer)
        this.addChild(this.UIContainer)
        this.addChild(this.startGameContainer)

        this.createLand()
    }

    private initStartGameContainer() {
        let readyText:egret.TextField = new egret.TextField()
        readyText.text = "准备"
        readyText.size = 100
        readyText.textColor = 0xFFA500
        readyText.stroke = 5

        readyText.x = (this.stage.stageWidth - readyText.width)/2
        readyText.y = this.stage.stageHeight / 5
        this.startGameContainer.addChild(readyText)

        //小手
        // let hand:egret.Bitmap = GameUtil.createBitmapByName("")

        //点击开始游戏
        let startText:egret.TextField = new egret.TextField()
        startText.text = "点击开始游戏"
        startText.size = 80
        startText.textColor = 0x000000
    }

    private land1
    private land2
    private land3

    //创建地面
    private createLand() {
        let land1 = GameUtil.createBitmapByName("land_png")
        this.land1 = land1
        land1.y = this.stage.stageHeight - land1.height + 20
        this.mileageContainer.addChild(land1)

        let land2 = GameUtil.createBitmapByName("land_png")
        this.land2 = land2
        land2.y = this.stage.stageHeight - land2.height + 20
        land2.x = land1.width
        this.mileageContainer.addChild(land2)

        let land3 = GameUtil.createBitmapByName("land_png")
        this.land3 = land3
        land3.y = this.stage.stageHeight - land3.height + 20
        land3.x = land1.width + land2.width
        this.mileageContainer.addChild(land3)

        GameData.landWidth = land1.width
        GameData.landHeight = land1.y

        egret.ticker.$startTick(this.update, this)
    }

    private update(timeStep:number):boolean {

        // if (!GameData.hasStart) {
        //     return true
        // }
        //地面滚动
        if (this.land1.x + this.land1.width <= 0) {
            this.land1.x = this.land2.x + this.land2.width * 2
        }
        if (this.land2.x + this.land2.width <= 0) {
            this.land2.x = this.land3.x + this.land3.width * 2
        }
        if (this.land3.x + this.land3.width <= 0) {
            this.land3.x = this.land1.x + this.land1.width * 2
        }
        this.land1.x -= GameData.speed
        this.land2.x -= GameData.speed
        this.land3.x -= GameData.speed
        GameData.distance += GameData.speed
        return true
    }

    static pauseGame() {
        if (GameData.isPause) {
            egret.ticker.resume()
            GameData.isPause = false
        } else {
            egret.ticker.pause()
            GameData.isPause = true
        }
    }

}