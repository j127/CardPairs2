$(document).ready(function () {

    // Assign variabled to elements
    var generatePairsButton = $("#generatePairs");

    // Initial page manipulation
    generatePairsButton.fadeIn(); // It starts disabled

    // Attach event handlers
    $("#cardPairOptionsForm select").on("change", function (e) {
        onSelectBoxChange();
    });

    generatePairsButton.on("click", function (e) {
        e.preventDefault();

        var formData = {
            holdingCard: $("#holdingCard").val(),
            holdingCardPosition: $("#holdingCardPosition").val(),
            loopSuits: $("#loopSuits").val()
        };

        doIt(formData);
    });
});

function onSelectBoxChange() {
    var holdingCard = $("#holdingCard").val(),
        holdingCardPosition = $("#holdingCardPosition").val(),
        loopSuits = $("#loopSuits").val();

    if (holdingCard !== "-" && holdingCardPosition !== "-" && loopSuits !== "-") {
        // It's disabled by default with an HTML attribute, but this is to be sure it's disabled if they invalidate a validated form.
        $("#generatePairs").attr("disabled", false);
    } else {
        $("#generatePairs").attr("disabled", true);
    }
}

function doIt(pairSettings) {
    //console.log("Doing it");
    //console.dir(pairSettings);

    var xHoldingCardValue,
        xLoopingCardSuit,
        xLoopingCardValue,
        xLoopingCardSuit;

    // cardPairs.pairs
    // or: cardPairs.groups.pairs (later)
    // TODO: watch out for global variable
    cardPairs = {};
    var currentGroup = [];
    var currentPairs = [];
    var groups = [];
    var pairs = [];
    var currentPair = {};
    var card1, card2;

    // pairSettings.holdingCard
    // pairSettings.holdingCardPosition
    // pairSettings.loopSuits
    var loops = loopPattern[pairSettings.loopSuits]; // E.g., loopPattern["shdc-sc"] -- an object

    // Loop over holding cards
    for (var i = 0, len = loops["holding"].length; i < len; i ++) {

        // Here we have the holding card suits

        // Loop over loop suits
        for (var j = 0, len2 = loops["looping"].length; j < len2; j ++) {

            // Here we have the looping suits

            for (var k = 0; k < 13; k ++) {
                // Here we have the 13 card values being added

                xHoldingCardValue = pairSettings.holdingCard;
                xHoldingCardSuit = loops["holding"][i];
                xLoopingCardValue = cards.values[k];
                xLoopingCardSuit = loops["looping"][j];

                y = createCardObject(xHoldingCardValue, xHoldingCardSuit);
                z = createCardObject(xLoopingCardValue, xLoopingCardSuit);

                //console.log("pairSettings.holdingCardPosition is: " + pairSettings.holdingCardPosition);
                if (pairSettings.holdingCardPosition == 1) {
                    card1 = y;
                    card2 = z;
                } else if (pairSettings.holdingCardPosition == 2) {
                    card1 = z;
                    card2 = y;
                } else {
                    console.log("ERROR");
                }

                // Clear the objects
                currentPairs = [];
                currentPair = {};
                currentPair["card1"] = card1;
                currentPair["card2"] = card2;

                currentPairs.push(currentPair);
                //console.log("currentPairs", JSON.stringify(currentPairs));
                // Push the current pair into the currentGroup
                currentGroup.push(currentPairs);

                //console.log(xHoldingCardValue + " of " + xHoldingCardSuit + " | " + xLoopingCardValue + " of " + xLoopingCardSuit);
            }

            //console.log("current state of groups", JSON.stringify(groups));
            // Push the finished currentGroup into the groups
            groups.push(currentGroup);
            // Clear the variable before the next loop
            currentGroup = [];

        }
    }
    // Attach all the groups to the object
    cardPairs.groups = groups;
    //console.log("cardPairs", JSON.stringify(cardPairs));
    //cardPairs.pairs = pairs;
    renderCardPairsTemplate(cardPairs);
    addRandomizeButtons();
}

