<?php
// Los números
$turn_on_pin = $_GET['pin'];
$turn_on_value = $_GET['value'];

if ($turn_on_pin == 0) {
    // si el pin es 0, se pone en modo demo. En este modo, la cadena es "0 0\n".
    $cadena .= "0 0\n";
} else {
    // Construir la cadena a enviar al puerto serial, usando una linea para cada pin del 2 al 13, y terminando cada linea con un (LF)
    // si el pin coincide con turn_on_pin, se envía turn_on_value, sino se envía 0. Por ejemplo, si turn_on_pin=5 y turn_on_value=255, la cadena sería:
    // 1 0
    // 2 0
    // 3 0
    // 4 0
    // 5 255
    // 6 0
    // 7 0
    // 8 0
    // 9 0
    // 10 0
    // 11 0
    // 12 0
    // 13 0

    $cadena = "";
    for ($i = 2; $i <= 13; $i++) {
        if ($i == $turn_on_pin) {
            $cadena .= "$i $turn_on_value\n";
        } else {
            $cadena .= "$i 0\n";
        }
    }
}

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
