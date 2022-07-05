"use-strict";

// {
//   const corrects = document.getElementsByClassName("js-quiz__correct");
//   const wrongs = document.getElementsByClassName("js-quiz__wrong");

//   console.log(corrects);
//   console.log(corrects.length);
//   console.log(typeof corrects);
//   console.log(corrects[0]);
//   console.log(wrongs);

//   for (let i = 0; i < corrects.length; i++) {
//     console.log("added");
//     corrects[i].addEventListener("click", () => {
//       console.log("clicked");
//     });
//   }
//   console.log("done");
// }

{
  const CORRECT_ANSWERS = [
    {
      index: 1,
      text: "約79万人",
    },
    {
      index: 2,
      text: "X-TECH",
    },
    {
      index: 0,
      text: "Internet of Things",
    },
    {
      index: 0,
      text: "Society 5.0",
    },
    {
      index: 0,
      text: "Web3.0",
    },
    {
      index: 1,
      text: "約5倍",
    },
  ];
  const CORRECT_TITLE = "正解!";
  const INCORRECT_TITLE = "不正解...";
  const CORRECT_CLASS = "is-correct";
  const INCORRECT_CLASS = "is-incorrect";
  const SELECTED_CLASS = "is-selected";

  const quizzes = document.querySelectorAll(".js-quiz");

  const setProperTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? CORRECT_TITLE : INCORRECT_TITLE;
  };

  const setProperClass = (target, isCorrect) => {
    // target.classList.remove(CORRECT_CLASS);
    // target.classList.remove(INCORRECT_CLASS);
    target.classList.add(isCorrect ? CORRECT_CLASS : INCORRECT_CLASS);
  };

  const setProperText = (target, quizIdx) => {
    target.innerText = CORRECT_ANSWERS[quizIdx].text;
  };
  const setMultiDisabled = (targets) => {
    targets.forEach((target) => {
      target.disabled = true;
    });
  };

  quizzes.forEach((quiz, quizIdx) => {
    const choices = quiz.querySelectorAll(".js-choice");
    const answer = quiz.querySelector(".js-answer");
    const answerTitle = quiz.querySelector(".js-answerTitle");
    const answerText = quiz.querySelector(".js-answerText");

    choices.forEach((choice, choiceIndex) => {
      choice.addEventListener("click", () => {
        // todo: it should not use choiceIndex
        const isCorrect = choiceIndex === CORRECT_ANSWERS[quizIdx].index;

        setProperClass(answer, isCorrect);
        setProperTitle(answerTitle, isCorrect);
        setProperText(answerText, quizIdx);
        quiz.classList.add(SELECTED_CLASS);
        choice.classList.add(SELECTED_CLASS);
        setMultiDisabled(choices);
      });
    });
  });
}
