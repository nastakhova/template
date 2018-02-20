jQuery(function(){
	initMobileNav();
});


function initMobileNav(){
	jQuery('.btn-menu').each(function(){
		var btn = jQuery(this);
		var holder = jQuery('body');
		var flag = true;

		btn.on('click', function(e){
			e.preventDefault();
			if(flag) {
				flag = false;
				holder.addClass('active-menu');
			} else {
				flag = true;
				holder.removeClass('active-menu');
			}
		})
	})
}