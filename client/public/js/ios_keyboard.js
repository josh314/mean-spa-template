(function() {
	'use strict';
	/*********************** iOS keyboard bug hack **************************/
	// Fix mobile floating toolbar when input is focused
	$(function() {
	  if(/iPhone|iPod|Android|iPad/.test(window.navigator.platform)){
	    $(document)
	    .on('focus', 'textarea,input,select', function(e) {
	    $('.navbar.navbar-fixed-top').css('position', 'absolute');
	    })
	    .on('blur', 'textarea,input,select', function(e) {
	    $('.navbar.navbar-fixed-top').css('position', '');
	    });
	  }
	});
})();