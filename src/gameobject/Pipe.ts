class Pipe extends GameObject {

    public pipeUp:egret.Bitmap

    public pipeDown:egret.Bitmap

    public scored:boolean = false

    public constructor() {
        super();
        // this.pipeUp = GameUtil.createBitmapFromSheetByName("pipe_up")
        this.pipeUp = GameUtil.createBitmapByName("pipe_up_2x_png")
        this.pipeDown = GameUtil.createBitmapByName("pipe_down_2x_png")
        this.pipeUp.x = egret.MainContext.instance.stage.stageWidth
        this.pipeUp.anchorOffsetY = this.pipeUp.height

        let ranOffset = Math.random() * 450
        this.pipeUp.y = GameData.landHeight + ranOffset
        console.log(this.pipeUp.y)
        this.addChild(this.pipeUp)

        this.pipeDown.x = egret.MainContext.instance.stage.stageWidth
        this.pipeDown.anchorOffsetY = this.pipeDown.height
        this.pipeDown.y = GameData.landHeight - this.pipeUp.height + ranOffset - 150
        console.log(this.pipeUp.height)
        this.addChild(this.pipeDown)
    }

    public update(timeStep) {
        this.pipeUp.x -= GameData.speed
        this.pipeDown.x -= GameData.speed
        // console.log(this.stage.width, this.x)
    }
}