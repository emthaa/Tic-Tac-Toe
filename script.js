
const Gameboard = (() => {


  const Create = () => {
    var header = document.querySelector('#header');
    var board = document.querySelector("#gameboard");
    var Player1Turn = true;
    var tileArr = []
    var pone = document.createElement("div");
    let tiediv = document.createElement("div");
    var ptwo = document.createElement("div");


    pone.innerHTML = 'Player One';
    tiediv.innerHTML = " "
    ptwo.innerHTML = 'Player Two';

    pone.id = 'pone';
    tiediv.id = 'tie'
    ptwo.id = 'ptwo';

    header.appendChild(pone);
    header.appendChild(tiediv)
    header.appendChild(ptwo);

    let gstate

    const handleClick = function(Square) { 
        
        if (Square.innerHTML == "") {
  
          if (Player1Turn == true) {
            Player1Turn = !Player1Turn
            Square.innerHTML = "X"
  
            ptwo.style.transition = "font-size .5s";
            ptwo.style.fontSize = "50px";
            pone.style.transition = "font-size .5s";
            pone.style.fontSize = "40px";
  
          } else {
            Player1Turn = !Player1Turn
            Square.innerHTML = "O"
  
            pone.style.transition = "font-size .5s";
            pone.style.fontSize = "50px";
            ptwo.style.transition = "font-size .5s";
            ptwo.style.fontSize = "40px";
  
          }

      }
      console.log(tileArr)
      gstate = CheckForWin(tileArr, handleClick)
      console.log(gstate)
      CheckForTie(tileArr, gstate,tiediv)
      
    };

    for (let i = 0; i < 9; i++) {

      let Square = document.createElement('div');

      board.appendChild(Square);
      Square.className = "square"
      tileArr.push(Square)

      Square.addEventListener('click', (event) => {
        handleClick(Square);
      }, { once: true }); 
      

    }
    console.log(tileArr)
  }




  const checkSameValues = (array) => {
    let firstValue = '';

    for (let i = 0; i < array.length; i++) {
      if (array[i] === '') {
        return false; // if the element is blank, return false
      } else if (firstValue === '') {
        firstValue = array[i];
      } else if (array[i] !== firstValue) {
        return false;
      }
    }

    return array[0];
  }



  const CheckForTie = (arr, state,element) => {  //change tie function
      let counter = 0;
      let have_won = false
      if(state == 'X'||state =='O'){
        have_won = true
      }
      if (have_won != true){
      for (i = 0; i < 9; i++) {
        if (arr[i].innerHTML == "") {
          return
        } else if (arr[i].innerHTML != "") {
          counter += 1
        }

      }
      if (counter == 9) {
        console.log('tie')
        element.innerHTML = 'Tie!'
        pone.style.transition = "font-size .5s";
        pone.style.fontSize = "40px";
        ptwo.style.transition = "font-size .5s";
        ptwo.style.fontSize = "40px";
      } else {
        return
      }
    }
  }

  const CheckForWin = (array, func) => {
    console.log(array)

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let tempArr = [];
    for (var i = 0; i < winConditions.length; i++) {

      for (var j = 0; j < winConditions[i].length; j++) {

        let coordinate = winConditions[i][j];

        let index = array[coordinate].innerHTML;

        tempArr.push(index);

      }

      let gamestate = checkSameValues(tempArr);
      if (gamestate == 'X') {
        pone.style.transition = "font-size .5s";
        pone.style.fontSize = "60px";
        pone.innerHTML = "Player One Wins!"
        ptwo.style.transition = "font-size .5s";
        ptwo.style.fontSize = "40px";
        return 'X'
      } else if (gamestate == 'O') {
        ptwo.style.transition = "font-size .5s";
        ptwo.style.fontSize = "60px";
        ptwo.innerHTML = "Player Two Wins!"
        pone.style.transition = "font-size .5s";
        pone.style.fontSize = "40px";
        return 'O'
      }
      console.log(tempArr)
      tempArr = []


    }

  }

  return { Create }
})()








let bo = Gameboard.Create()


let reset = document.querySelector('#reset')

reset.addEventListener('click', function() {
  location.reload()


})



