'use strict';

// HTMLの各要素を取得
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const secondInput = document.getElementById('second');

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const resetButton = document.getElementById('reset-button');
const message = document.getElementById('message');

// 残り時間を秒で管理する変数
let remainingSeconds = 0;

// setIntervalを管理する変数
let timerId = null;

// 残り秒数を「時：分：秒」に変換して表示する関数
function updateDisplay() {
const hours = Math.floor(remainingSeconds / 3600);
const minutes = Math.floor((remainingSeconds % 3600) / 60);
const seconds = remainingSeconds % 60;

// 1桁の場合は先頭に0を付ける
const displayHours = String(hours).padStart(2, '0');
const displayMinutes = String(minutes).padStart(2, '0');
const displaySeconds = String(seconds).padStart(2, '0');

    timerDisplay.textContent =
        displayHours + ':' + displayMinutes + ':' + displaySeconds;
}

// 入力された時間を合計秒数へ変換する関数
    function setTimeFromInput() {
        const hours = Number(hourInput.value) || 0;
        const minutes = Number(minuteInput.value) || 0;
        const seconds = Number(secondInput.value) || 0;

    remainingSeconds =
        hours * 3600 +
        minutes * 60 +
        seconds;

    updateDisplay();
}
// スタートボタンをクリックしたときの処理
startButton.addEventListener('click', function () {

// タイマーがすでに動いている場合は、重ねて動かさない
    if (timerId !== null) {
        return;
    }

// 残り時間が0の場合は、入力欄から時間を取得する
    if (remainingSeconds <= 0) {
        setTimeFromInput();
    }

// 入力時間が0秒の場合はタイマーを開始しない
    if (remainingSeconds <= 0) {
        message.textContent = '時間を入力してください。';
        return;
    }

// メッセージを空にする
    message.textContent = '';

// 1秒ごとに残り時間を減らす
    timerId = setInterval(function () {
        remainingSeconds--;

// 減らした時間を画面に表示
        updateDisplay();

// 残り時間が0になったときの処理
        if (remainingSeconds <= 0) {
            clearInterval(timerId);
            timerId = null;

            remainingSeconds = 0;
            updateDisplay();

            message.textContent = '時間になりました！';
        }
        else {
            message.textContent = 'カウントダウン中です。';
        }
    }, 1000);
});
// ストップボタンをクリックしたときの処理
stopButton.addEventListener(`click`,function(){

    // タイマーが動いている場合は停止する
    if(timerId !== null){
        clearInterval(timerId);
        timerId = null;

        message.textContent = 'タイマーを停止しました。';
    }
});
// リセットボタンをクリックしたときの処理
resetButton.addEventListener('click', function () {

    // 動いているタイマーを停止する
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }

    // 入力欄の時間を読み直して表示する
    setTimeFromInput();

    // メッセージを空にする
    message.textContent = 'リセットしました。';
});
// 入力欄の初期値をタイマーへ表示する
setTimeFromInput();