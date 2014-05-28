$(document).ready(function() {
    $("#generatePairs").fadeIn("slow");
    
    var cardOptions = {
	
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

    $("#generatePairs").on("click", function (e) {
        e.preventDefault();
        var suit1 = $("#suit1").val();
        var suit2 = $("#suit2").val();

        if (suit1 in cards.suits && suit2 in cards.suits) {
            generatePairs(suit1, suit2);
        } else {
            $("#output").html("It appears that there is a problem with your selection.");
        }
    });
    $("#randomize").on("click", function (e) {
        // Cards
        var c = {};
        e.preventDefault();
        c.pairs = shuffle(cardPairs.pairs);
        printCardPairs(c);
    });
    $("#reloadPage").on("click", function(e) {
        e.preventDefault();
        // Reload page without saving form info
        document.location.href=document.location.href;
    });
    function printCardPairs(cardPairs) {
        $("#output").html("");
        var source = $("#cardPairsTemplate").html();
        var template = Handlebars.compile(source);
        var html = template(cardPairs);
        $("#output").append(html);
    }
    function hideInstructions() {
        $("#instructions").hide();
        $("form").hide();
        $("#afterButtons").fadeIn();
    }
    function generatePairs(suit1, suit2) {
        var outputArray = [],
            card,
            tmpCards = {};

        // TODO: Global variable
        cardPairs = {};

        var suit1entity = cards.suits[suit1].entity;
        var suit2entity = cards.suits[suit2].entity;
        var suit1color = cards.suits[suit1].color;
        var suit2color = cards.suits[suit2].color;

        // First loop over card values
        _.each(cards.values, function(val1) {
            // Second loop over card values
            _.each(cards.values, function(val2) {
                tmpCards = {};
                tmpCards.card1 = {};
                tmpCards.card1.suit = suit1entity;
                tmpCards.card1.value = val1;
                tmpCards.card1.color = suit1color;

                tmpCards.card2 = {};
                tmpCards.card2.suit = suit2entity;
                tmpCards.card2.value = val2;
                tmpCards.card2.color = suit2color;
                outputArray.push(tmpCards);
            });
        });

        cardPairs.pairs = outputArray;

        printCardPairs(cardPairs);
        hideInstructions();
    }
    function shuffle(o){
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };
});
