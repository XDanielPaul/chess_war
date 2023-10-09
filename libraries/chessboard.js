class Chessboard {
    constructor() {
        this.square_colors = {};
        this.cell_size = this.getCellSize();
        this.tint = 40;
    }

    getCellSize(){
        if (width >= height) {
            return height/8;
        }
        else {
            return width/8;
        }
    }

    clear([WHITE,BLACK]) {
        for (let row = 0; row < 8; row++) {
            for (let col=0; col < 8; col++) {
                let coordinates = [row, col];
                if ((row + col) % 2 == 0) {
                    this.square_colors[coordinates] = WHITE;
                } else {
                    this.square_colors[coordinates] = BLACK;
                }
            }
        }
        this.draw()
    }

    async update_square_colors(moves) {    
        
        const columnMap = {
            'a': 0,
            'b': 1,
            'c': 2,
            'd': 3,
            'e': 4,
            'f': 5,
            'g': 6,
            'h': 7
        };

        let player,move,row,col;
        console.log(moves)
    
        for (let i = 0; i < moves.length; i++) {
            if (i % 2 == 0) {
                player = 'W';
            } else {
                player = 'B';
            }
    
            move = moves[i];
            if (move == 'O-O') {
                row = player == 'W' ? 7 : 0 //row = 7 if player == 'W' else 0;
                col = player == 'W' ? 6 : 2 //col = 6 if player == 'W' else 2;
            } else if (move == 'O-O-O') {
                row = player == 'W' ? 7 : 0 //row = 7 if player == 'W' else 0;
                col = player == 'W' ? 2 : 6 //col = 2 if player == 'W' else 6;
            } else {
                row = columnMap[move[0]];
                col = 8 - parseInt(move[1],10);
            }

            let chess_square = [row, col];
            let originalColor = this.square_colors[chess_square];

            if (player == 'W') {
                this.square_colors[chess_square] = color(red(originalColor) + this.tint, green(originalColor) + this.tint, blue(originalColor) + this.tint);
                fill(this.square_colors[chess_square]);
                rect(row*this.cell_size, col*this.cell_size, this.cell_size, this.cell_size);
            } else {
                this.square_colors[chess_square] = color(red(originalColor) - this.tint, green(originalColor) - this.tint, blue(originalColor) - this.tint);
                fill(this.square_colors[chess_square]);
                rect(row*this.cell_size, col*this.cell_size, this.cell_size, this.cell_size);
            }
            await this.sleep(100);
        }
    }

    sleep(millisecondsDuration)
    {
        return new Promise((resolve) => {
            setTimeout(resolve, millisecondsDuration);
        })
    }

    draw() {
        for (let chess_square in this.square_colors) {
            let [row, col] = chess_square.split(',');
            fill(this.square_colors[chess_square]);
            rect(row*this.cell_size, col*this.cell_size, this.cell_size, this.cell_size);
        }
    }
}
