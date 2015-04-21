enquire.register("screen and (max-width: 650px)", {
    match : function() {
       console.log('hello');
       jQuery('.nav-primary>div>ul').hide();
       jQuery('.nav-primary').addClass('respond');

		jQuery('.respond').click(function() {
	    console.log('click');
		
		jQuery('.respond').toggleClass('active');
		jQuery('.active>div>ul').show();  
		jQuery('.respond:not(".active")>div>ul').hide();
});
    },  
    unmatch : function() {
     jQuery('.nav-primary.respond').removeClass('respond');
     jQuery('.nav-primary>div>ul').show();
    }
});