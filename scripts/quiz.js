"use-strict";

let quizzes = [
  {
    question:
      "日本のIT人材が2030年には最大どれくらい不足すると言われているでしょうか？",
    imgPath: "assets/img/quiz/img-quiz01.png",
    choices: ["約28万人", "約79万人", "約183万人"],
    reference: "経済産業省 2019年3月 － IT 人材需給に関する調査",
    answer: "約79万人",
  },
  {
    question:
      "既存業界のビジネスと、先進的なテクノロジーを結びつけて生まれた、新しいビジネスのことをなんと言うでしょう？",
    imgPath: "assets/img/quiz/img-quiz02.png",
    choices: ["INTECH", "BIZTECH", ""],
    answer: "XTECH",
  },
  {
    question: "IoTとは何の略でしょう？",
    imgPath: "assets/img/quiz/img-quiz03.png",
    choices: [
      "Internet of Things",
      "Integrate into Technology",
      "Information on Tool",
    ],
    answer: "Internet of Things",
  },
  {
    question:
      "日本が目指すサイバー空間とフィジカル空間を高度に融合させたシステムによって開かれる未来社会のことをなんと言うでしょうか？",
    imgPath: "assets/img/quiz/img-quiz04.png",
    choices: ["Society 5.0", "CyPhy", "SDGs"],
    reference: "Society5.0 - 科学技術政策 - 内閣府",
    answer: "Society 5.0",
  },
  {
    question:
      "日本が目指すサイバー空間とフィジカル空間を高度に融合させたシステムによって開かれる未来社会のことをなんと言うでしょうか？",
    imgPath: "assets/img/quiz/img-quiz05.png",
    choices: ["Web3.0", "NFT", "メタバース"],
    answer: "Web3.0",
  },
  {
    question:
      "先進テクノロジー活用企業と出遅れた企業の収益性の差はどれくらいあると言われているでしょうか？",
    imgPath: "assets/img/quiz/img-quiz06.png",
    choices: ["約2倍", "約5倍", "約11倍", "plus option"],
    reference: "Accenture Technology Vision 2021",
    answer: "約5倍",
  },
];

const ASSET_PATH = "../";

const CLASS_QUIZZES_WRAPPER = "js-quizzesWrapper";
const CLASS_CHOICE = "js-quizChoice";
const CLASS_QUIZ = "js-quiz";
const CLASS_CHOICE_WRAPPER = "js-quizChoiceWrapper";
const CLASS_QUESTION_ID = "js-quizQuestionID";
const CLASS_QUESTION_TEXT = "js-quizQuestionText";
const CLASS_IMAGE = "js-quizImage";
const CLASS_CHOICE_TEXT = "js-quizChoiceText";
const CLASS_REFERENCE = "js-quizReference";
const CLASS_REFERENCE_TEXT = "js-quizReferenceText";
const CLASS_ANSWER = "js-quizAnswer";
const CLASS_ANSWER_TITLE = "js-quizAnswerTitle";
const CLASS_ANSWER_TEXT = "js-quizAnswerText";

const CLASS_HIDDEN = "u-state__hidden";

// https://www.softel.co.jp/blogs/tech/archives/2328
const shuffleArray = (array) => {
  return array
    .map((elem) => {
      return { weight: Math.random(), value: elem };
    })
    .sort((a, b) => a.weight - b.weight)
    .map((elem) => elem.value);
};

// setup for quiz
{
  quizzes.forEach((quiz) => {
    quiz.choices = shuffleArray(quiz.choices);
  });
  quizzes = shuffleArray(quizzes);

  const quizzesWrapperElement = document.querySelector(
    "." + CLASS_QUIZZES_WRAPPER
  );
  const choiceElement = document.querySelector("." + CLASS_CHOICE);
  const quizElement = document.querySelector("." + CLASS_QUIZ);

  quizzes.forEach((quiz, idx) => {
    const newElement = quizElement.cloneNode(true);
    const choiceWrapperElement = newElement.querySelector(
      "." + CLASS_CHOICE_WRAPPER
    );

    newElement.classList.remove(CLASS_HIDDEN);
    newElement.querySelector("." + CLASS_QUESTION_ID).textContent =
      "Q" + parseInt(idx + 1);
    newElement.querySelector("." + CLASS_QUESTION_TEXT).textContent =
      quiz.question;
    newElement.querySelector("." + CLASS_IMAGE).src = ASSET_PATH + quiz.imgPath;

    quiz.choices.forEach((choice) => {
      const newChoiceElement = choiceElement.cloneNode(true);
      newChoiceElement.classList.remove(CLASS_HIDDEN);
      newChoiceElement.querySelector("." + CLASS_CHOICE_TEXT).textContent =
        choice;
      choiceWrapperElement.appendChild(newChoiceElement);
    });

    if (quiz.reference) {
      newElement
        .querySelector("." + CLASS_REFERENCE)
        .classList.remove(CLASS_HIDDEN);
      newElement.querySelector("." + CLASS_REFERENCE_TEXT).textContent =
        quiz.reference;
    }
    quizzesWrapperElement.appendChild(newElement);
  });
}

// setup for showing answer
{
  const CORRECT_TITLE = "正解！";
  const INCORRECT_TITLE = "不正解...";
  const CORRECT_CLASS = "is-correct";
  const INCORRECT_CLASS = "is-incorrect";
  const SELECTED_CLASS = "is-selected";

  const quizElements = document.querySelectorAll("." + CLASS_QUIZ);

  const setProperTitle = (target, isCorrect) => {
    target.innerText = isCorrect ? CORRECT_TITLE : INCORRECT_TITLE;
  };

  const setProperClass = (target, isCorrect) => {
    // target.classList.remove(CORRECT_CLASS);
    // target.classList.remove(INCORRECT_CLASS);
    target.classList.add(isCorrect ? CORRECT_CLASS : INCORRECT_CLASS);
  };

  const setProperText = (target, quizIdx) => {
    target.innerText = quizzes[quizIdx].answer;
  };
  const setMultiDisabled = (targets) => {
    targets.forEach((target) => {
      target.disabled = true;
    });
  };

  let quizCounter = 0;
  quizElements.forEach((quizElement) => {
    if (quizElement.classList.contains(CLASS_HIDDEN)) {
      return;
    }
    const choices = quizElement.querySelectorAll("." + CLASS_CHOICE);
    const answer = quizElement.querySelector("." + CLASS_ANSWER);
    const answerTitle = quizElement.querySelector("." + CLASS_ANSWER_TITLE);
    const answerText = quizElement.querySelector("." + CLASS_ANSWER_TEXT);

    let quizIdx = quizCounter;
    choices.forEach((choice) => {
      choice.addEventListener("click", () => {
        const selectedText = choice.querySelector("." + CLASS_CHOICE_TEXT);
        const isCorrect = selectedText.textContent === quizzes[quizIdx].answer;

        setProperClass(answer, isCorrect);
        setProperTitle(answerTitle, isCorrect);
        setProperText(answerText, quizIdx);
        quizElement.classList.add(SELECTED_CLASS);
        choice.classList.add(SELECTED_CLASS);
        setMultiDisabled(choices);
      });
    });
    quizCounter++;
  });
}
