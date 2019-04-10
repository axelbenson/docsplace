$(document).ready(function() {
    $(".js-example-basic-multiple").select2({
    tags: true,
    tokenSeparators: [',', ' ']
});
});
	function elasticArea() {
    $('.js-elasticArea').each(function(index, element) {
       var elasticElement = element,
          $elasticElement = $(element),
          initialHeight = initialHeight || $elasticElement.height(),
          delta = parseInt( $elasticElement.css('paddingBottom') ) + parseInt( $elasticElement.css('paddingTop') ) || 0,
          resize = function() {
            $elasticElement.height(initialHeight);
            $elasticElement.height( elasticElement.scrollHeight - delta );
        };
      
      $elasticElement.on('input change keyup', resize);
      resize();
    });
    
  	};
  	elasticArea();