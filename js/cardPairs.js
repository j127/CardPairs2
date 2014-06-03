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

    var cardPairs = {};
    var pairs = [];
    // pairSettings.holdingCard
    // pairSettings.holdingCardPosition
    // pairSettings.loopSuits
    var loops = loopPattern[pairSettings.loopSuits]; // E.g., loopPattern["shdc-sc"] -- an object
    //console.dir(loops);
    // Loop over holding cards
    //console.log(loops["holding"].length);
    //console.log(loops["looping"].length);

    for (var i = 0, len = loops["holding"].length; i < len; i ++) {
        //console.log("---- i = " + i + " ----");
        // Loop over loop suits
        for (var j = 0, len2 = loops["looping"].length; j < len2; j ++) {
            //console.log("---- j = " + j + " ----");

            for (var k = 0; k < 13; k ++) {
                console.log(pairSettings.holdingCard + " of " + loops["holding"][i] + " + " + cards.values[k] + " of " + loops["looping"][j]);
            }
        }
    }
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
