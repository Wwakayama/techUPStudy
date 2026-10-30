<?php
header('Cache-Control: no-store');

// Cookieがなければ、名前は空にする。
$name = $_COOKIE['assignment_name'] ?? '';
if (!is_string($name)) {
    $name = '';
}
$message = $name === '' ? '' : '保存した名前は、保存から10秒後に削除されます。';

// 「保存」ボタンが押されたときに実行する。
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $input = $_POST['name'] ?? '';

        // 空欄や半角スペースだけの入力なら、例外を発生させる。
        if (!is_string($input) || trim($input) === '') {
            throw new Exception('システムエラー：名前を入力してください。');
        }

        $name = trim($input);

        // 有効期限を指定し、ブラウザを閉じても期限までは保存する。
        // time() + 10 は「現在から10秒後」。
        if (!setcookie('assignment_name', $name, time() + 10, '/')) {
            throw new Exception('システムエラー：Cookieを送信できませんでした。');
        }

        // 再読み込みでフォームが再送信され、期限が延びるのを防ぐ。
        header('Location: ./name_form.php', true, 303);
        exit;
    } catch (Exception $e) {
        // throwされた例外を受け取り、メッセージを表示する。
        $name = '';
        $message = $e->getMessage();
    }
}
?>