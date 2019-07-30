class GameScene extends egret.DisplayObjectContainer {

    public constructor() {
        super()
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.initView, this)
        this.touchEnabled = true
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickView, this)

    }

    UIContainer:egret.DisplayObjectContainer //UI层
    roleContainer:egret.DisplayObjectContainer //玩家层
    barrierContainer:egret.DisplayObjectContainer//障碍层
    mileageContainer:egret.DisplayObjectContainer//地面层
    startGameContainer:egret.DisplayObjectContainer//开始游戏层

    private initView() {

        this.touchEnabled = true
        let bg = GameUtil.createBitmapByName("bg_day");
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

        this.initStartGameContainer()
        this.initUIContainer()
        this.createPlayer()
        this.createLand()


    }

    //游戏准备层
    private initStartGameContainer() {
        //准备文字
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
        startText.stroke = 3
        startText.strokeColor = 0xffffff
        startText.x = (this.stage.stageWidth - startText.width) / 2
        startText.y = this.stage.stageHeight / 5 * 4
        this.startGameContainer.addChild(startText)
    }

    public initUIContainer() {
        let tip1:egret.TextField = new egret.TextField()
        tip1.text = "分数:"
        tip1.textColor = 0xffffff
        tip1.size = 60
        tip1.x = 50
        tip1.y = 20
        this.UIContainer.addChild(tip1)

        let barrierText = new egret.TextField()
        barrierText.size = 60
        barrierText.x = tip1.width + 20
        barrierText.y = 20
        this.UIContainer.addChild(barrierText)
        this.changeBarriersCount(0)

    }

    private land1
    private land2
    private land3

    //创建地面
    private createLand() {
        let land1 = GameUtil.createBitmapByName("land")
        this.land1 = land1
        land1.y = this.stage.stageHeight - land1.height
        this.mileageContainer.addChild(land1)

        let land2 = GameUtil.createBitmapByName("land")
        this.land2 = land2
        land2.y = this.stage.stageHeight - land2.height
        land2.x = land1.width
        this.mileageContainer.addChild(land2)

        let land3 = GameUtil.createBitmapByName("land")
        this.land3 = land3
        land3.y = this.stage.stageHeight - land3.height
        land3.x = land1.width + land2.width
        this.mileageContainer.addChild(land3)

        GameData.landWidth = land1.width
        GameData.landHeight = land1.y
        console.log("landHeight", GameData.landHeight)
        // egret.ticker.$startTick(this.update, this)
    }

    public startTicker() {
        egret.ticker.$startTick(this.update, this)
    }

    public stopTicker() {
        egret.ticker.$stopTick(this.update, this)
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

    private changeBarriersCount(number: number) {

    }

    private createPlayer() {
        GameData.player = new Player()
        GameData.player.x = 100
        GameData.player.y = this.stage.stageHeight / 2 - GameData.player.height
        this.roleContainer.addChild(GameData.player)
    }

    private onClickView() {
        console.log("onClickView")
        if (!GameData.hasStart && !GameData.isAlive) {
            console.log("onClickView startGameScene")
            SceneController.startGameScene();
            return
        }
        //第一次点击
        if (!GameData.hasStart) {
            console.log("onClickView startGame")
            SceneController.startGame()
            return
        }
        //点击跳跃
        if (GameData.isAlive) {
            GameData.player.jump()
        }
    }

    startGame() {
        console.log("点击了界面，准备开始游戏");
        this.startGameContainer.visible = false
        // egret.Tween.get(this.platformBird).to({}, 300).call(()=>{
        //     this.roleContainer.removeChild(this.platformBird)
        // })
    }

    pipeCreatorIndex = 0

    private update(timeStep:number):boolean {
        if (!GameData.hasStart) {
            return true
        }
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
        GameData.player.update(timeStep)

        this.pipeUpdate(timeStep)
        this.collisionDetect()
        return true
    }

    private pipeArray:Array<Pipe> = new Array<Pipe>()

    private pipeUpdate(timeStep) {
        this.pipeCreatorIndex += 1
        if (this.pipeCreatorIndex % 100 == 0) {
            let pipe = new Pipe()
            this.pipeArray.push(pipe)
            this.barrierContainer.addChild(pipe)
            this.pipeCreatorIndex = 0
            if (this.pipeArray.length >= 10) {
                this.pipeArray.shift()
            }
            console.log("pipe size", this.pipeArray.length)
        }
        for (let p of this.pipeArray) {
            p.update(timeStep)

        }

    }

    private collisionDetect() {

    }
}