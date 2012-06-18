$(document).ready(function() {
	$("img").hover(
		function() {
			$(this).css("opacity", 0.7);
		},
		function() {
			$(this).css("opacity", 1);
		}
	);
	$("header").click(function() {
		window.location.replace("http://nikolaus-piccolotto.info");
	});
	$(".social").tooltip();
});