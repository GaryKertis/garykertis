!function(a,b){"use strict";"function"==typeof define&&define.amd?define(b):"object"==typeof exports?module.exports=b():a.SAT=b()}(this,function(){"use strict";function b(a,b){this.x=a||0,this.y=b||0}function c(a,c){this.pos=a||new b,this.r=c||0}function d(a,c){this.pos=a||new b,this.angle=0,this.offset=new b,this.setPoints(c||[])}function e(a,c,d){this.pos=a||new b,this.w=c||0,this.h=d||0}function f(){this.a=null,this.b=null,this.overlapN=new b,this.overlapV=new b,this.clear()}function l(a,b,c){for(var d=Number.MAX_VALUE,e=-Number.MAX_VALUE,f=a.length,g=0;g<f;g++){var h=a[g].dot(b);h<d&&(d=h),h>e&&(e=h)}c[0]=d,c[1]=e}function m(a,b,c,d,e,f){var h=i.pop(),j=i.pop(),k=g.pop().copy(b).sub(a),m=k.dot(e);if(l(c,e,h),l(d,e,j),j[0]+=m,j[1]+=m,h[0]>j[1]||j[0]>h[1])return g.push(k),i.push(h),i.push(j),!0;if(f){var n=0;if(h[0]<j[0])if(f.aInB=!1,h[1]<j[1])n=h[1]-j[0],f.bInA=!1;else{var o=h[1]-j[0],p=j[1]-h[0];n=o<p?o:-p}else if(f.bInA=!1,h[1]>j[1])n=h[0]-j[1],f.aInB=!1;else{var o=h[1]-j[0],p=j[1]-h[0];n=o<p?o:-p}var q=Math.abs(n);q<f.overlap&&(f.overlap=q,f.overlapN.copy(e),n<0&&f.overlapN.reverse())}return g.push(k),i.push(h),i.push(j),!1}function n(a,b){var c=a.len2(),d=b.dot(a);return d<0?o:d>c?q:p}function r(a,b){var c=g.pop().copy(a).sub(b.pos),d=b.r*b.r,e=c.len2();return g.push(c),e<=d}function s(a,b){k.pos.copy(a),j.clear();var c=w(k,b,j);return c&&(c=j.aInB),c}function t(a,b,c){var d=g.pop().copy(b.pos).sub(a.pos),e=a.r+b.r,f=e*e,h=d.len2();if(h>f)return g.push(d),!1;if(c){var i=Math.sqrt(h);c.a=a,c.b=b,c.overlap=e-i,c.overlapN.copy(d.normalize()),c.overlapV.copy(d).scale(c.overlap),c.aInB=a.r<=b.r&&i<=b.r-a.r,c.bInA=b.r<=a.r&&i<=a.r-b.r}return g.push(d),!0}function u(a,b,c){for(var d=g.pop().copy(b.pos).sub(a.pos),e=b.r,f=e*e,h=a.calcPoints,i=h.length,j=g.pop(),k=g.pop(),l=0;l<i;l++){var m=l===i-1?0:l+1,p=0===l?i-1:l-1,r=0,s=null;j.copy(a.edges[l]),k.copy(d).sub(h[l]),c&&k.len2()>f&&(c.aInB=!1);var t=n(j,k);if(t===o){j.copy(a.edges[p]);var u=g.pop().copy(d).sub(h[p]);if(t=n(j,u),t===q){var v=k.len();if(v>e)return g.push(d),g.push(j),g.push(k),g.push(u),!1;c&&(c.bInA=!1,s=k.normalize(),r=e-v)}g.push(u)}else if(t===q){if(j.copy(a.edges[m]),k.copy(d).sub(h[m]),t=n(j,k),t===o){var v=k.len();if(v>e)return g.push(d),g.push(j),g.push(k),!1;c&&(c.bInA=!1,s=k.normalize(),r=e-v)}}else{var w=j.perp().normalize(),v=k.dot(w),x=Math.abs(v);if(v>0&&x>e)return g.push(d),g.push(w),g.push(k),!1;c&&(s=w,r=e-v,(v>=0||r<2*e)&&(c.bInA=!1))}s&&c&&Math.abs(r)<Math.abs(c.overlap)&&(c.overlap=r,c.overlapN.copy(s))}return c&&(c.a=a,c.b=b,c.overlapV.copy(c.overlapN).scale(c.overlap)),g.push(d),g.push(j),g.push(k),!0}function v(a,b,c){var d=u(b,a,c);if(d&&c){var e=c.a,f=c.aInB;c.overlapN.reverse(),c.overlapV.reverse(),c.a=c.b,c.b=e,c.aInB=c.bInA,c.bInA=f}return d}function w(a,b,c){for(var d=a.calcPoints,e=d.length,f=b.calcPoints,g=f.length,h=0;h<e;h++)if(m(a.pos,b.pos,d,f,a.normals[h],c))return!1;for(var h=0;h<g;h++)if(m(a.pos,b.pos,d,f,b.normals[h],c))return!1;return c&&(c.a=a,c.b=b,c.overlapV.copy(c.overlapN).scale(c.overlap)),!0}var a={};a.Vector=b,a.V=b,b.prototype.copy=b.prototype.copy=function(a){return this.x=a.x,this.y=a.y,this},b.prototype.clone=b.prototype.clone=function(){return new b(this.x,this.y)},b.prototype.perp=b.prototype.perp=function(){var a=this.x;return this.x=this.y,this.y=-a,this},b.prototype.rotate=b.prototype.rotate=function(a){var b=this.x,c=this.y;return this.x=b*Math.cos(a)-c*Math.sin(a),this.y=b*Math.sin(a)+c*Math.cos(a),this},b.prototype.reverse=b.prototype.reverse=function(){return this.x=-this.x,this.y=-this.y,this},b.prototype.normalize=b.prototype.normalize=function(){var a=this.len();return a>0&&(this.x=this.x/a,this.y=this.y/a),this},b.prototype.add=b.prototype.add=function(a){return this.x+=a.x,this.y+=a.y,this},b.prototype.sub=b.prototype.sub=function(a){return this.x-=a.x,this.y-=a.y,this},b.prototype.scale=b.prototype.scale=function(a,b){return this.x*=a,this.y*=b||a,this},b.prototype.project=b.prototype.project=function(a){var b=this.dot(a)/a.len2();return this.x=b*a.x,this.y=b*a.y,this},b.prototype.projectN=b.prototype.projectN=function(a){var b=this.dot(a);return this.x=b*a.x,this.y=b*a.y,this},b.prototype.reflect=b.prototype.reflect=function(a){var b=this.x,c=this.y;return this.project(a).scale(2),this.x-=b,this.y-=c,this},b.prototype.reflectN=b.prototype.reflectN=function(a){var b=this.x,c=this.y;return this.projectN(a).scale(2),this.x-=b,this.y-=c,this},b.prototype.dot=b.prototype.dot=function(a){return this.x*a.x+this.y*a.y},b.prototype.len2=b.prototype.len2=function(){return this.dot(this)},b.prototype.len=b.prototype.len=function(){return Math.sqrt(this.len2())},a.Circle=c,c.prototype.getAABB=c.prototype.getAABB=function(){var a=this.r,c=this.pos.clone().sub(new b(a,a));return new e(c,2*a,2*a).toPolygon()},a.Polygon=d,d.prototype.setPoints=d.prototype.setPoints=function(a){var c=!this.points||this.points.length!==a.length;if(c){var d,e=this.calcPoints=[],f=this.edges=[],g=this.normals=[];for(d=0;d<a.length;d++)e.push(new b),f.push(new b),g.push(new b)}return this.points=a,this._recalc(),this},d.prototype.setAngle=d.prototype.setAngle=function(a){return this.angle=a,this._recalc(),this},d.prototype.setOffset=d.prototype.setOffset=function(a){return this.offset=a,this._recalc(),this},d.prototype.rotate=d.prototype.rotate=function(a){for(var b=this.points,c=b.length,d=0;d<c;d++)b[d].rotate(a);return this._recalc(),this},d.prototype.translate=d.prototype.translate=function(a,b){for(var c=this.points,d=c.length,e=0;e<d;e++)c[e].x+=a,c[e].y+=b;return this._recalc(),this},d.prototype._recalc=function(){var h,a=this.calcPoints,b=this.edges,c=this.normals,d=this.points,e=this.offset,f=this.angle,g=d.length;for(h=0;h<g;h++){var i=a[h].copy(d[h]);i.x+=e.x,i.y+=e.y,0!==f&&i.rotate(f)}for(h=0;h<g;h++){var j=a[h],k=h<g-1?a[h+1]:a[0],l=b[h].copy(k).sub(j);c[h].copy(l).perp().normalize()}return this},d.prototype.getAABB=d.prototype.getAABB=function(){for(var a=this.calcPoints,c=a.length,d=a[0].x,f=a[0].y,g=a[0].x,h=a[0].y,i=1;i<c;i++){var j=a[i];j.x<d?d=j.x:j.x>g&&(g=j.x),j.y<f?f=j.y:j.y>h&&(h=j.y)}return new e(this.pos.clone().add(new b(d,f)),g-d,h-f).toPolygon()},a.Box=e,e.prototype.toPolygon=e.prototype.toPolygon=function(){var a=this.pos,c=this.w,e=this.h;return new d(new b(a.x,a.y),[new b,new b(c,0),new b(c,e),new b(0,e)])},a.Response=f,f.prototype.clear=f.prototype.clear=function(){return this.aInB=!0,this.bInA=!0,this.overlap=Number.MAX_VALUE,this};for(var g=[],h=0;h<10;h++)g.push(new b);for(var i=[],h=0;h<5;h++)i.push([]);var j=new f,k=new e(new b,1e-6,1e-6).toPolygon();a.isSeparatingAxis=m;var o=-1,p=0,q=1;return a.pointInCircle=r,a.pointInPolygon=s,a.testCircleCircle=t,a.testPolygonCircle=u,a.testCirclePolygon=v,a.testPolygonPolygon=w,a});