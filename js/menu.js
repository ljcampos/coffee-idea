$(document).ready(function(){
	$('#toggle-menu').on('click',function(e){
		e.preventDefault();
		$('.menu-items').slideToggle();
	});
});
