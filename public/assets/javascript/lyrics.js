jQuery(document).ready(function($) {
  (function(){
	  // setup your carousels as you normally would using JS
	  // or via data attributes according to the documentation
	  // http://getbootstrap.com/javascript/#carousel
	  $('#carousel123').carousel({ interval: 7000 });
	  //$('#carouselABC').carousel({ interval: 3600 });
	}());

	(function(){
	  $('.carousel-showmanymoveone .item').each(function(){
	    var itemToClone = $(this);

	    for (var i=1;i<2;i++) {
	      itemToClone = itemToClone.next();

	      // wrap around if at end of item collection
	      if (!itemToClone.length) {
	        itemToClone = $(this).siblings(':first');
	      }

	      // grab item, clone, add marker class, add to collection
	      itemToClone.children(':first-child').clone()
	        .addClass("cloneditem-"+(i))
	        .appendTo($(this));
	    }
	  });
	}());
	// ACtive Link on Navbar
	// $(".nav a").on("click", function(){
	//   $(".nav").find(".active").removeClass("active");
	//   $(this).parent().addClass("active");
	// });

	var url = window.location;
	// Will only work if string in href matches with location
	//$('ul.nav a[href="'+ url +'"]').parent().addClass('active');

	// Will also work for relative and absolute hrefs
	$('ul.nav a').filter(function() {
	    return this.href == url;
	}).parent().addClass('active');
});