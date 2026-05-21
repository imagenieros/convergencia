<?php 

//Probaremos reescribir las rutas de los archivos de imagen con este añadido de funciones que me sugirio Copilot:
function rewriteImagePaths($html, $folder) {
    // Reescribe rutas relativas de imágenes
    // Busca src="algo.ext" donde "algo" no tenga /
    return preg_replace(
        '/src="([^\/"]+\.(png|jpg|jpeg|gif|webp))"/i',
        'src="content/' . $folder . '/$1"',
        $html
    );
}
//

function buildDetails() {
    $allfiles = custom_scandir('content');

    foreach ($allfiles as $folder) {
        $detailsFolder = "content/$folder/content.html";

        // if($folder === '03') {
            echo '<!-- Content for folder '. $folder .'-->';
            echo '<div class="detail-content js-content hidden" data-id="folder-'. $folder .'">';
                // Esta es la linea original que muestra directamente el contenido de content.html
                // La comentamos ...
                //include($detailsFolder);
                // ... y reemplazamos por ete codigo que reescribe las rutas

                // Leemos el HTML como texto
            $html = file_get_contents($detailsFolder);

            // Reescribimos rutas de imágenes
            $html = rewriteImagePaths($html, $folder);

            // Lo imprimimos
            echo $html;

            // Aqui seguimos con la app original...
            echo '</div>';
        // }

    }

}