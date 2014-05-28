var holdingCardSecond = {
    listOfSuitsToLoopOver: ["spades", "clubs"],
    holdingCardSuits: ["spades", "hearts", "diamonds", "clubs"]
};
var holdingCardSecondV2 = {
    listOfSuitsToLoopOver: ["hearts", "diamonds"],
    holdingCardSuits: ["spades", "hearts", "diamonds", "clubs"]
};
var holdingCardFirstV1 = {
    listOfSuitsToLoopOver: ["spades", "hearts", "diamonds", "clubs"],
    holdingCardSuits: ["spades", "clubs"]
};
var holdingCardFirstV2 = {
    listOfSuitsToLoopOver: ["spades", "hearts", "diamonds", "clubs"],
    holdingCardSuits: ["hearts", "diamonds"]
};

var cards = {};
cards.suits = { 
    "spades": {
        "entity": "&spades;",
        "color": "black"
    },
    "hearts": {
        "entity": "&hearts;",
        "color": "red"
    },
    "diamonds": {
        "entity": "&diams;",
        "color": "red"
    },
    "clubs": {
        "entity": "&clubs;",
        "color": "black"
    }
};
cards.values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

// holdingCard is the card that doesn't change
// position is whether it appears first (1) or second (2)
// holdingCardSuitsArray is an array of suits for the holding card
// suitsLoopArray is an array of suits to loop over
function generateCards(holdingCard, position, holdingCardSuitsArray, suitsLoopArray) {
    // For each holdingCardSuitsArray build a set with each suitsLoopArray
    $(holdingCardSuitsArray).each(function (holdingSuit) {
        // Loop over suitsLoopArray
        $(suitsLoopArray).each(function (loopSuit) {
            // Build a set of cards
            
        });
    });
}

function buildTemplate(cardPairsArray) {

}
