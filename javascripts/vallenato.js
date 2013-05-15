/*!
 * Vallenato 1.0
 * A Simple JQuery Accordion
 *
 * Designed by Switchroyale
 *
 * Use Vallenato for whatever you want, enjoy!
 */
vallenato = function()
{
	//Add Inactive Class To All Accordion Headers
	$('.accordion-header').toggleClass('inactive-header');

	//Set The Accordion Content Width
	var contentwidth = $('.accordion-header').width();
	$('.accordion-content').css({'width' : contentwidth });

	//Open The First Accordion Section When Page Loads
    if (window.location.hash.length == 0){
	  $('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
	  $('.accordion-content').first().slideDown().toggleClass('open-content');
    } else {
      $(window.location.hash).toggleClass('active-header').toggleClass('inactive-header');
   	  $(window.location.hash).next().slideDown().toggleClass('open-content');
    }

	// The Accordion Effect
	$('.accordion-header').click(function () {
      if ($(this).next()[0].innerHTML.length > 0) {
		if($(this).is('.inactive-header')) {
			$('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
			$(this).toggleClass('active-header').toggleClass('inactive-header');
			$(this).next().slideToggle().toggleClass('open-content');
		}

		else {
			$(this).toggleClass('active-header').toggleClass('inactive-header');
			$(this).next().slideToggle().toggleClass('open-content');
		}
      }
	});
    $('.accordion-content').each(function(i, elem){
      if (elem.innerHTML.length == 0) {
          $(elem).addClass('without_content');
          $(elem).prev().addClass('without_content');
      }
    });

	return false;
};
