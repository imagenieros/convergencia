<?php
    function custom_scandir($folder) {
        return array_filter(scandir($folder), function($item) {
            return $item !== '.' && $item !== '..' && $item !== 'index.php';
        });
    }

    function rewriteImagePaths($html, $folder) {
        // Reescribe rutas relativas de imágenes del contenido para que apunten
        // siempre a la carpeta del módulo actual, incluso cuando vienen desde
        // subcarpetas como assets/.
        return preg_replace(
            '/src="((?!\/|https?:\/\/|data:)[^"]+\.(png|jpg|jpeg|gif|webp|svg))"/i',
            'src="content/' . $folder . '/$1"',
            $html
        );
    }
