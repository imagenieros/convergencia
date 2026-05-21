<?php
    function custom_scandir($folder) {
        return array_filter(scandir($folder), function($item) {
            return $item !== '.' && $item !== '..' && $item !== 'index.php';
        });
    }

    function rewriteImagePaths($html, $folder) {
        // Reescribe rutas relativas de imágenes
        // Busca src="algo.ext" donde "algo" no tenga /
        return preg_replace(
            '/src="([^\/"]+\.(png|jpg|jpeg|gif|webp))"/i',
            'src="content/' . $folder . '/$1"',
            $html
        );
    }