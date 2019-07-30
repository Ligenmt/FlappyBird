class Pipe extends GameObject {

    public pipeUp:egret.Bitmap

    public pipeDown:egret.Bitmap


    public constructor() {
        super();
        this.pipeUp = GameUtil.createBitmapByName("pipe_up")
        this.pipeDown = GameUtil.createBitmapByName("pipe_down")
        this.pipeUp.x = egret.MainContext.instance.stage.stageWidth
        this.pipeUp.anchorOffsetY = this.pipeUp.height
        this.pipeUp.y = GameData.landHeight
        // this.pipeUp.scaleX = 2
        // this.pipeUp.scaleY = 2
        console.log(this.pipeUp.y)
        this.addChild(this.pipeUp)

        this.pipeDown.x = egret.MainContext.instance.stage.stageWidth
        this.pipeDown.anchorOffsetY = this.pipeDown.height
        this.pipeDown.y = GameData.landHeight - this.pipeUp.height - 150
        console.log(this.pipeUp.height)
        // this.pipeDown.scaleX = 2
        // this.pipeDown.scaleY = 2
        this.addChild(this.pipeDown)
    }

    public update(timeStep) {
        this.x -= GameData.speed
    }
}