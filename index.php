<?php
$logs = [];
if (file_exists('log.json')) {
    $logs = json_decode(file_get_contents('log.json'), true);
    if (!is_array($logs)) $logs = [];
}
?>

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Timer Sederhana</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <div class="container">
        <h1>⏱️ Timer Sederhana</h1>
        <div class="result">
            <span id="hours">00</span>:
            <span id="minutes">00</span>:
            <span id="seconds">00</span>:
            <span id="milliseconds">00</span>
         </div>
        <div class="button">
            <button id="start">▶ Start</button>
            <button id="stop">❚❚ Stop</button>
            <button id="reset">↻ Reset</button>
        </div>
        <div class="log-container">

        <h2>📜 Log Waktu</h2>

        <ul id="time-log">
        <?php foreach ($logs as $log): ?>
        <li><?= htmlspecialchars($log) ?></li>
        <?php endforeach; ?>
      </ul>
      
    </div>
    </div>

    <script src="script.js"></script>


</body>
</html>
