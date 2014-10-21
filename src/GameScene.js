var GameScene = cc.Scene.extend({
    onEnter: function() {
        this._super();
        var BackgroundLayer = new BackgroundLayer();
        this.addChild(BackgroundLayer);
        var ControlLayer = new ControlLayer();
        this.addChild(ControlLayer);
    }
});