function addRandomizeButtons() {
    var randomizeButton = $("#randomizeButton");
    var flattenAndRandomizeButton = $("#flattenAndRandomizeButton");

    randomizeButton.fadeIn();
    flattenAndRandomizeButton.fadeIn();

    randomizeButton.on("click", function (e) {
        e.preventDefault();

        // The next line only shuffles the order of the groups, not the pairs inside
        cardPairs.groups = _.shuffle(cardPairs.groups);
        for (var i = 0, len = cardPairs.groups.length; i < len; i ++) {
            console.log("Shuffling");
            cardPairs.groups[i] = _.shuffle(cardPairs.groups[i]);
        }

        renderCardPairsTemplate(cardPairs);
    });
    
    flattenAndRandomizeButton.on("click", function (e) {
        e.preventDefault();

        currentGroup = [];
        groups = [];
        x = _.flatten(cardPairs.groups);
        y = _.shuffle(x);
        //console.dir(JSON.stringify(x));
        //console.dir(JSON.stringify(y));
        loopLength = y.length / 13;
        console.log(loopLength);

        // TODO: Something isn't right here yet
        var i, j, temporary;
        for (i = 0, j = y.length; i < j; i += loopLength) {
            currentGroup = y.slice(i, i + loopLength);
            groups.push(currentGroup);
        }

        //while (y.length > 0) {

        //}
        //for (var i = 0, len = loopLength; i < len; i ++) {
            //// TODO: NO... this loops full 100+ times eight times
            //for (var j = 0, len = y.length; j < len; j ++) {
                //currentGroup.push(y[i]);
            //}
            //groups.push(currentGroup);
            //// Clear variable before next loop
            //currentGroup = [];
        //}

        cardPairs.groups = groups;

        // The next line only shuffles the order of the groups, not the pairs inside
        //cardPairs.groups = _.shuffle(cardPairs.groups);
        //for (var i = 0, len = cardPairs.groups.length; i < len; i ++) {
            //console.log("Shuffling");
            //cardPairs.groups[i] = _.shuffle(cardPairs.groups[i]);
        //}

        renderCardPairsTemplate(cardPairs);

    });



}

function createCardObject(value, suit) {
    var suit,
        color,
        card;

    card = cards.suits[suit];
    suit = card["entity"];
    color = card["color"];

    return {
        value: value,
        suit: suit, // HTML entity
        color: color
    }
}

function convertToCardObject(suitName) {

    // Returns an object with an entity and color
    return cards.suits[suitName];
}

function renderCardPairsTemplate(cardPairs) {

    // Compile Handlebars template
    $("#output").html("");
    var source = $("#cardPairsTemplate").html();
    var template = Handlebars.compile(source);
    var html = template(cardPairs);
    $("#output").append(html);
}

// Data
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

var loopPattern = {

    // The keys are passed in from the form
    "shdc-sc": {
        "holding": ["spades", "hearts", "diamonds", "clubs"],
        "looping": ["spades", "clubs"]
    },
    "shdc-hd": {
        "holding": ["spades", "hearts", "diamonds", "clubs"],
        "looping": ["hearts", "diamonds"]
    },
    "sc-shdc": {
        "holding": ["spades", "clubs"],
        "looping": ["spades", "hearts", "diamonds", "clubs"]
    },
    "hd-shdc": {
        "holding": ["hearts", "diamonds"],
        "looping": ["spades", "hearts", "diamonds", "clubs"]
    }
};


/*
* Use this to turn on logging: (in your local extensions file)
*/
//Handlebars.logger.log = function(level) {
    //if(level >= Handlebars.logger.level) {
    //console.log.apply(console, [].concat(["Handlebars: "], _.toArray(arguments)));
    //}
//};
//// DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, 
//Handlebars.registerHelper('log', Handlebars.logger.log);

//// Std level is 3, when set to 0, handlebars will log all compilation results
//Handlebars.logger.level = 0; 

/* 
* Log can also be used in templates: '{{log 0 this "myString" accountName}}'
* Logs all the passed data when logger.level = 0
*/
