var ControlLayer = cc.Layer.extend({
    space: null,
    startPoint: null,
    endPoint: null,
    springShape: null,
    cpDebugNode: null,
    
    ctor: function(space) {
        this._super();
        
        this.space = space;

        g_SpringPainter = new SpringPainter();
        g_SpringPainter.initWithLineWidthColor(3, cc.color(0, 200, 0, 255));
        this.addChild(g_SpringPainter);

        this.endPoint = cc.Sprite.create(res.point_png);
        this.endPoint.setVisible(false);
        this.addChild(this.endPoint);

        this.startPoint = cc.Sprite.create(res.point_png);
        this.startPoint.setVisible(false);
        this.addChild(this.startPoint);

        this.init();
    },

    init: function() {
        this._super();

        var self = this;

        // Enable debug node to show shape's frames
        this.cpDebugNode = cc.PhysicsDebugNode.create(this.space);
        this.cpDebugNode.setVisible(true);
        this.addChild(this.cpDebugNode);

        var touchListener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event) {
                var touchPos = touch.getLocation();
                // startPoint, endPoint
                self.startPoint.setVisible(true);
                self.startPoint.attr({
                    x: touchPos.x,
                    y: touchPos.y
                });
                self.endPoint.setVisible(true);
                self.endPoint.attr({
                    x: touchPos.x,
                    y: touchPos.y
                });

                // spring shape
                if (self.springShape != null && self.space.containsShape(self.springShape)) {
                    self.space.removeShape(self.springShape);
                    self.springShape = null;
                }

                // spring painter
                g_SpringPainter.clear();
                g_SpringPainter.setStartPos(self.startPoint);
                return true;
            },
            onTouchMoved: function(touch, event) {
                var delta = touch.getDelta();
                self.endPoint.x += delta.x;
                self.endPoint.y += delta.y;

                // spring painter
                g_SpringPainter.setEndPos(self.endPoint);
                g_SpringPainter.drawLineSegment();
                return true;
            },
            onTouchEnded: function(touch, event) {
                // spring shape
                self.createSpringShape(self.startPoint, self.endPoint);

                // spring painter
                g_CollisionPoint = cc.p((g_SpringPainter.startPos.x + g_SpringPainter.endPos.x) / 2, (g_SpringPainter.startPos.y + g_SpringPainter.endPos.y) / 2 - 10);
                g_SpringPainter.playBounceAnimation(-1000);
                return true;
            }
        });

        cc.eventManager.addListener(touchListener, this);

        return true;
    },

    createSpringShape: function(startPos, endPos) {
        this.springShape = new cp.SegmentShape(this.space.staticBody, startPos, endPos, 0);
        this.springShape.setCollisionType(g_CollisionType.Spring);
        this.space.addShape(this.springShape);
    },
    
    onExit: function() {
        this._super();
    }

});
