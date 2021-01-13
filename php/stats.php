<?php
  $organisations = [
    'DiogoTheCoder',
    'lendingworks',
    'coval-solutions',
  ];

  $repos = [];
  foreach ($organisations as $organisation) {
    $json = json_decode(curl_get_contents("https://api.github.com/users/${organisation}/repos"), true);
    $repos = array_merge($repos, $json);
  }

  $_SESSION["GITHUB_NUM_OF_PROJECTS"] = count($repos);

  $totalLinesOfCode = 0;
//  foreach ($repos as $repo) {
//    $languages = json_decode(curl_get_contents("https://api.github.com/repos/${repo['full_name']}/languages"), true);
//    foreach ($languages as $language) {
//      $totalLinesOfCode += $language;
//    }
//  }

  //$_SESSION["GITHUB_NUM_OF_LINES_OF_CODE"] = $totalLinesOfCode;

  $now = new DateTime(null, new DateTimeZone('Europe/London'));
  $start_date = new DateTime('2012-01-01');
  $sixteenth_birthday = new DateTime('2014-11-07');
  $num_of_days_between = $now->diff($sixteenth_birthday)->format('%a');

function curl_get_contents($url): string
  {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_USERAGENT, 'DiogoTheCoder');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
      'Authorization: Bearer cdc30af3f2f09e7a7d10aeaba5d52e3154595a8f'
    ]);
    $data = curl_exec($ch);
    curl_close($ch);
    return $data;
  }
?>