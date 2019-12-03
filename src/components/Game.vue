<template>
  <div id="game">
    <h1>Game of Life</h1>
    <div
      class="blue-border game__instructions"
    >
      <div class="game__instructions--left">
        <p>This is an implementation of <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a></p>
        <ul class="game__instructions-list">
          <li>Alive cells are black, dead cells are white.</li>
          <li>Before playing, you can click on a cell you can toggle it be alive/dead</li>
          <li>Use the controls to the right to help set up the game</li>

        </ul>
        <small>TIP: after clicking 'Take a turn' once, press the space key to take more turns</small>
        <small class="d-block danger-text">If it gets stuck click 'remove all life from the game'</small>

      </div>
      <div class="game__instructions--right">
        <p>Enter a number here to resize the board:</p>
        <input id="dimensions" class="dimensions-input" type="text" name="dimensions" v-model="dimensionsInput">
        <button class="blue-border" type="button" name="button" v-on:click="resizeBoard">Go</button>

        <button class="d-block game__setup-button blue-border" type="button" name="button" v-on:click="seedLife">Randomly seed life</button>
        <button class="d-block game__setup-button blue-border" type="button" name="button" v-on:click="resizeBoard"> Remove all life from the game</button>

      </div>
    </div>

    <div v-if="!searchForAnyLife">
      <p class="danger-text">There are no living cells! Add some following the instructions above</p>
    </div>

    <div v-if="searchForAnyLife">
      <button class="d-block game__turn-button blue-border" type="button" v-on:click="takeTurn"> Take a turn</button>
      <p> Turns taken {{turns}}</p>
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
      dimensionsInput: 10
    }
  },
  computed:{
    largestYCoordinate: function(){
      return this.currentState.length - 1;
    },
    largestXCoordinate: function(){
      return this.currentState[0].length - 1;
    },
    dimensions: function(){
      let number = parseInt(this.dimensionsInput);
      if(isNaN(number) || number<1){
        this.resetDimensionsInput();
        return 1;
      } else if (number > 200) {
        this.resetDimensionsInput(200);
        return 200;
      } else {
        return number;
      }
    },
    searchForAnyLife: function(){
      let lifeFound = false;
      this.currentState.forEach( row => {
        row.forEach( cell => {
            lifeFound = cell.alive ? true : lifeFound;
        })
      })
      return lifeFound;
    }
},
 created(){
   this.resizeBoard();
   console.log("GameOfLife component is loaded");
 },
 methods:{
   resetDimensionsInput(value=1){
     this.dimensionsInput = value;
   },
   resizeBoard(){
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
     this.turns = 0;
   },
   changeCellStatus(x,y){
     let cell = this.currentState[y][x];
     this.$set(this.currentState[y][x], 'alive', !cell.alive);
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
    const neighbourVectors = [
      [1,1],
      [1,0],
      [0,1],
      [-1,1]
    ];

    let aliveNeighboursCount = 0;

    neighbourVectors.forEach( vector => {
      for (let i=-1; i <=1; i++){
        if(i!=0){
          /*
            for and if loops cause positons -1 and +1, but not 0, along the vectors
            be considered neighbours and be tested for live
          */

          const neighbourX = x + vector[0]*i;
          const neighbourY = y + vector[1]*i;

          if( neighbourY >= 0 && neighbourX >= 0 && neighbourY <= this.largestYCoordinate && neighbourX <= this.largestXCoordinate){
            //coordinates are in bounds; is a valid neighbour
            if (this.isCellAlive(neighbourX, neighbourY)){
              aliveNeighboursCount += 1;
            }
          }

        }
      }
    })

    return aliveNeighboursCount;
  },

   isCellAlive(x,y){
     return this.currentState[y][x].alive;
   }

 }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.game__instructions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: baseline;
  border: solid 1px;
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
  padding: 10px 15px;
  width: 100%;
}

.game__turn-button {
  font-size: 1em;
  padding: 10px 5px;
  margin: 1em auto;
}

.blue-border {
  border: solid 1px #61ECFC;
  border-radius: 10px;
  background-color: white;
}

.dimensions-input {
  border: solid 1px #d3d3d3;
  background-color: white;
  margin-right: 0.5em;
  padding-right: 0 0.5em;
  text-align: end;
  width: 50px;
}

.board {
  margin-top: 3em;
  margin-bottom: 5em;
  overflow: auto;
  white-space: nowrap;
  padding: 1em;
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
