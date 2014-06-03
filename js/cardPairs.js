$(document).ready(function () {
    var generatePairsButton = $("#generatePairs");

    generatePairsButton.fadeIn().attr("disabled", true);
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
        $("#generatePairs").attr("disabled", false);
    } else {
        $("#generatePairs").attr("disabled", true);
    }
}

function doIt(pairSettings) {
    console.log("Doing it");
    console.dir(pairSettings);

    var xHoldingCardValue, xLoopingCardSuit, xLoopingCardValue, xLoopingCardSuit;

    // cardPairs.pairs
    // or: cardPairs.groups.pairs (later)
    // TODO: watch out for global variable
    cardPairs = {};
    //var groups = [];
    var pairs = [];
    var currentPair = {};

    // pairSettings.holdingCard
    // pairSettings.holdingCardPosition
    // pairSettings.loopSuits
    var loops = loopPattern[pairSettings.loopSuits]; // E.g., loopPattern["shdc-sc"] -- an object

    // Loop over holding cards
    for (var i = 0, len = loops["holding"].length; i < len; i ++) {

        // Here we gave the holding card suits

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

                if (pairSettings.holdingCardPosition === 1) {
                    card1 = y;
                    card2 = z;
                } else {
                    card1 = z;
                    card2 = y;
                }

                // Clear the object
                currentPair = {};
                currentPair["card1"] = card1;
                currentPair["card2"] = card2;
                pairs.push(currentPair);

                //console.log(xHoldingCardValue + " of " + xHoldingCardSuit + " | " + xLoopingCardValue + " of " + xLoopingCardSuit);
            }
        }
    }
    cardPairs.pairs = pairs;
    console.dir(cardPairs);
    cardPairs.pairs = pairs;
    renderCardPairsTemplate(cardPairs);
    addRandomizeButton();
}
function addRandomizeButton() {
    var randomizeButton = $("#randomizeButton");

    randomizeButton.fadeIn();
    randomizeButton.on("click", function (e) {
        e.preventDefault();

        cardPairs.pairs = _.shuffle(cardPairs.pairs);
        renderCardPairsTemplate(cardPairs);

    });

}
function renderCardPairsTemplate(cardPairs) {
    $("#output").html("");
    var source = $("#cardPairsTemplate").html();
    var template = Handlebars.compile(source);
    var html = template(cardPairs);
    $("#output").append(html);
}
function createCardObject(value, suit) {
    var suit,
        color,
        card;

    card = cards.suits[suit];
    suit = card["entity"];
    color = card["color"];
    //color = "blue";

    return {
        value: value,
        suit: suit, // Entity
        color: color
    }
}
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
function convertToCardObject(suitName) {
    // Returns an object with an entity and color
    return cards.suits[suitName];
}

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

// TODO: Deal with the interface later
//$('#holdingCard').on('change', function (e) {
    //var optionText = $('#loopSuits option');
    //var optionsArray = [];
    //_.each(optionText, function (optionHtml) {
        //console.log(optionHtml);
    //});
    ////console.log(optionText);
    //var replacer = $('#holdingCard option:selected').html();
    //console.log(replacer);
    //// TODO: replace the text with the card names
    //var replacedOptions = optionText.replace(new RegExp("Hold", "g"), replacer);
    //$("#loopSuits option").text(replacedOptions);
    
//});
