<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Convergencia</title>
  <link rel="stylesheet" href="/assets/css/vars.css">
  <link rel="stylesheet" href="/assets/css/normalize.css">
  <link rel="stylesheet" href="/assets/css/fonts.css">
  <link rel="stylesheet" href="/assets/css/typebase.css">
  <link rel="stylesheet" href="/assets/css/swipe-scroller.css">
  <link rel="stylesheet" href="/assets/css/containers.css">
  <link rel="stylesheet" href="/assets/css/nav-grid.css">
  
  <style>
    img {
      max-width: 100%;
      height: auto;
    }

    html {
      overflow : hidden;
      color: var(--main-text-color);
    }

    .hidden {
      display: none;
    }
  </style>
</head>

<?php include("include/helpers.php"); ?>
<?php include("include/nav.php"); ?>
<?php include("include/details.php"); ?>
<body>
  <div class="attract-mode-container js-attract-mode" hidden>
    <video
      class="js-attract-video"
      src="./assets/video/Video Attract Mode.mp4"
      muted
      loop
      playsinline
      preload="auto"
    ></video>
  </div>

  <!-- CONTENIDOS -->
  <div class="global-container"><!-- add class 'show-detail' to show detail view -->
    <!-- TOP BAR -->
    <div class="top-bar-container">
      <!-- <button class="js-back">Back</button> -->
    </div>

    <!-- MAIN NAV -->
    <div class="main-nav-container" data-component="MainNav">
      <div class="grid-container">
        <?php buildNavGrid(); ?>
      </div>
    </div>

    <!-- MAiN CONTENT -->
    <div class="detail-container swipe-scroller" id="SmoothScroll" data-component="SwipeScroller">
      <div class="track">
        <?php buildDetails(); ?>
      </div>
    </div>

    <!-- BOTTOM BAR -->
    <div class="bottom-bar-container show-homepage">
      <div class="homepage-icon">
        <img src="./assets/images/home.png" />
      </div>
      <div class="back-icon js-back">
        <img src="./assets/images/volver.png" />
      </div>
    </div>

  </div><!-- .global-container -->

  <!-- DEBUG -->
  <!-- <div class="debug-info-container js-debug"></div> -->
</body>

<!-- Componentes JS -->
<script type="text/javascript" src="./assets/js/swipe-scroller.js"></script>
<script type="text/javascript" src="./assets/js/main-nav.js"></script>

<!-- Main App -->
<script type="text/javascript" src="./assets/js/app.js"></script>


</html>
