(function(t){function e(e){for(var r,o,s=e[0],u=e[1],l=e[2],f=0,h=[];f<s.length;f++)o=s[f],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&h.push(i[o][0]),i[o]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);c&&c(e);while(h.length)h.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,s=1;s<n.length;s++){var u=n[s];0!==i[u]&&(r=!1)}r&&(a.splice(e--,1),t=o(o.s=n[0]))}return t}var r={},i={app:0},a=[];function o(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=r,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="/vue-game-of-life/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],u=s.push.bind(s);s.push=e,s=s.slice();for(var l=0;l<s.length;l++)e(s[l]);var c=u;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("85ec"),i=n.n(r);i.a},3572:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("Game")],1)},a=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"game"}},[n("h1",[t._v("Game of Life")]),n("div",{staticClass:"game__instructions"},[t._m(0),n("div",{staticClass:"game__instructions--right"},[n("p",[t._v("Enter a number here to resize the board:")]),n("input",{directives:[{name:"model",rawName:"v-model",value:t.dimensions,expression:"dimensions"}],attrs:{id:"dimensions",type:"text",name:"dimensions",value:""},domProps:{value:t.dimensions},on:{input:function(e){e.target.composing||(t.dimensions=e.target.value)}}}),n("button",{attrs:{type:"button",name:"button"},on:{click:t.resizeGrid}},[t._v("Go")]),n("button",{staticClass:"d-block game__setup-button",attrs:{type:"button",name:"button"},on:{click:t.seedLife}},[t._v("Randomly seed life")]),n("button",{staticClass:"d-block game__setup-button",attrs:{type:"button"},on:{click:t.resizeGrid}},[t._v(" Remove all life from the game")])])]),t.searchForAnyLife?t._e():n("div",[n("p",{staticClass:"danger-text"},[t._v("There are no living cells! Add some following the instructions above")])]),t.searchForAnyLife?n("div",[n("button",{staticClass:"d-block game__turn-button highlight",attrs:{type:"button"},on:{click:t.takeTurn}},[t._v(" Take a turn")])]):t._e(),n("div",{staticClass:"board"},t._l(t.currentState,(function(e,r){return n("div",{key:r,staticClass:"board__row"},t._l(e,(function(e,i){return n("div",{key:i,staticClass:"board__cell",class:{alive:e.alive},on:{click:function(e){return t.changeCellStatus(i,r)}}})})),0)})),0)])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"game__instructions--left"},[n("p",[t._v("This is an implementation of "),n("a",{attrs:{href:"https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"}},[t._v("Conway's Game of Life")])]),n("ul",{staticClass:"game__instructions-list"},[n("li",[t._v("Alive cells are black, dead cells are white.")]),n("li",[t._v("Before playing, you can click on a cell you can toggle it be alive/dead")]),n("li",[t._v("Use the controls to the right to help set up the game")])]),n("small",[t._v("TIP: after clicking 'Take a turn' once, press the space key to take more turns")])])}],u=(n("4160"),n("159b"),{name:"GameOfLife",data:function(){return{currentState:[],futureState:[],turns:0,dimensions:20}},computed:{largestYCoordinate:function(){return this.currentState.length-1},largestXCoordinate:function(){return this.currentState[0].length-1},searchForAnyLife:function(){var t=!1;return this.currentState.forEach((function(e){e.forEach((function(e){t=!!e.alive||t}))})),t}},created:function(){this.resizeGrid(),console.log("GameOfLife component is loaded")},methods:{resizeGrid:function(){this.dimensions<1&&(this.dimensions=1),this.currentState=[];for(var t=0;t<this.dimensions;t++){this.currentState.push([]);for(var e=0;e<this.dimensions;e++)this.currentState[t].push({alive:!1})}this.resetFutureState()},seedLife:function(){for(var t=0;t<this.currentState.length;t++)for(var e=0;e<this.currentState[t].length;e++){var n=Math.random()>.5;this.$set(this.currentState[t][e],"alive",n)}},changeCellStatus:function(t,e){var n=this.currentState[e][t];n.alive=!n.alive},resetFutureState:function(){this.futureState=[];for(var t=0;t<=this.largestYCoordinate;t++)this.futureState[t]=[]},takeTurn:function(){var t=this;this.currentState.forEach((function(e,n){e.forEach((function(e,r){if(e.alive){var i=t.shouldCellDie(r,n)?{alive:!1}:{alive:!0};t.futureState[n].push(i)}else{var a=t.shouldCellBecomeAlive(r,n)?{alive:!0}:{alive:!1};t.futureState[n].push(a)}}))})),this.currentState=this.futureState,this.turns+=1,this.resetFutureState()},shouldCellDie:function(t,e){var n=this.numberOfLivingNeighbours(t,e);return n<2||n>3},shouldCellBecomeAlive:function(t,e){var n=this.numberOfLivingNeighbours(t,e);return 3===n},numberOfLivingNeighbours:function(t,e){var n=this,r=[[1,1],[1,0],[0,1],[-1,1]],i=0;return r.forEach((function(r){var a=t+r[0],o=e+r[1];o>=0&&a>=0&&o<=n.largestYCoordinate&&a<=n.largestXCoordinate&&n.currentState[o][a].alive&&(i+=1),a=t-r[0],o=e-r[1],o>=0&&a>=0&&o<=n.largestYCoordinate&&a<=n.largestXCoordinate&&n.currentState[o][a].alive&&(i+=1)})),i},isCellAlive:function(t,e){return this.currentState[e][t].alive}}}),l=u,c=(n("c833"),n("2877")),f=Object(c["a"])(l,o,s,!1,null,"595501d7",null),h=f.exports,d={name:"app",components:{Game:h}},v=d,p=(n("034f"),Object(c["a"])(v,i,a,!1,null,null,null)),m=p.exports;r["a"].config.productionTip=!1,new r["a"]({render:function(t){return t(m)}}).$mount("#app")},"85ec":function(t,e,n){},c833:function(t,e,n){"use strict";var r=n("3572"),i=n.n(r);i.a}});
//# sourceMappingURL=app.dc01a6e3.js.map