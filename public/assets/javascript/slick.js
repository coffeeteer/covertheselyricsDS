$(document).ready(function() {
	// $('.lyric-container').slick({
	//   infinite: true,
	//   slidesToShow: 3,
	//   slidesToScroll: 3
	// });

	$('#carousel').slick({
    arrows: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed:2500,
    speed: 500,
    variableWidth: true,
    onAfterChange: function(){ 
          var cat = ($('#carousel').slickCurrentSlide()) + 1;
          $('.client-text > li').hide();
          $('.client-text > li:nth-child('+ cat +')').show();
    }
});



  $('.client-text > li').hide();
  $('.client-text > li:first-child').show();
});

