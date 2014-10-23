var GameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var backgroundLayer = new BackgroundLayer();
        this.addChild(backgroundLayer);
        var controlLayer = new ControlLayer();
        this.addChild(controlLayer);
    }
});


