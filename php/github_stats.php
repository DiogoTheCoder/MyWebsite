<?php
  $json = json_decode(curl_get_contents("https://api.github.com/users/DiogoTheCoder/repos"), true);
  $_SESSION["GITHUB_NUM_OF_PROJECTS"] = count($json);

  $json = json_decode(curl_get_contents("https://api.github.com/users/lendingworks/repos"), true);
  $_SESSION["GITHUB_NUM_OF_PROJECTS"] += count($json);

  $json = json_decode(curl_get_contents("https://api.github.com/users/coval-solutions/repos"), true);
  $_SESSION["GITHUB_NUM_OF_PROJECTS"] += count($json);

  $now = new DateTime(null, new DateTimeZone('Europe/London'));
  $start_date = new DateTime('2012-01-01');
  $_SESSION["YRS_XP"] = $now->diff($start_date)->y;

  function curl_get_contents($url)
  {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_USERAGENT, 'DiogoTheCoder');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
  }
?>