<?php 

function buildDetails() {
    $allfiles = custom_scandir('content');

    foreach ($allfiles as $folder) {
        $detailsFolder = "content/$folder/content.html";

        // if($folder === '03') {
            echo '<!-- Content for folder '. $folder .'-->';
            echo '<div class="detail-content js-content hidden" data-id="folder-'. $folder .'">';
                include($detailsFolder);
            echo '</div>';
        // }

    }

}