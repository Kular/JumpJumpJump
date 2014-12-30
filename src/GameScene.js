var GameScene = cc.Scene.extend({
	space: null,

    onEnter: function() {
        this._super();
        this.space = new cp.Space();
        this.initSpace(this.space);
        this.space.addCollisionHandler(g_CollisionType.Player, g_CollisionType.Spring, OnPlayerLandedOnSpring);
        var backgroundLayer = new BackgroundLayer();
        this.addChild(backgroundLayer);
        var controlLayer = new ControlLayer(this.space);
        this.addChild(controlLayer);
        this.scheduleUpdate();
    },

    initSpace: function(space) {
    	var size = cc.winSize;
        var walls = [
	        // top is not necessary
            // new cp.SegmentShape(space.staticBody, cp.v(0, size.height), cp.v(size.width, size.height), 0),
            // bottom is not necessary
            // new cp.SegmentShape(space.staticBody, cp.v(0, 0), cp.v(size.width, 0), 0),
            
            // left
            new cp.SegmentShape(space.staticBody, cp.v(0, 0), cp.v(0, size.height), 0),
            // right
            new cp.SegmentShape(space.staticBody, cp.v(size.width, 0), cp.v(size.width, size.height), 0)
        ];
        for (var i = 0; i < walls.length; i++) {
            var shape = walls[i];
            shape.setElasticity(1);
            shape.setFriction(1);
            space.addStaticShape(shape);
        }
        space.gravity = cp.v(0, GRAVITY_ACCELERATION);

    },

    update: function(dt) {
    	this.space && this.space.step(dt);
    }
});

/// OnCollisionEnter function
function OnPlayerLandedOnSpring(arbiter, space) {
	var shapes = arbiter.getShapes();
    var ctA = shapes[0].collision_type;
    var ctB = shapes[1].collision_type;
    var knownShapes = (ctA == g_CollisionType.Player) ? [shapes[1], shapes[0]] : [shapes[0], shapes[1]];

    var playerBody = knownShapes[1].getBody();
    
    g_CollisionPoint = arbiter.getPoint(0);
    var localPos = playerBody.world2Local(g_CollisionPoint);
    console.log("Collision pos: (" + g_CollisionPoint.x + ", " + g_CollisionPoint.y + "), localPos: (" + localPos.x + ", " + localPos.y + ")");
    if (localPos.y > 0 || playerBody.vy >= 0) {
        console.log("hit head or rising status, won't applyForce");
        return false;
    }

    //
    playerBody.applyImpulse(cp.v(0, 300), cp.v(0, 0));
    space.addPostStepCallback(function() {
        space.removeShape(knownShapes[0]);
        knownShapes[0] = null;
    });

    return false;
}

