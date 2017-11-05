import $ from 'jquery'
/*
	Dropdown with Multiple checkbox select with jQuery - May 27, 2013
	(c) 2013 @ElmahdiMahmoud
	license: https://www.opensource.org/licenses/mit-license.php
*/

$(".dropdown dt a").on('click', function() {
    $(".dropdown dd ul").slideToggle('fast');
  });
  
  $(".dropdown dd ul li a").on('click', function() {
    $(".dropdown dd ul").hide();
  });
  
  function getSelectedValue(id) {
    return $("#" + id).find("dt a span.value").html();
  }
  
//   $(document).bind('click', function(e) {
//     var $clicked = $(e.target);
//     if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
//   });
