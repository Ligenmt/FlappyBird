class Pipe extends GameObject {

    public pipeUp:egret.Bitmap

    public pipeDown:egret.Bitmap

    public scored:boolean = false

    public constructor() {
        super();
        this.pipeUp = GameUtil.createBitmapByName("pipe_up_2x_png")
        this.pipeDown = GameUtil.createBitmapByName("pipe_down_2x_png")
        this.pipeUp.x = egret.MainContext.instance.stage.stageWidth
        this.pipeUp.anchorOffsetY = this.pipeUp.height
        let ranOffset = Math.random() * 350
        this.pipeUp.y = GameData.landHeight + ranOffset
        this.addChild(this.pipeUp)
        console.log("pipeUp Y", this.pipeUp.y)

        this.pipeDown.x = egret.MainContext.instance.stage.stageWidth
        this.pipeDown.anchorOffsetY = this.pipeDown.height
        this.pipeDown.y = GameData.landHeight - this.pipeUp.height + ranOffset - 150
        // console.log(this.pipeUp.height)
        this.addChild(this.pipeDown)
    }

    public update(timeStep) {
        this.pipeUp.x -= GameData.speed
        this.pipeDown.x -= GameData.speed
        // console.log(this.stage.width, this.x)
    }
}