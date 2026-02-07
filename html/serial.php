<?php
// Los números
$num1 = $_GET['pin'];
$num2 = $_GET['value'];

// Cadena terminada en LF
$cadena = $num1 . " " . $num2 . "\n";


if(PHP_OS_FAMILY === "Windows") {
    $puerto = "COM5:";
    
    // Abrir puerto
    $fp = fopen("\\\\.\\$puerto", "w+");
    if (!$fp) {
        die("No se pudo abrir $puerto\n");
    }

    // Configurar con `mode` (fuera de PHP, en consola CMD o con exec)
    exec("mode $puerto BAUD=9600 PARITY=N data=8 stop=1 xon=off");

    fwrite($fp, $cadena);
    fclose($fp);

} else {
    // Puerto serial en Linux (cambiá según corresponda: /dev/ttyS0, /dev/ttyUSB0, etc)
    $puerto = "/dev/ttyUSB0";
    
    // Configuración del puerto (baudrate, etc.)
    // Podés setearlo antes de abrir con stty
    exec("stty -F $puerto 9600 raw -echo");

    // Abrir el puerto en modo escritura
    $fp = fopen($puerto, "w+");
    if (!$fp) {
        die("No se pudo abrir el puerto $puerto\n");
    }

    // Envío al puerto
    fwrite($fp, $cadena);
    fclose($fp);
}

echo "OK";
