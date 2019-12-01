<template>
  <div id="game">
    <h1>Game of Life</h1>
    <div
      class="blue-border"
      v-bind:class="{ 'game__instructions--mobile' : onMobile, 'game__instructions--desktop' : !onMobile}"
    >
      <div class="game__instructions--left">
        <p>This is an implementation of <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a></p>
        <ul class="game__instructions-list">
          <li>Alive cells are black, dead cells are white.</li>
          <li>Before playing, you can click on a cell you can toggle it be alive/dead</li>
          <li>Use the controls to the right to help set up the game</li>

        </ul>
        <small>TIP: after clicking 'Take a turn' once, press the space key to take more turns</small>

      </div>
      <div class="game__instructions--right">
        <p>Enter a number here to resize the board:</p>
        <input id="dimensions" type="text" name="dimensions" v-model="dimensions">
        <button type="button" name="button" v-on:click="resizeGrid">Go</button>

        <button class="d-block game__setup-button" type="button" name="button" v-on:click="seedLife">Randomly seed life</button>
        <button class="d-block game__setup-button" type="button" name="button" v-on:click="resizeGrid"> Remove all life from the game</button>

      </div>
    </div>

    <div v-if="!searchForAnyLife">
      <p class="danger-text">There are no living cells! Add some following the instructions above</p>
    </div>

    <div v-if="searchForAnyLife">
      <button class="d-block game__turn-button blue-border" type="button" v-on:click="takeTurn"> Take a turn</button>
    </div>



    <div class="board">
      <div v-for="(row, rowIndex) in currentState" v-bind:key="rowIndex" class="board__row">
        <div
          v-for="(element, cellIndex) in row"
          v-bind:key="cellIndex"
          class="board__cell"
          v-bind:class="{ alive: element.alive}"
          v-on:click="changeCellStatus(cellIndex, rowIndex)"
        >
        </div>
      </div>
    </div>
  </div>
</template>


<script>

export default {
  name: 'GameOfLife',
  data(){
    return {
      currentState: [],
      futureState: [],
      turns: 0,
      dimensions: 10
    }
  },
  computed:{
    largestYCoordinate: function(){
      return this.currentState.length - 1;
    },
    largestXCoordinate: function(){
      return this.currentState[0].length - 1;
    },
    searchForAnyLife: function(){
      let lifeFound = false;
      this.currentState.forEach( row => {
        row.forEach( cell => {
            lifeFound = cell.alive ? true : lifeFound;
        })
      })
      return lifeFound;
    },
    onMobile(){

      //https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
      //workaround for no media queries in Vue app

      var check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;

    }
 },
 created(){
   this.resizeGrid();
   console.log("GameOfLife component is loaded");
 },
 methods:{
   resizeGrid(){
     if(this.dimensions < 1){
       this.dimensions = 1;
     }
     this.currentState = [];
     for (let i =0; i < this.dimensions; i++){
       this.currentState.push([]);
       for (let j =0; j < this.dimensions; j++){
         this.currentState[i].push({alive:false})
       }
     }
     this.resetFutureState();
   },
   seedLife(){
     for (let i =0; i < this.currentState.length; i++){
       for (let j =0; j < this.currentState[i].length; j++){
         let life = (Math.random()> 0.5);
         /*
            Need to iterate through every single cell and set the property using
            the $set method, otherwise Vue doesn't re-render the component.
            This is because Vue cannot deted changes in property values, see
            here: https://vuejs.org/v2/guide/reactivity.html#How-Changes-Are-Tracked
         */
         this.$set(this.currentState[i][j], 'alive', life);
       }
     }
   },
   changeCellStatus(x,y){
     let cell = this.currentState[y][x];
     cell.alive = !cell.alive;
   },
   resetFutureState(){
     this.futureState = [];
     for(let i=0; i <= this.largestYCoordinate; i++){
       this.futureState[i] = [];
     }
   },
   takeTurn(){

     this.currentState.forEach( (row, y) => {
       row.forEach( (cell, x) => {
           //cycle through every poisition
           if(cell.alive){
             //position is alive, should it die?
             let futureValue = this.shouldCellDie(x,y) ? {alive: false} : {alive: true};
             this.futureState[y].push(futureValue);
           } else {
             //position is dead, should it become alive?
             let futureValue = this.shouldCellBecomeAlive(x,y) ? {alive: true} : {alive: false};
             this.futureState[y].push(futureValue);
           }
       })
     })

     this.currentState = this.futureState;
     this.turns += 1;
     this.resetFutureState()
   },

   shouldCellDie(x,y){

     let neighbours = this.numberOfLivingNeighbours(x,y);

     /*
     Return true, die, if fewer than two OR more than 3 neighbours.
     Otherwise, false; don't die.
     */
     return neighbours < 2 || neighbours > 3;
   },

   shouldCellBecomeAlive(x,y){
     let neighbours = this.numberOfLivingNeighbours(x,y);
     /*
     Return true, live if exactly 3 neighbours.
     Otherwise, false; don't live.
     */
     return neighbours === 3;
   },

   numberOfLivingNeighbours(x,y){
     let neighbourVectors = [
       [1,1],
       [1,0],
       [0,1],
       [-1,1]
     ];

     let aliveNeighbours = 0;

     neighbourVectors.forEach( vector => {
       //positive side
       let neighbourX = x + vector[0];
       let neighbourY = y + vector[1];

       if(
         neighbourY >= 0 &&
         neighbourX >= 0 &&
         neighbourY <= this.largestYCoordinate &&
         neighbourX <= this.largestXCoordinate
       ){
         //coordinates are in bounds
         if (this.currentState[neighbourY][neighbourX].alive){
           aliveNeighbours += 1;
         }
       }

       //negative side
       neighbourX = x - vector[0];
       neighbourY = y - vector[1];

       if(
         neighbourY >= 0 &&
         neighbourX >= 0 &&
         neighbourY <= this.largestYCoordinate &&
         neighbourX <= this.largestXCoordinate
       ){
         //coordinates are in bounds
         if (this.currentState[neighbourY][neighbourX].alive){
           aliveNeighbours += 1;
         }
       }
     })

     return aliveNeighbours;
   },
   isCellAlive(x,y){
     return this.currentState[y][x].alive;
   }

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.game__instructions--desktop {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  border: solid 1px;
  margin: 0% 20%;
}

.game__instructions--mobile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  border: solid 1px;
  margin: 0;
}

.game__instructions-list{
  margin-left: 1em;
  text-align: left;
}

.game__instructions--right {
  padding: 0.5em;
  margin-left: 1em;
}


.game__instructions--left {
  padding: 0.5em;
  margin-right: 1em;
}

.game__setup-button {
  margin: 1em auto;
  width: 100%;
  background-color: white;
}

.game__turn-button {
  font-size: 1em;
  padding: 10px 5px;
  margin: 1em auto;
}

.blue-border {
  border: solid 1px #61ECFC;
  border-radius: 10px;
}

.board {
  margin-top: 3em;
  margin-bottom: 5em;
  overflow: auto;
  white-space: nowrap;
}

.board__row{
  margin: 0;
}

.board__cell{
  margin: 0;
  width: 25px;
  height: 25px;
  display: inline-block;
  border: solid 1px grey;
  margin-bottom: -6px;
}

.alive {
  background-color: black;
}

.d-block {
  display: block;
}

.danger-text {
  color: #FC6C61;
}

</style>
