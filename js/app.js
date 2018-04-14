document.addEventListener('DOMContentLoaded', function(){
    console.log('działa');

    //konstruktor Furry
    var Furry = function() {
        this.x = 0;
        this.y = 0;
        this.direction = "right";
    };

    //konstruktor monety
    var Coin = function() {
        this.x = Math.floor(Math.random() * 10);
        this.y = Math.floor(Math.random() * 10);
    };

    //konstruktor gry
    var Game = function() {
        this.board = document.querySelectorAll('section#board div');
        this.furry = new Furry();
        this.coin = new Coin();
        this.score = 0;

        this.index = function(x,y) {
            return x + (y * 10);
        };

        var self = this;

         this.showFurry = function(){
            //null - jeśli nie znaleziono dopasowań
            if(document.querySelector('.furry') != null) {
                self.hideVisibleFurry();
            }
             this.board[ this.index(this.furry.x,this.furry.y) ].classList.add('furry');
         };

        this.hideVisibleFurry = function(){
            document.querySelector('.furry').classList.remove('furry');
        };

         this.showCoin = function(){
             this.board[ this.index(this.coin.x,this.coin.y) ].classList.add('coin');
         };

        this.moveFurry = function(){
            if(this.furry.direction === 'right'){
                this.furry.x = this.furry.x + 1;
            } else if (this.furry.direction === 'left'){
                this.furry.x = this.furry.x - 1;
            } else if (this.furry.direction === 'down') {
                this.furry.y = this.furry.y + 1;
            } else {
                this.furry.y = this.furry.y - 1;
            }
            self.gameOver();
            self.showFurry();
            self.checkCoinCollision();
        };

        this.turnFurry = function(event){
            switch (event.which) {
                case 37:
                    self.furry.direction = 'left';
                    break;
                case 38:
                    self.furry.direction = 'up';
                    break;
                case 39:
                    self.furry.direction = 'right';
                    break;
                case 40:
                    self.furry.direction = 'down';
                    break;
            }
        };

        this.checkCoinCollision = function(){
            //if(this.furry.x === this.coin.x && this.furry.y === this.coin.y) {
            if(this.board[ this.index(this.coin.x,this.coin.y) ] === this.board[ this.index(this.furry.x,this.furry.y) ]){
                document.querySelector('.coin').classList.remove('coin');
                this.score++;
                document.querySelector('section#score strong').innerText = this.score;
                this.coin = new Coin();
                self.showCoin();
            }
        };

        this.gameOver = function(){
            if(this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){

            clearInterval(this.idSetInterval);
            self.hideVisibleFurry();

            var sectionOver = document.querySelector('section#over'),
                spanOver = document.querySelector('section#over.score');
            sectionOver.classList.remove('invisible');
            sectionOver.classList.add('gameOver');
            spanOver.innerText = 'Your score: ' + this.score;

            }
        };

        this.startGame = function(){
            this.idSetInterval = setInterval(function(){
                self.moveFurry();}, 250);
        };
    };

    var game = new Game();
    document.addEventListener('keydown', function(event){
        game.turnFurry(event);
    });
    game.showFurry();
    game.showCoin();
    game.startGame();

});