function Player(symbol) {
  this.symbol=symbol
}
var player1 = new Player('tails');
var player2 = new Player('snoots');
var activePlayer = player1;
var victoryText;
function swapPlayer() {
  if (activePlayer === player1) {
    activePlayer = player2
  } else if (activePlayer === player2) {
      activePlayer = player1
    }
    victoryText = "Congratulations, " + activePlayer.symbol + " .You've won!"
  }


function Board(){
  this.spaces = [];
  for(var xIndex = 1; xIndex <= 3; xIndex++){
    for(var yIndex = 1; yIndex <= 3; yIndex++){
      var newSpace = new Space(xIndex, yIndex);
      this.spaces.push(newSpace);
    }
  }
}

function Space(xCoord,yCoord){
  this.yCoord=yCoord;
  this.xCoord=xCoord;
  this.symbol;
}

Board.prototype.find = function(x,y){
  var foundSpace;
  console.log("finding" + x + "," + y)
  this.spaces.forEach(function(space){
    console.log(space.xCoord);
    if(space.xCoord === x && space.yCoord === y){
      foundSpace = space;
    }
  });
  return foundSpace;
}

Space.prototype.reveal = function(symbol){
  this.symbol = symbol;
}

var board = new Board();

$(document).ready(function() {

  Board.prototype.winner = function(){
    for(var xIndex = 1; xIndex <= 3; xIndex++){
      if (board.find(xIndex,1).symbol === board.find(xIndex,2).symbol && board.find(xIndex,1).symbol === board.find(xIndex,3).symbol && board.find(xIndex,1).symbol != null) {
        $('.space').hide();
        $('#victoryBox').text(victoryText);
        $('#' + xIndex + '1').show();
        $('#' + xIndex + '2').show();
        $('#' + xIndex + '3').show();
      }
    }

    for(var yIndex = 1; yIndex <= 3; yIndex++){
      if (board.find(1,yIndex).symbol === board.find(2,yIndex).symbol && board.find(1,yIndex).symbol === board.find(3,yIndex).symbol && board.find(1,yIndex).symbol != null) {
        $('#victoryBox').text(victoryText);
        $('.space').hide();
        $('#' + '1' + yIndex).show();
        $('#' + '2' + yIndex).show();
        $('#' + '3' + yIndex).show();

      }
    }

    if (board.find(1,1).symbol === board.find(2,2).symbol && board.find(3,3).symbol === board.find(1,1).symbol && board.find(1,1).symbol != null){
      $('#victoryBox').text(victoryText);
      $('.space').hide();
    }
    if (board.find(3,1).symbol === board.find(2,2).symbol && board.find(1,3).symbol === board.find(3,1).symbol && board.find(3,1).symbol != null){
      $('#victoryBox').text(victoryText);
      $('.space').hide();
    }
  }
  function yMarker(space){
    space.html("<img src='img/nose.png'>")
  }
  function xMarker(space){
    space.html("<img src='img/tail.png'>")
  }
  $('.space').each(function(index, element){
    $(element).click(function(){
      var coordinates = $(this).attr('id').split('');
      console.log(coordinates);
      var clickedSpace = board.find(parseInt(coordinates[0]), parseInt(coordinates[1]));
      console.log(clickedSpace);
      clickedSpace.reveal(activePlayer.symbol);

      if(activePlayer ===  player1){
        xMarker($(this))
      }
      else if(activePlayer === player2){
        yMarker($(this))
      }
      board.winner();
      swapPlayer();
    });


  });
});
