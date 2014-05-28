<!DOCTYPE html>
<html>
    <head>
        <title>Selected Card Pairs for Memorization</title>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="http://yui.yahooapis.com/pure/0.3.0/pure-min.css">
        <link rel="stylesheet" href="css/main.css">
        <style>
        </style>
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-19857446-1']);
_gaq.push(['_trackPageview']);

(function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();
</script>
    </head>
    <body>
        <div class="pure-g">
            <div class="pure-u-4-5">
                <h1>Card Pairs Generator</h1>
                <div class="l-box">
                    <div id="instructions">
                        <p>This script generates card pairs to practice creating mnemonic images for 2-card systems like the <a href="http://mnemotechnics.org/wiki/Ben_System">Ben System</a>. It can help you practice "reading" the card pairs as images. Or check out our other <a href="/training">memory training software</a>.</p>
    <noscript>JavaScript must be enabled to use this page.</noscript>
                    </div>
<div id="afterButtons">
    <button id="reloadPage" class="pure-button">Generate Another Set</button>
    <button id="randomize" class="pure-button">Randomize Pairs</button>
</div>
<div id="cardPairs">
<form id="" class="">
    <p>Select suit pairs to generate:</p>
    <select id="suit1" name="suit1">
        <option value="-">-- Choose</option>
        <option value="spades">&spades; Spades</option>
        <option value="hearts">&hearts; Hearts</option>
        <option value="diamonds">&diams; Diamonds</option>
        <option value="clubs">&clubs; Clubs</option>
    </select> <span class="red">*</span>
    <select id="suit2" name="suit2">
        <option value="-">-- Choose</option>
        <option value="spades">&spades; Spades</option>
        <option value="hearts">&hearts; Hearts</option>
        <option value="diamonds">&diams; Diamonds</option>
        <option value="clubs">&clubs; Clubs</option>
    </select> <span class="red">*</span>
    <!-- <img id="loaderGif" src="images/loader.gif"> --><button id="generatePairs" class="pure-button pure-button-primary">Generate Pairs</button>
</form>
        <div id="output"></div>
    </div>
                </div>
            </div>
            <div class="pure-u-1-5">
                <!-- <p>1/5</p> -->
            </div>
        </div>
<script id="cardPairsTemplate" type="text/x-handlebars-template">
<table>
<tbody>
{{#each pairs}}
<tr>
<td><span class="{{ card1.color }}">{{ card1.value }}{{{ card1.suit }}}</span></td><td><span class="{{ card2.color }}">{{ card2.value }}{{{ card2.suit }}}</span></td>
</tr>
    {{/each}}
    </tbody>
</table>
    </script>
        <script src="http://code.jquery.com/jquery-1.10.1.min.js"></script>
        <script src="js/underscore-min.js" type="text/javascript"></script>
        <script src="js/handlebars-v1.3.0.js" type="text/javascript"></script>
        <script src="js/main.js" type="text/javascript"></script>
        <script src="http://static.getclicky.com/js" type="text/javascript"></script>
        <script type="text/javascript">try{ clicky.init(66357052); }catch(err){}</script>
        <noscript><p><img alt="Clicky" width="1" height="1" src="http://in.getclicky.com/66357052ns.gif" /></p></noscript>
    </body>
</html>
