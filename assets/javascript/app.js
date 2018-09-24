//MOVIE QUOTES - TRIVIA GAME
//The game will contain 10 movie phrases. The user will have to select the movie from which the quote comes from.

var questions = [{
        question: "Life moves pretty fast. If you don’t stop and look around once in a while, you could miss it.",
        answers: ["Ghostbusters", "Ferris Bueller's Day Off", "Stand by Me", "The Breakfast Club"],
        name: "ferrisBueller",
        correct: "Ferris Bueller's Day Off",
        divClass: ".ferrisBueller"
    },
    {
        question: "I’m gonna hit you so hard when you wake up your clothes are gonna be out of style!",
        answers: ["The Goonies", "Ghostbusters", "Ferris Bueller's Day Off", "The Breakfast Club"],
        name: "theGoonies",
        correct: "The Goonies",
        divClass: ".theGoonies"
    },
    {
        question: "When it comes down to making out, whenever possible, put on Side I of Led Zeppelin IV.",
        answers: ["Sixteen Candles", "Fast Times at Ridgemont High", "Ghostbusters", "The Breakfast Club"],
        name: "fastTimes",
        correct: "Fast Times at Ridgemont High",
        divClass: ".fastTimes"
    },
    {
        question: "I loathe the bus. There has to be a more dignified mode of transportation.",
        answers: ["Ferris Bueller's Day Off", "The Breakfast Club", "The Goonies", "Sixteen Candles"],
        name: "sixteenCandles",
        correct: "Sixteen Candles",
        divClass: ".sixteenCandles"
    },
    {
        question: "Don't mess with the bull, young man. You'll get the horns.",
        answers: ["Stand by Me", "The Breakfast Club", "Top Gun", "Die Hard"],
        name: "breakfastClub",
        correct: "The Breakfast Club",
        divClass: ".breakfastClub"
    },
    {
        question: "That's a very nice suit, Mr. Takagi. It would be a shame to ruin it.",
        answers: ["Karate Kid", "Sixteen Candles", "Rambo", "Die Hard"],
        name: "dieHard",
        correct: "Die Hard",
        divClass: ".dieHard"
    },
    {
        question: "It's Showtime!",
        answers: ["Batman", "Top Gun", "Beetlejuice", "Die Hard"],
        name: "beetle",
        correct: "Beetlejuice",
        divClass: ".beetle"
    },
    {
        question: "This city is headed for a disaster of biblical proportions.",
        answers: ["Top Gun", "Die Hard", "Ghostbusters", "The Goonies"],
        name: "Ghostbusters",
        correct: "Ghostbusters",
        divClass: ".Ghostbusters"
    },
    {
        question: "If my calculations are correct, when this baby hits 88 miles per hour... you're gonna see some serious shit.",
        answers: ["ET", "Top Gun", "Die Hard", "Back to the Future"],
        name: "backFuture",
        correct: "Back to the Future",
        divClass: ".backFuture"
    },
    {
        question: "My name is Inigo Montoya. You killed my father. Prepare to die.",
        answers: ["The Princess Bride", "Labyrinth", "The NeverEnding Story", "Star Wars: Return of the Jedi"],
        name: "princessBride",
        correct: "The Princess Bride",
        divClass: ".princessBride"
    },
]
//console.log (questions); - (to check if the questions are in)
//somewhere here the document.write goes but I still can't understand this - I'm working on it though!

//The options variable will store the answers to the quotes
var options = ["one", "two", "three", "four"];

//The following 2 functions will work one after the other once the user clicks the start button.
//The container will be positioned, the counter will start from 90, and the questionnaire will appear.
var startGame = $("#start-btn").on('click', function () {
    $(this).parent().hide();
    $(".container").show();
    countdown(90);
    questionsDisplay();
});

var questionsDisplay = function () {
    $(".questions :not('#sub-btn')").empty();
    //Here the page will loop through the 10 questions and then through their individual answers.
    //I couldn't make a button for each answer so I went with the easiest option "the radio." 
    for (var a = 0; a < 10; a++) {
        $(".questions").prepend('<div class="' + questions[a].name + '"></div>');
        $(questions[a].divClass).append('<div class ="question-title">' + questions[a].question + "</div>");
        // loops through answers for each radio button
        for (var i = 0; i <= 3; i++) {
            $(questions[a].divClass).append('<input type="radio"  name="' + questions[a].name + '" value="' + questions[a].answers[i] + '"/><label for="' + options[i] + '">' + questions[a].answers[i] + '</label>');
        }
        $(".questions").prepend('<hr />');
    }
}


//This is the function for the countdown.
//When the time runs out it will automatically make the container fade out and display a screen with the results.
//It will count the number of right and wrong answers by looping through the correct array and the radio name

var countdown = function (seconds) {

    var timer = setInterval(function () {
        seconds = seconds - 1;
        $("#remain-time").html(seconds);

        if (seconds <= 0) {
            $(".container").fadeOut(500);
            correct = 0;
            wrong = 0;
            unAnswered = 0;

            for (var i = 0; i < 10; i++) {

                if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

                    correct++;
                }
                else {
                    wrong++;
                };
            }
            $("#correcttimeOut").append(correct);
            $("#wrongtimeOut").append(wrong);
            $("#timeOut").fadeIn(1000).show();

            clearInterval(timer);
            return;
        }
    }, 1000);

    //Once the user matches the quotes with the movies (if that happens) the submit button has to be pressed to stop the timer first and then to show the screen with the results.

    $("#sub-btn").on("click", function () {
        clearInterval(timer);
        

    })
};

//We need a loop to go through the correct array and compare the user's input against the previously established answers. 
var gradeQuiz = $("#sub-btn").on("click", function () {

    correct = 0;
    wrong = 0;
    unAnswered = 0;

    for (var i = 0; i < 10; i++) {

        if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {

            correct++;
        } else {
            wrong++;
        };
    };

    countdown();

    $(".container").fadeOut(500);
    $("#answerScreen").show();
    $("#correctScreen").append(correct);
    $("#wrongScreen").append(wrong);

});