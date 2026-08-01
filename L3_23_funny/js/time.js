'use strict';

// 3つの画面を取得
const setupScreen = document.getElementById('setup-screen');
const runningScreen = document.getElementById('running-screen');
const finishedScreen = document.getElementById('finished-screen');

// 時間の入力欄を取得
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const secondInput = document.getElementById('second');

// 表示部分を取得
const timerDisplay = document.getElementById('timer');
const inputMessage = document.getElementById('input-message');

// ボタンを取得
const startButton = document.getElementById('start-button');
const pauseButton = document.getElementById('pause-button');
const resetButton = document.getElementById('reset-button');

// 残り時間を秒で管理
let remainingSeconds = 0;

// setIntervalを管理
let timerId = null;

// 表示する画面を切り替える関数
function showScreen(screenName) {
    setupScreen.hidden = screenName !== 'setup';
    runningScreen.hidden = screenName !== 'running';
    finishedScreen.hidden = screenName !== 'finished';
}

// 残り秒数を「時：分：秒」に変換して表示する関数
function updateDisplay() {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

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

// スタートボタンを押したとき
startButton.addEventListener('click', function () {
    setTimeFromInput();

    // 入力時間が0秒の場合
    if (remainingSeconds <= 0) {
        inputMessage.textContent = '時間を入力してください。';
        return;
    }

    inputMessage.textContent = '';
    showScreen('running');
});

// 最初は時間セット画面を表示する
showScreen('setup');
// カウントダウンを開始する関数
function startCountdown() {

    // 二重にタイマーが動くのを防ぐ
    if (timerId !== null) {
        return;
    }

    pauseButton.textContent = '一時停止';

    // 1秒ごとに残り時間を1秒減らす
    timerId = setInterval(function () {
        remainingSeconds--;
        updateDisplay();

        // 0秒になったらタイマーを終了する
        if (remainingSeconds <= 0) {
            clearInterval(timerId);
            timerId = null;

            remainingSeconds = 0;
            updateDisplay();

            showScreen('finished');
        }
    }, 1000);
}

// スタートボタンを押したとき
startButton.addEventListener('click', function () {
    setTimeFromInput();

    // 入力時間が0秒の場合は開始しない
    if (remainingSeconds <= 0) {
        inputMessage.textContent = '時間を入力してください。';
        return;
    }

    inputMessage.textContent = '';

    // カウントダウン画面を表示
    showScreen('running');

    // カウントダウン開始
    startCountdown();
});

// 一時停止ボタンを押したとき
pauseButton.addEventListener('click', function () {

    // 動いている場合は一時停止
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;

        pauseButton.textContent = '再開';
    } else {
        // 止まっている場合は再開
        startCountdown();
    }
});

// リセットボタンを押したとき
resetButton.addEventListener('click', function () {

    // 念のため動いているタイマーを停止
    if (timerId !== null) {
        clearInterval(timerId);
        timerId = null;
    }

    remainingSeconds = 0;
    inputMessage.textContent = '';
    pauseButton.textContent = '一時停止';

    // 時間セット画面へ戻る
    showScreen('setup');
});

// 最初は時間セット画面を表示する
showScreen('setup');