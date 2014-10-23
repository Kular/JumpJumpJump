var ControlLayer = cc.Layer.extend({
    listener: null,
    startPoint: null,
    endPoint: null,
    
    ctor: function() {
        this._super();
        
        this.endPoint = cc.Sprite.create(res.point_png);
        this.addChild(this.endPoint);
        this.endPoint.setVisible(false);

        this.startPoint = cc.Sprite.create(res.point_png);
        this.addChild(this.startPoint);
        this.startPoint.setVisible(false);

        this.init();
    },

    init: function() {
        this._super();

        var start = this.startPoint;
        var end = this.endPoint;
        
        this.listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                var touchPos = touch.getLocation();
                start.setVisible(true);
                start.attr({
                    x: touchPos.x,
                    y: touchPos.y
                });
                end.setVisible(true);
                end.attr({
                    x: touchPos.x,
                    y: touchPos.y
                });
                return true;
            },
            onTouchMoved: function(touch, event) {
                var delta = touch.getDelta();
                end.x += delta.x;
                end.y += delta.y;
                return true;
            },
            onTouchEnded: function(touch, event) {
                return true;
            }
        });
        cc.eventManager.addListener(this.listener, this);

        return true;
    },
    
    onExit: function() {
        this._super();
    }

});
