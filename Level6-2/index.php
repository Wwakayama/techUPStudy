<?php
date_default_timezone_set('Asia/Shanghai');//タイムゾーンを設定
$now = date("Y/m/d H:i:s");
echo "今の時間は: " . $now . "<br>" . PHP_EOL;
$yesterday1 = date("Y/m/d H:i:s", strtotime("-1 day"));// 1日前の日時を取得
echo "昨日の時間は: " . $yesterday1 . "<br>" . PHP_EOL;

$tomorrow = new DateTime('+1 day');// DateTimeオブジェクトを作成
echo "明日の時間は: " . $tomorrow->format('Y/m/d H:i:s') ."<br>" . PHP_EOL;

$nextWeek = date("Y/m/d H:i:s", strtotime("+1 week"));//strtotimeで1週間後の日時を取得
echo "1週間後の時間は: " . $nextWeek . "<br>" . PHP_EOL;

$threeMonthsLater = new DateTime('+3 months');// DateTimeオブジェクトを作成
echo "3か月後の時間は: " . $threeMonthsLater->format('Y/m/d H:i:s') ."<br>" . PHP_EOL;

$today = new DateTime('today');
$threeMonthsLater = new DateTime('today +3 months');

$difference = $today->diff($threeMonthsLater);

echo "今日から: " . $difference->days . "日後です。";