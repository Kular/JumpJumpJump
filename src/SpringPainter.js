var SpringPainter = cc.DrawNode.extend({
    lineColor: null,
    lineWidth: null,
    startPos: null,
    endPos: null,
    ctrlPos: null,
    vy: null,
    deltaY: null,
    springLength: null,
    myK: null,
    cnt: null,

    ctor: function() {
        this._super();
        this.init();
    },
    init: function() {
        this._super();
        return true;
    },

    initWithLineWidthColor: function(lineWidth, color) {
        this.lineWidth = lineWidth;
        this.lineColor = color;
        return true;
    },

    drawLineSegment: function() {
        this.clear();
        this.drawSegment(this.startPos, this.endPos, this.lineWidth, this.lineColor);
    },

    drawBezier: function() {
        this.clear();
        this.drawQuadBezier(this.startPos, this.ctrlPos, this.endPos, 50, this.lineWidth * 2, this.lineColor);
    },

    setStartPos: function(pos) {
        this.startPos = pos;
    },
    setEndPos: function(pos) {
        this.endPos = pos;
    },
    setCtrlPos: function(pos) {
        this.ctrlPos = pos;
    },

    playBounceAnimation: function(vy) {
        this.vy = vy;

        // reset member variables
        this.ctrlPos = cc.p(g_CollisionPoint.x, g_CollisionPoint.y);
        this.springLength = cc.pDistance(this.startPos, this.endPos);
        this.myK = GetK(this.springLength);
        this.deltaY = 0;
        this.cnt = NUM_BOUNCING;

        // play animation
        this.scheduleUpdate(); 
    },

    vibrate: function(dt) {

        // End the animation after the second time that the spring
        // passes the g_CollisionPoint.y
        if (this.cnt == 0 && this.ctrlPos.y < g_CollisionPoint.y) {
            this.unscheduleUpdate();
            this.clear();
            return true;
        }
        this.deltaY = g_CollisionPoint.y - this.ctrlPos.y;
        var forceSpring = this.myK * this.deltaY;
        var acceleration = forceSpring / PLAYER_MASS;
        if (this.ctrlPos.y < g_CollisionPoint.y && this.cnt > 0) {
            acceleration += GRAVITY_ACCELERATION;
        }
        
        // after player's leaving the spring, acceleration is doubled
        if (this.ctrlPos.y > g_CollisionPoint.y) {
            acceleration *= 2;
        }

        this.ctrlPos.y += 0.5 * acceleration * dt * dt + this.vy * dt;
        var lastVY = this.vy;
        this.vy += acceleration * dt;
        if (lastVY * this.vy < 0) {
            this.cnt--;
            this.myK += 1500;
        }

        // to fix the visual bux when ctrlPos share the line with startPos and endPos
        if (Math.abs(this.ctrlPos.y - g_CollisionPoint.y) > 15) {
            this.drawBezier();
        } else {
            this.drawLineSegment();
        }
    },

    update: function(dt) {
        this.vibrate(dt);
    }
    
});




