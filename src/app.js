var MenuLayer = cc.Layer.extend({
    backgroundImg:null,

    ctor:function () {

        this._super();

        var windowSize = cc.winSize;

        var startBtn = new cc.MenuItemImage(
            res.point_png,
            res.point_png,
            function () {
                cc.director.runScene(new GameScene());
            }, this
        );

        startBtn.attr({
            x: windowSize.width / 2,
            y: windowSize.height / 2,
        });

        var menu = new cc.Menu(startBtn);
        menu.x = 0;
        menu.y = 0;
        this.addChild(menu, 1);


        this.backgroundImg = new cc.Sprite(res.bg_png);
        this.backgroundImg.attr({
            x: windowSize.width / 2,
            y: windowSize.height / 2,
        });
        this.addChild(this.backgroundImg, 0);

        return true;
    }
});

var MenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var menuLayer = new MenuLayer();
        this.addChild(menuLayer);
    }
});

