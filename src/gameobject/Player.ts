class Player extends GameObject{

    public constructor() {
        super()
        this.init()
    }

    private _bird:egret.Bitmap
    private _jump:egret.Bitmap
    private _death:egret.Bitmap

    private _acc:number = 0

    private init() {
        this._bird = GameUtil.createBitmapFromSheetByName("bird0_0")
        this.addChild(this._bird)
        this._jump = GameUtil.createBitmapFromSheetByName("bird0_1")
        this._jump.visible = false
        this.addChild(this._jump)

        this._death = GameUtil.createBitmapFromSheetByName("bird0_2")
        this._death.visible = false
        this.addChild(this._death)
        let s = new egret.Sprite()
        s.graphics.beginFill(0x666666, 0.2)
        s.graphics.drawRect(0, 0, this.width, this.height)
        s.graphics.endFill()
        this.addChild(s)
    }

    public jump() {
        if (!GameData.isAlive) {
            return
        }
        this._acc = -GameData.jumpSpeed
        // this._jump.x = (this.width - this._jump.width) / 2
        // this._jump.y = this.height
        this._jump.visible = true
        egret.setTimeout(()=>{
            this._jump.visible = false
        }, this, 1000)
    }

    public death(isLanding:boolean=false) {
        console.log("death")
        GameData.isAlive = false
        if (!isLanding) {
            // this._death.x = (this.width - this._jump.width) / 2
            // this._death.y = - this._death.height
            // this._death.visible = true
            // egret.setTimeout(()=>{
            //     this._death.visible = false
            // }, this, 2000)
        }
    }

    update(timeStamp:number) {

        if (GameData.isAlive) {
            this.y += this._acc
            this._acc += GameData.gravity
            if (this.y + this._bird.height > GameData.landHeight) {
                this.death(true)
                SceneController.gameEnd()
            }
        }

    }

    //计算玩家高度时，只计算鸟本身
    get width() {
        return this._bird.width
    }

    get height() {
        return this._bird.height
    }
}