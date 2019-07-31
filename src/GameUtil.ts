/**
 * Created by ligen on 2019/4/29.
 */

class GameUtil {


    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    public static createBitmapFromSheetByName(name: string) {
        let result = new egret.Bitmap();
        let res:egret.SpriteSheet = RES.getRes("flappybirdres_json")
        let texture: egret.Texture = res.getTexture(name);
        result.texture = texture;
        return result;
    }

    public static createBitmapByName(name:string) {
        let result = new egret.Bitmap();
        let t:egret.Texture = RES.getRes(name)
        result.texture = t
        return result
    }

}