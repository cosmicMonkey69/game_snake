const start = document.querySelector('button'),
    cells = document.querySelectorAll('td'),
    p = document.querySelector('p');

start.addEventListener('click', function (e) {
    e.preventDefault();
    
    for (const el of cells) {
        el.classList.remove('green', 'red');
        el.classList.remove('active');
    }

    cells[0].classList.add('active');
    cells[1].classList.add('active');

    let snake = [0, 1];
    let n; //next snake number
    let direction = 'ArrowRight';

    function addGreenCell () {
        let random = Math.floor(Math.random()*100);
        if (snake.includes(random)) {
            addGreenCell();
        } else {
            cells[random].classList.add('green');
        }
    }

    window.addEventListener('keydown', function (e) {
        nextCell(e.code);
        direction = e.code;
    });

    addGreenCell();
    let timer = setInterval(move, 200);

    function move () {
        nextCell(direction);
        
        if (snake.includes(n) && snake.length>2) {
            cells[n].classList.add('red');
            clearInterval(timer);
        }

        cells[n].classList.add('active');
        snake.push(n);
        if (cells[n].classList.contains('green')) {
            cells[n].classList.remove('green');
            addGreenCell();
        } else {
            cells[snake[0]].classList.remove('active');
            snake.shift(0);
        }
        p.textContent = `Snake length = ${snake.length}`;
    }

    function directionRight (i) {
        if (i == 0) {
            return 1;
        }
        if((i-9)%10 == 0) {
            return i-=9;
        } else {
            return i+=1;
        }
    }
    function directionLeft(i) {
        if(i%10) {
            return i-=1;
        } else {
            return i+=9;
        }
    }
    function directionUp (i) {
        if(i<10) {
            return i=cells.length-1-(9-i);
        } else {
            return i-=10;
        }
    }
    function directionDown (i) {
        if((i+10)>=cells.length) {
            return i=i%10;
        } else {
            return i+=10;
        }
    }

    function nextCell (d) {
        if(d == "ArrowRight") {
            n = directionRight(snake[snake.length-1]);
        }
        if(d == "ArrowLeft") {
            n = directionLeft(snake[snake.length-1]);
        }
        if(d == "ArrowUp") {
            n = directionUp(snake[snake.length-1]);
        }
        if(d == "ArrowDown") {
            n = directionDown(snake[snake.length-1]);
        }
    }
});