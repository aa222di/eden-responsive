jQuery(document).ready(function() {

	jQuery('.lightbox').click(function(e) {
		var image;
		var alt;
		e.preventDefault();

		jQuery(this).addClass('current-image');
		image = jQuery(this).attr('href');
		alt = jQuery(this).attr('title');

		jQuery('.backdrop, .box').animate({'opacity': '.50'}, 300, 'linear');
		jQuery('.box').animate({'opacity': '1.00'}, 300, 'linear');
		jQuery('.box, .backdrop').css({"display": "block"});

		// Load the lightbox image
		loadLightbox(image, alt);
	});

	jQuery('.close').click(function(){
		closeBox();
	});

	jQuery('.backdrop').click(function(){
		closeBox();
	});

	jQuery('.prev').click(function() {
		newImage('prev');
	});
				
	jQuery('.next').click(function() {
		newImage('next');
	});

});

function closeBox() {
	jQuery('.backdrop, .box').animate({'opacity':'0'}, 300, 'linear', function(){
		jQuery('.backdrop, .box').css('display', 'none');
		jQuery('.lightbox-img').remove();
		jQuery('.current-image').removeClass('current-image');
	});
}

function center(element) {
	var ww = jQuery( window ).width();
	var bw = jQuery( element ).width();
	var left = (ww - bw) / 2;

	var wh = jQuery( window ).height();
	var bh = jQuery( element ).height();
	var top = (wh - bh) / 2;

	jQuery( element ).css({"top": top, "left": left});
}

function resize(element) {
        var maxWidth = (jQuery( window ).width()) * 0.9; // Max width for the image
        var maxHeight = (jQuery( window ).height()) * 0.9;    // Max height for the image
        var ratio = 0;  // Used for aspect ratio
        var width = jQuery( element ).width();    // Current image width
        var height = jQuery( element ).height();  // Current image height

        // Check if the current width is larger than the max
        if(width > maxWidth){
            ratio = maxWidth / width;   // get ratio for scaling image
            jQuery( element ).css("width", maxWidth); // Set new width
            jQuery( element ).css("height", height * ratio);  // Scale height based on ratio
            height = height * ratio;    // Reset height to match scaled image
            width = width * ratio;    // Reset width to match scaled image
        }

        // Check if current height is larger than max
        if(height > maxHeight){
            ratio = maxHeight / height; // get ratio for scaling image
            jQuery( element ).css("height", maxHeight);   // Set new height
            jQuery( element ).css("width", width * ratio);    // Scale width based on ratio
            width = width * ratio;    // Reset width to match scaled image
            height = height * ratio;    // Reset height to match scaled image
       }
    jQuery( element ).css({"width": width, "height": height});
}

// Reload lightbox
function loadLightbox(link, alt) {
	var image;

	if(jQuery('.lightbox-img')[0]) {
		jQuery('.lightbox-img').remove();
	}
	image = "<img src='" + link + "' alt='" + alt + "' class='lightbox-img'>";
	jQuery(image).appendTo('.box');
	jQuery('.lightbox-img').load(function() {
		resize('.lightbox-img');
		center('.box');
	});
	//jQuery('.lightbox-img').animate({'opacity': '1.00'}, 300, 'linear');

}

function newImage(direction) {
	var image;
	var child;
	var alt;
	var atag;
	var gallery;

	// Get previous / next a if exists
	if (direction === 'prev') {
		atag = jQuery('.current-image').prev();
	}
	else if (direction === 'next') {
		atag = jQuery('.current-image').next();
	}

	// If not get last/first image
if(!atag.length){
	gallery = jQuery('.current-image').parent().attr('class');
					
	if (direction === 'prev') {
		child = 'last';
	}
	else if (direction === 'next') {
		child = 'first';
	}
						
	image = jQuery("." + gallery + " > a:" + child + "-child").attr('href');
	alt = jQuery("." + gallery + " > a:" + child + "-child").attr('title');
	jQuery('.current-image').removeClass('current-image');
	jQuery("." + gallery + " > a:" + child + "-child" ).addClass('current-image');
}

else {
	image = atag.attr('href');
	alt = atag.attr('title');
	jQuery('.current-image').removeClass('current-image');
	jQuery(atag).addClass('current-image');
						
}
loadLightbox(image, alt);
}



