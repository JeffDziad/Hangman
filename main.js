$(document).ready(function() {

   let words = ["askew", "beekeeper", "banjo", "jukebox", "haphazard", "galvanize",
      "kiosk", "razzmatazz", "rhythm", "kiwifruit", "zigzagging", "whiskey", "sphinx",
      "espionage", "jazziest", "croquet", "bagpipes", "abyss", "bayou", "jawbreaker",
      "cobweb", "gnostic", "galaxy", "hyphen", "dwarves", "jockey", "gossip", "icebox",
      "haiku", "boxcar", "bookworm", "bandwagon", "cycle", "jackpot", "gnarly", "fishhook"];

   let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

   let game = true;
   let answer = '';
   let maxTry = 6;
   let tryCount = 0;
   let guessedLetters = [];
   let answerArray = [];
   let correctGuesses = [];

   let wins = 0;
   let losses = 0;

   $("#minGuess").text(tryCount);
   $("#maxGuess").text(maxTry);
   $("#loss").text(losses);
   $("#win").text(wins);

   pickWord();
   displayAlphabetButtons();
   displayWord();
   $("#restart_Button").click(reset);
   $("#continue_Button").click(function()
   {
      game = true;
      continue_();
   });
   $(".alphabet").click(
       function()
       {
          if(game === true)
          {
             handleGuess(this);
          }
          else
          {
             alert("Game Over! Click Restart to play again!");
          }
       }
   );

   function handleGuess(element)
   {
      let elementVal = $(element).val();
      $(element).removeClass("guess");
      $(element).addClass("guessed");
      if(!(answerArray.indexOf(elementVal) === -1))
      {
         answerArray.forEach(function (value, index)
         {
            if(value === elementVal)
            {
               correctGuesses[index] = value;
               $("#word").text(correctGuesses.join(''));
            }
         });
      }
      else
      {
         tryCount += 1;
         $("#minGuess").text(tryCount);
         $("#hangman_Canvas").html(`<img src="hangman_Pictures/hangman_${tryCount}.png">`);
      }
      if(tryCount === 6)
      {
         $("#game_Over").css("display", "block");
         $("#word").text(answer);
         losses += 1;
         $("#loss").text(losses);
         game = false;
         $("#continue_Button").css("display", "block");
      }
      if($.inArray("-", correctGuesses) === -1)
      {
         $("#game_Correct").css("display", "block");
         $("#word").text(answer);
         wins += 1;
         $("#win").text(wins);
         game = false;
         $("#continue_Button").css("display", "block");
      }
   }

   function pickWord()
   {
      answer = words[Math.floor(Math.random() * words.length)];
   }

   function displayAlphabetButtons()
   {
      let buttonHTML;
      alphabet.forEach(function(value, index)
      {
         buttonHTML = `<button class='alphabet guess' id='${value}' value='${value}'>${value}</button>`;
         $("#alphabet_Div").append(buttonHTML);
      });
   }

   function displayWord()
   {
      answerArray = answer.split('');
      answerArray.forEach(function(value, index)
      {
         correctGuesses.push("-");
      });
      $("#word").text(correctGuesses.join('')); //everytime  a correct letter is guess, re-update #word with the array correctGuesses
   }

   function reset()
   {
      game = true;
      answer = '';
      maxTry = 6;
      tryCount = 0;
      guessedLetters = [];
      answerArray = [];
      correctGuesses = [];

      wins = 0;
      losses = 0;

      $("#minGuess").text(tryCount);
      $("#maxGuess").text(maxTry);
      $("#game_Correct").css("display", "none");
      $("#game_Over").css("display", "none");
      $("#continue_Button").css("display", "none");
      $("#loss").text(losses);
      $("#win").text(wins);

      $("#hangman_Canvas").html("<img src='hangman_Pictures/hangman_Empty.png'>");

      pickWord();
      displayWord();

      alphabet.forEach(function(value,index)
      {
         if($(`#${value}`).hasClass("guessed"))
         {
            $(`#${value}`).removeClass("guessed");
            $(`#${value}`).addClass("guess");
         }
      })
   }

   function continue_()
   {
      game = true;
      answer = '';
      maxTry = 6;
      tryCount = 0;
      guessedLetters = [];
      answerArray = [];
      correctGuesses = [];

      $("#minGuess").text(tryCount);
      $("#maxGuess").text(maxTry);
      $("#game_Correct").css("display", "none");
      $("#game_Over").css("display", "none");
      $("#continue_Button").css("display", "none");

      $("#hangman_Canvas").html("<img src='hangman_Pictures/hangman_Empty.png'>");

      pickWord();
      displayWord();

      alphabet.forEach(function(value,index)
      {
         if($(`#${value}`).hasClass("guessed"))
         {
            $(`#${value}`).removeClass("guessed");
            $(`#${value}`).addClass("guess");
         }
      })
   }

});