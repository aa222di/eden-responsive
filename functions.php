<?php
//* Start the engine
include_once( get_template_directory() . '/lib/init.php' );

//* Child theme (do not remove)
define( 'CHILD_THEME_NAME', 'Genesis Sample Theme' );
define( 'CHILD_THEME_URL', 'http://www.studiopress.com/' );
define( 'CHILD_THEME_VERSION', '2.1.2' );

add_action('after_setup_theme', 'eden_theme_setup', 9 );

//* EDEN BASIC *//
define( 'EDEN_PATH', get_stylesheet_directory_uri() );

//* Enqueue Google Fonts
add_action( 'wp_enqueue_scripts', 'genesis_sample_google_fonts' );
function genesis_sample_google_fonts() {

	wp_enqueue_style( 'google-fonts', '//fonts.googleapis.com/css?family=Lato:300,400,700', array(), CHILD_THEME_VERSION );

}

//* Add HTML5 markup structure
add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list' ) );

//* Add viewport meta tag for mobile browsers
add_theme_support( 'genesis-responsive-viewport' );

//* Add support for custom background
add_theme_support( 'custom-background' );

//* Add support for 3-column footer widgets
add_theme_support( 'genesis-footer-widgets', 3 );

function eden_theme_setup() {
	// Enqueue Livereload
	add_action( 'wp_enqueue_scripts', 'eden_livereload' );
	add_action( 'wp_enqueue_scripts', 'eden_scripts' );
}

function eden_livereload() {
	if (in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1', '::1'))) {
	  wp_register_script('livereload', 'http://localhost:35729/livereload.js?snipver=1', null, false, true);
	  wp_enqueue_script('livereload');
	}
}

function eden_scripts() {
	wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', "http" . ( $_SERVER['SERVER_PORT'] == 443 ? "s" : "" ) . "://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js",  array(), false, true );
    wp_enqueue_script( 'jquery' );
	wp_register_script('scripts',  EDEN_PATH . '/dist/js/scripts.min.js', null, false, true);
	wp_enqueue_script('scripts');	
}