<?php
if (isset($_POST['time'])) {
    $time = $_POST['time'];

    // Ambil log sebelumnya
    $logFile = 'log.json';
    $logs = [];

    if (file_exists($logFile)) {
        $logs = json_decode(file_get_contents($logFile), true);
        if (!is_array($logs)) {
            $logs = [];
        }
    }

    // Tambahkan log baru
    $logs[] = $time;

    // Simpan kembali
    file_put_contents($logFile, json_encode($logs, JSON_PRETTY_PRINT));
}
?>
