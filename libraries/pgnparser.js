class PGNParser {
    constructor(pgnData) {
        this.moves = this.processPgn(pgnData);
    }

    processPgn(pgnData) {
        const pgn_without_header = this.removeHeader(pgnData);
        const split_moves = this.splitMoves(pgn_without_header);
        return this.cleanMoves(split_moves);
    }


    removeHeader(pgnData) {
        // Remove header information
        return pgnData.replace(/\[.*\]/g, '');
    }

    splitMoves(pgnData){
        const moveRegex = /\d+\.\s+(\S+)\s+(\S+)/g;
        const moves = [];
        let match;
        
        while ((match = moveRegex.exec(pgnData)) !== null) {
            moves.push(match[1], match[2]);
        }

        return moves;
    }

    cleanMoves(moves){
        let movesWithoutPlus = moves.map(move => move.replace('+', '').replace('#', ''));
        
        // Remove promotion information (e.g., =Q, =N, =R, =B)
        let movesWithoutPromotion = movesWithoutPlus.map(move => move.replace(/=[QRNB]/, ''));
        
        // Clean up castling moves (replace 0-0 with O-O and 0-0-0 with O-O-O)
        let cleanedMoves = movesWithoutPromotion.map(move => {
            if (move.indexOf('O-O') !== -1) {
                return 'O-O';
            } else if (move.indexOf('O-O-O') !== -1) {
                return 'O-O-O';
            } else {
                return move.slice(-2);
            }
        });
        
        return cleanedMoves;
    }
}
