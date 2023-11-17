const squares = document.querySelectorAll('.square'), heading = document.getElementById('heading'), restart_button = document.getElementById('restart-button'), first_move = 'x';
let curr_move = 'none', winner = null, playing = true, moved = [];

function update() {
    ['x', 'o'].forEach(char => {
        if (squares[0].classList.contains(char) && squares[1].classList.contains(char) && squares[2].classList.contains(char)) {
            winner = char;
        } else if (squares[3].classList.contains(char) && squares[4].classList.contains(char) && squares[5].classList.contains(char)) {
            winner = char;
        } else if (squares[6].classList.contains(char) && squares[7].classList.contains(char) && squares[8].classList.contains(char)) {
            winner = char;
        } else if (squares[0].classList.contains(char) && squares[3].classList.contains(char) && squares[6].classList.contains(char)) {
            winner = char;
        } else if (squares[1].classList.contains(char) && squares[4].classList.contains(char) && squares[7].classList.contains(char)) {
            winner = char;
        } else if (squares[2].classList.contains(char) && squares[5].classList.contains(char) && squares[8].classList.contains(char)) {
            winner = char;
        } else if (squares[0].classList.contains(char) && squares[4].classList.contains(char) && squares[8].classList.contains(char)) {
            winner = char;
        } else if (squares[2].classList.contains(char) && squares[4].classList.contains(char) && squares[6].classList.contains(char)) {
            winner = char;
        };
    });
    curr_move = curr_move == 'none' ? first_move : {'x': 'o', 'o': 'x'}[curr_move];
    heading.innerText = winner == null ? `${curr_move.toUpperCase()}'s turn` : `The winner is ${winner.toUpperCase()}`;
    playing = winner == null;
};

function restart() {
    squares.forEach(square => {
        change_square(square, 'none');
        curr_move = 'none';
        winner = null;
        moved = [];
        update();
    });
};

function change_square(square, to_state) {
    square.children[0].setAttribute('src', `${to_state}.${['x', 'o'].includes(to_state) ? 'svg' : 'png'}`);
    if (['x', 'o'].includes(to_state)) {
        square.classList.remove({'x': 'o', 'o': 'x'}[to_state]);
    } else {
        square.classList.remove('x');
        square.classList.remove('o');
    };
    square.classList.add(to_state);
};

squares.forEach(square => {
    square.addEventListener('click', _ => {
        if (playing && !moved.includes(square.id)) {
            change_square(document.getElementById(square.id), curr_move);
            moved.push(square.id);
            update();
        };
    });
});

restart_button.onclick = _ => {
    restart();
};

window.onload = _ => {
    update();
};