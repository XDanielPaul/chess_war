var cnv;

// GUI Elements
var colorSchemes = ['Sandcastle', 'Marine', 'Dusk', 'Coral', 'Emerald', 'Wheat', 'White', 'Black', 'Middle Grey'];
let matchingScheme;

var button;
var chessboard;
var pgn;

const template_pgn = `
[Event "Dresden"]
[Site "Dresden GER"]
[Date "1926.04.06"]
[EventDate "1926.04.04"]
[Round "3"]
[Result "1/2-1/2"]
[White "Aron Nimzowitsch"]
[Black "Alexander Alekhine"]
[ECO "B02"]
[WhiteElo "?"]
[BlackElo "?"]
[PlyCount "106"]

1. e4 Nf6 2. d3 c5 3. c4 Nc6 4. Nc3 e6 5. f4 d5 6. e5 d4
7. Ne4 Nxe4 8. dxe4 g5 9. Nf3 gxf4 10. Bxf4 Qc7 11. Bd3 Bd7
12. O-O O-O-O 13. a3 Be8 14. Qe1 Rg8 15. Qh4 h6 16. Bg3 Qb6
17. Rf2 Qb3 18. Rd2 Na5 19. Rc1 Qb6 20. Rf1 Nb3 21. Re2 a5
22. Bf4 a4 23. h3 Na5 24. Bd2 Nc6 25. Qe1 Qb3 26. Qb1 Bg7
27. Bf4 Ne7 28. Bd2 Nc6 29. Bf4 Na5 30. Nd2 Qb6 31. Qc2 Qc7
32. Nf3 Kb8 33. Qc1 b5 34. cxb5 c4 35. Bd2 Rc8 36. Bxa5 Qxa5
37. Rc2 Bxb5 38. Bxc4 d3 39. Rc3 d2 40. Qc2 Bxc4 41. Rxc4 Rxc4
42. Qxc4 Rc8 43. Qe2 Qb6+ 44. Qf2 Qxf2+ 45. Kxf2 Rc2 46. Ke2
Rxb2 47. Nxd2 Bxe5 48. Rb1 Rxb1 49. Nxb1 Kc7 50. Nd2 Kc6
51. Kd3 Kc5 52. g4 Bf4 53. Nb1 Be5 1/2-1/2
`;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function setupGUI(){
    // Create GUI
    var gui = createGui('Settings');
    // Add settings
    gui.addGlobals('colorSchemes');

    // Initialize schemes
    matchingScheme = {
        'Sandcastle': [color(227,193,111), color(184,139,74)],
        'Marine': [color(157,172,255), color(111,115,210)], 
        'Dusk': [color(204,183,174), color(112,102,119)],
        'Coral': [color(177,228,185), color(112,162,163)],
        'Emerald': [color(173,189,143), color(111,143,114)],
        'Wheat': [color(234,240,206), color(187,190,100)],
        'White': [color(255,255,255), color(255,255,255)],
        'Black': [color(0,0,0), color(0,0,0)],
        'Middle Grey': [color(128,128,128), color(128,128,128)],
    }

    // Create button for generation
    $('.qs_content').append(
        $('<div>').addClass('qs_container').append(
            $('<label>').text('PGN').css({
                'display': 'block',
                'margin': 'auto',
                'font-weight': 'bold',
            }),
            $('<textarea>').text(template_pgn).attr('id', 'pgn').css({
                'width': '100%',
                'height': '200px',
                'resize': 'none',
                'font-size': '11px'
            })
        ),
        $('<div>').addClass('qs_container').append(
            $('<button>').text('Generate board').click(generateBoard).css({
                'display': 'block',
                'margin': 'auto'
            })
        ),
        $('<div>').addClass('qs_container').append(
            $('<button>').text('Clear')
            .click(() => { chessboard.clear(matchingScheme[colorSchemes])} )
            .css({
                'display': 'block',
                'margin': 'auto'
            })
        )
    );

    $('.qs_main').css({
        'top': '0',
        'left': '0',
    })
}

function generateBoard(){
    pgn = select('#pgn').value();
    let parser = new PGNParser(pgn);
    chessboard.clear(matchingScheme[colorSchemes]);
    chessboard.update_square_colors(parser.moves);
}

function setup() {
    cnv = createCanvas(500, 500);
    centerCanvas();
    noStroke();
    setupGUI();
    chessboard = new Chessboard();
    noLoop();
}

function windowResized() {
    centerCanvas();
}

function draw() {
    chessboard.clear(matchingScheme[colorSchemes]);
}
