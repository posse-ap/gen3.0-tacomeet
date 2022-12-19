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
  print_r($questions);
} catch (PDOException $e) {
  echo 'Connection failed: ' . $e->getMessage();
  exit();
}
?>
