<?php
/* ドライバ呼び出しを使用して MySQL データベースに接続する */
// $dsn = 'mysql:dbname=posse;host=127.20.0.4;';
// hostのところはcontainer nameにする
$dsn = 'mysql:dbname=posse;host=db;';
$user = 'root';
$password = 'root';

try {
  $dbh = new PDO($dsn, $user, $password);
  $dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $sql = 'SELECT id, content FROM questions ORDER BY id';
  $questions = $dbh->query("SELECT * FROM questions")->fetchAll(PDO::FETCH_ASSOC);
  $choices = $dbh->query("SELECT * FROM choices")->fetchAll(PDO::FETCH_ASSOC);
  $question_ids = array_column($questions, 'id');
  foreach ($choices as $key => $choice) {
    $index = array_search($choice["question_id"], $question_ids);
    $questions[$index]["choices"][] = $choice;
  }
} catch (PDOException $e) {
  echo 'Connection failed: ' . $e->getMessage();
  exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Quiz</title>
  <!-- stylesheet -->
  <link rel="stylesheet" href="../sass/common.css" />
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&family=Plus+Jakarta+Sans:wght@400;700&display=swap" rel="stylesheet" />
  <script src="../scripts/quiz.js" defer></script>
</head>

<body>
  <header class="l-header p-header">
    <a href="#" class="l-header__logo p-header__logo">
      <img src="../assets/img/logo.svg" alt="POSSE" />
    </a>
    <nav class="p-header__nav">
      <ul class="l-header__nav__list p-header__nav__list">
        <li class="p-header__nav__item">POSSEとは</li>
        <li class="p-header__nav__item">クイズ</li>
        <li class="p-header__nav__item">
          <ul class="p-sns p-header__sns__list">
            <li class="p-sns__item">
              <a href="#" class="p-sns__item__link"><i class="u-icon__twitter"></i></a>
            </li>
            <li class="p-sns__item">
              <a href="#" class="p-sns__item__link"><i class="u-icon__instagram"></i></a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </header>
  <main class="l-main">
    <section class="p-quiz-hero">
      <span class="p-quiz-hero__caption">POSSE課題</span>
      <h1 class="p-quiz-hero__heading">ITクイズ</h1>
    </section>
    <section class="p-quiz-main js-quizzesWrapper">

      <?php for ($i = 0; $i < count($questions); $i++) { ?>
        <h2 class="p-quiz-box__question__title">
          <span class="p-quiz-box__label">Q<?= $i + 1 ?></span>
          <span class="p-quiz-box__question__title__text"><?= $questions[$i]["content"]; ?></span>
        </h2>
        <section class="p-quiz-main__content u-state__hidden js-quiz">
          <div class="p-quiz-main__question">
            <h2 class="u-en p-quiz-main__question__id js-quizQuestionID"></h2>
            <div class="p-quiz-main__question__text js-quizQuestionText"></div>
          </div>
          <picture class="p-quiz-main__image">
            <img class="js-quizImage" alt="quiz image" src=<?= $questions[$i]["image"]; ?>/>
          </picture>
          <div class="p-quiz-main__choice">
            <h2 class="u-en p-quiz-main__choice__id">A</h2>
            <div class="p-quiz-main__choice__list js-quizChoiceWrapper">
              <?php for ($j = 0; $j < count($questions[$i]["choices"]); $j++) { ?>
                <button class="p-quiz-main__choice__item u-state__hidden js-quizChoice">
                  <span class="p-quiz-main__choice__item__text js-quizChoiceText"><?= $questions[$i]["choices"][$j]["name"]; ?></span><i class="u-icon__arrow"></i>
                </button>
              <?php } ?>
            </div>
            <div class="p-quiz-main__choice__answer js-quizAnswer u-state__hidden">
              <span class="p-quiz-main__choice__answer__title js-quizAnswerTitle"></span>
              <div class="p-quiz-main__choice__answer__wrapper">
                <span class="p-quiz-main__choice__answer__id u-en">A</span><span class="p-quiz-main__choice__answer__text js-quizAnswerText"></span>
              </div>
            </div>
            <div class="p-quiz-main__choice__reference u-state__hidden js-quizReference">
              <i class="u-icon__note"></i><cite class="p-quiz-main__choice__reference__text js-quizReferenceText"></cite>
            </div>
          </div>
        </section>
      <?php } ?>
    </section>
  </main>
  <section class="l-line p-line">
    <div class="p-line__wrapper">
      <div class="p-line__title">
        <i class="u-icon__line"></i><span class="p-line__title__text"> POSSE 公式LINE </span>
      </div>
      <p class="p-line__content">
        公式LINEにてご質問を随時受け付けております。<br />
        詳細やPOSSE最新情報につきましては、公式LINEにてお知らせ致しますので<br />
        下記ボタンより友達追加をお願いします！
      </p>
      <a href="#" class="p-line__link">LINE追加<i class="u-icon__link"></i></a>
    </div>
  </section>
  <footer class="l-footer p-footer">
    <div class="p-footer__upper">
      <picture class="p-footer__logo">
        <img src="../assets/img/logo.svg" alt="logo" />
      </picture>
      <div class="p-footer__website-link">
        POSSE 公式サイト <i class="u-icon__link"></i>
      </div>
      <ul class="p-sns p-footer__sns">
        <li class="p-sns__item">
          <a href="#" class="p-sns__item__link"><i class="u-icon__twitter"></i></a>
        </li>
        <li class="p-sns__item">
          <a href="#" class="p-sns__item__link"><i class="u-icon__instagram"></i></a>
        </li>
      </ul>
    </div>
    <div class="p-footer__lower">
      <div class="p-footer__copy u-en">©︎2022 POSSE</div>
    </div>
  </footer>
</body>

</html>