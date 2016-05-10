require=function t(o,e,r){function n(h,c){if(!e[h]){if(!o[h]){var s="function"==typeof require&&require;if(!c&&s)return s(h,!0);if(i)return i(h,!0);var a=new Error("Cannot find module '"+h+"'");throw a.code="MODULE_NOT_FOUND",a}var u=e[h]={exports:{}};o[h][0].call(u.exports,function(t){var e=o[h][1][t];return n(e?e:t)},u,u.exports,t,o,e,r)}return e[h].exports}for(var i="function"==typeof require&&require,h=0;h<r.length;h++)n(r[h]);return n}({AStar:[function(t,o,e){"use strict";function r(t,o){return new c(t,o)}function n(t,o){for(var e=0,r=0;r<t.length;r++){var n=t[r].G+t[r].getH(o),i=t[e].G+t[e].getH(o);i>=n&&(e=r)}return e}function i(t,o){for(var e=0;e<t.length;e++)if(o.isEqual(t[e]))return e;return-1}function h(t,o,e){t.G=0;for(var h=[t],c=[];h.length>0;){var s=n(h,o),a=h[s];if(h.splice(s,1),c.push(a),o.isEqual(a)){for(var u=[a];a.parent;)u.unshift(a.parent),a=a.parent;return u}for(var f=a.getNeighbors(),p=0;p<f.length;p++){var l=f[p];if(e(l)&&!(i(c,l)>=0)){l.G=a.G+l.getG(a),l.parent=a;var d=i(h,l);if(d>=0)l.G<h[d].G&&(h[d].G=l.G,h[d].parent=a);else{if(l.getG(a)>1&&!e(r(l.r,a.c))&&!e(r(a.r,l.c)))continue;h.push(l)}}}}}cc._RFpush(o,"12ea8rLR19JoZjtDkt63E+v","AStar");var c=t("pos");o.exports=h,cc._RFpop()},{pos:"pos"}],game:[function(t,o,e){"use strict";cc._RFpush(o,"90ed8OJwjFFNaDwdnT9/3r0","game"),cc.Class({"extends":cc.Component,properties:{mainNode:cc.Node,girdContainer:cc.Node,wallPre:cc.Prefab,roadPre:cc.Prefab,hero:cc.Node,target:cc.Node,rowNum:15,colNum:10,arrIsWall:[cc.Boolean]},onLoad:function(){for(var t=this.mainNode.width/this.colNum,o=this.mainNode.height/this.rowNum,e=0;e<this.rowNum;e++)for(var n=0;n<this.colNum;n++){var i;Math.random()*this.rowNum*this.colNum<r?(i=cc.instantiate(this.wallPre),this.arrIsWall.push(!0)):(i=cc.instantiate(this.roadPre),this.arrIsWall.push(!1)),this.girdContainer.addChild(i),i.setPosition(cc.p(t*n,o*e))}var h,c;do h=Math.floor(Math.random()*this.rowNum),c=Math.floor(Math.random()*this.colNum);while(this.isWallHere(h,c));this.hero.setPosition(cc.p(t*c,o*h)),this.hero.getComponent("hero").game=this;var s;do{do h=Math.floor(Math.random()*this.rowNum),c=Math.floor(Math.random()*this.colNum);while(this.isWallHere(h,c));this.target.setPosition(cc.p(t*c,o*h)),s=this.hero.getComponent("hero").canReach(this.target.getPosition())}while(!s);this.onTouchEvent()},isWallHere:function(t,o){return this.arrIsWall[t*this.colNum+o]},onTouchStart:function(t,o){},onTouchMove:function(t,o){},onTouchEnd:function(t,o){var e=t.touch.getLocation(),r=this.getComponent("game").mainNode.convertToNodeSpace(e);this.getComponent("game").hero.getComponent("hero")["goto"](r)},onTouchCancel:function(t,o){},onTouchEvent:function(){this.node.on("touchstart",this.onTouchStart,this.node),this.node.on("touchmove",this.onTouchMove,this.node),this.node.on("touchend",this.onTouchEnd,this.node),this.node.on("touchcancel",this.onTouchCancel,this.node)},offAllTouchEvent:function(){this.node.off("touchstart",this.onTouchStart,this.node),this.node.off("touchmove",this.onTouchMove,this.node),this.node.off("touchend",this.onTouchEnd,this.node),this.node.off("touchcancel",this.onTouchCancel,this.node)},update:function(t){var o=cc.rectIntersectsRect(this.hero.getBoundingBox(),this.target.getBoundingBox());o&&(r+=3,r>this.rowNum*this.colNum/2&&(r=10),cc.director.loadScene("game"))}});var r=10;cc._RFpop()},{}],hero:[function(t,o,e){"use strict";cc._RFpush(o,"b7b5865CnFGbpcAxd9w3KTO","hero"),cc.Class({"extends":cc.Component,properties:{game:cc.Component},onLoad:function(){},getGirdPos:function(o){var e=this.game.mainNode.width/this.game.colNum,r=this.game.mainNode.height/this.game.rowNum,n=Math.floor(o.y/r),i=Math.floor(o.x/e),h=t("pos");return new h(n,i)},getCCPos:function(t){var o=this.game.mainNode.width/this.game.colNum,e=this.game.mainNode.height/this.game.rowNum,r=Math.floor(t.c*e),n=Math.floor(t.r*o);return cc.p(r,n)},"goto":function(o){function e(){if(c.length>0){var t=c.shift(),o=s.getCCPos(t);s.node.runAction(cc.sequence(cc.moveTo(.25,o),cc.callFunc(e)))}}this.node.stopAllActions();var r=this.getGirdPos(o),n=this.getGirdPos(cc.p(this.node.x+10,this.node.y+10)),i=t("AStar"),h=this.game,c=i(n,r,function(t){return t.r<0||t.c<0||t.r>=h.rowNum||t.c>=h.colNum?!1:h.isWallHere(t.r,t.c)?!1:!0});console.log(c);var s=this;e()},canReach:function(o){var e=this.getGirdPos(o),r=this.getGirdPos(cc.p(this.node.x+10,this.node.y+10)),n=t("AStar"),i=this.game,h=n(r,e,function(t){return t.r<0||t.c<0||t.r>=i.rowNum||t.c>=i.colNum?!1:i.isWallHere(t.r,t.c)?!1:!0});return h}}),cc._RFpop()},{AStar:"AStar",pos:"pos"}],pos:[function(t,o,e){"use strict";cc._RFpush(o,"9f7c9dxaXFPrYT5Laz/uutB","pos");var r=function(t,o){this.r=t,this.c=o};r.prototype.left=function(){return new r(this.r,this.c-1)},r.prototype.right=function(){return new r(this.r,this.c+1)},r.prototype.top=function(){return new r(this.r-1,this.c)},r.prototype.bottom=function(){return new r(this.r+1,this.c)},r.prototype.leftTop=function(){return new r(this.r-1,this.c-1)},r.prototype.leftBottom=function(){return new r(this.r+1,this.c-1)},r.prototype.rightTop=function(){return new r(this.r-1,this.c+1)},r.prototype.rightBottom=function(){return new r(this.r+1,this.c+1)},r.prototype.getNeighbors=function(){return[this.left(),this.right(),this.top(),this.bottom(),this.leftTop(),this.leftBottom(),this.rightTop(),this.rightBottom()]},r.prototype.getG=function(t){var o=Math.abs(this.r-t.r),e=Math.abs(this.c-t.c),r=Math.sqrt(o*o+e*e),r=Math.round(10*r)/10;return r},r.prototype.getH=function(t){var o=Math.abs(this.r-t.r),e=Math.abs(this.c-t.c);return o+e},r.prototype.isEqual=function(t){return this.r===t.r&&this.c===t.c},r.prototype.toString=function(t){return this.r+", "+this.c},o.exports=r,cc._RFpop()},{}]},{},["AStar","game","pos","hero"]);
//# sourceMappingURL=project.js.map