/*****************************************************************************************
	* jQuery plug-in
	* Flickr Photo Gallery
	* Developed by J.P. Given (http://johnpatrickgiven.com)
	* Useage: anyone so long as credit is left alone...oh and get your own API key ;)
******************************************************************************************/

var flickrhelpers = null;

(function(jQuery) {

	jQuery.fn.flickrGallery = function(args) {

		var $element = jQuery(this), // reference to the jQuery version of the current DOM element
		    element = this;         // reference to the actual DOM element

		// Public methods
		var methods = {
			init : function () {
				// Extend the default options
				settings = jQuery.extend({}, defaults, args);

				// Make sure the api key and setID are passed
				if (settings.flickrKey === null || (settings.flickrSet === null && settings.flickrUser === null)) {
					alert('You must pass an API key and a Flickr setID');
					return;
				}

				// init the image loader and set values
				$("body").append('<div id="flickr_loader"></div>');
				$("#flickr_loader").css({
					"width"            : element.width(),
					"height"           : element.height(),
				});

				// CSS jqfobject overflow for aspect ratio
				element.css("overflow","hidden");

                // Set navigation click event:
                console.log(settings.flickrUser);
                console.log(settings.flickrKey);

               if (!(settings.flickrUser === null)) {
                    $.getJSON("https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getList&user_id=" + 
                    	settings.flickrUser + "&api_key=" + settings.flickrKey + "&jsoncallback=?", function(flickrData){
                        var length = flickrData.photosets.total;
                        Photo_sort = flickrData.photosets.photoset.sort(function(a,b){
                          return a.title._content < b.title._content? -1 : 1;
                        });
                        $("#container i").before('<div id="flickr_sets" class="box"></div>');
                        var sets = $("#flickr_sets");
                        var espetaculos = true;
                        var eventos = true;
                        var outras = true;
                        for (i=0; i<length; i++) {
                            var photoset = Photo_sort[i];
                            if(photoset.title._content.search(/\*/) >= 0){
                                if(espetaculos){
                                  espetaculos = false;
                                  sets.append('<div id="eventos"></div>');
                                  $('#eventos').append('<h2>Eventos</h2>');
                                }
                            } else if(photoset.title._content.search(/[#\-]/) >= 0){
                              if(eventos){
                                eventos = false;
                                sets.append('<div id="espetaculos"></div>');
                                $('#espetaculos').append("<h2>Espetáculos</h2>");
                              }
                            } else if(outras) {
                              outras = false;
                              sets.append('<div id="outras"></div>');
                              $('#outras').append('<h2>Aulas e Ensaios</h2>');
                            }
                            var args = "flickrSet=" + photoset.id;
							
							sets.append("<div class='mosaic-block bar' id='"+photoset.id+"'></div>");
                            $('#'+photoset.id+'.mosaic-block').append("<a href='?"+args+"' title='"+ photoset.description._content +"' class='mosaic-overlay' id='"+photoset.id+"'></a>");
                            $('#'+photoset.id+'.mosaic-overlay').append("<div class='details' id='"+photoset.id+"'></div>");
                            $('#'+photoset.id+'.details').append("<h4>"+photoset.title._content+"</h4>");
        					$('#'+photoset.id+'.mosaic-overlay').after("<div class='mosaic-backdrop' id='"+photoset.id+"'></div>");

                            $.getJSON("https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=" + photoset.id + "&extras=date_upload&api_key=" + settings.flickrKey + "&jsoncallback=?", function(flk){
                                /*console.log(flk.photoset);*/
                                last_photo = flk.photoset.photo.length - 1;
                                
 								var photoURL = 'http://farm' + flk.photoset.photo[last_photo].farm + '.' + 
 								'static.flickr.com/' + flk.photoset.photo[last_photo].server + '/' + 
 								flk.photoset.photo[last_photo].id + '_' + flk.photoset.photo[last_photo].secret +'.jpg';
								                                
                                 $('#'+flk.photoset.id+'.mosaic-backdrop').append("<img width='250' height='250' src="+ photoURL+"/>");	
                            });
                        }
                        if (settings.flickrSet === null)
                           settings.flickrSet = flickrData.photosets.photoset[0].id;
                        loadFlickrSet();
                    });
                } else {
                    loadFlickrSet();
                }
			}
		}
		setSlideImage = function(imagem, titulo, max_imagens){
			$('#slider .slides').append("<li class='slide-flex-fotos'></li>");
			if($('#slider .slides > li [src="'+ imagem +'"]').empty()) {
		      $('#slider .slides li').append("<img id='thsImage' alt="+ titulo +" title="+titulo+" src="+ imagem +">");
			}
		 	
		 	$('#carousel .slides').append("<li class='slide-flex-fotos'></li>");
		 	if($('#carousel .slides > li [src="'+ imagem +'"]').empty()) {
			  $('#carousel .slides li').append("<img id='thsImage' alt="+ titulo +" title="+titulo+" src="+ imagem +">");
	     	}
		}
		verificaQuantiadedeImagensARemover = function(max_imagens){
			listas = $(".slide-flex-fotos");
	     	quantidade_de_imagens = listas.children().length;
	     	if (quantidade_de_imagens > max_imagens){
	     	  total_de_imagens_a_remover = (quantidade_de_imagens - max_imagens);
	     	}
	     	var i = 0;
	     	while(i < total_de_imagens_a_remover){
	     		lista = listas[i];
				removerImagem(lista);
			    i++;
			}	   
	     }
	     removerImagem = function(lista){
	     	while($(lista).children().length > 1){
	     	  $(lista).children().last().remove();
	     	};
	     }

        loadFlickrSet = function() {
				// Get the Flickr Set :)
				$.getJSON("https://api.flickr.com/services/rest/?format=json&method=flickr.photosets.getPhotos&photoset_id=" + 
					settings.flickrSet + "&api_key=" + settings.flickrKey + "&jsoncallback=?", function(flickrData){

					var length = flickrData.photoset.photo.length;
					var thumbHTML = '';

					$('#flickr_sets').before("<div id='slider-fotos'></div>");
					$('#slider-fotos').append("<div id='slider' class='flexslider'></div>");
				    $('.flexslider').append("<ul id='imagem-slide' class='slides'></ul>");

				    $('#slider').after("<div id='carousel' class='flexslider'></div>");
				    $('#carousel').append("<ul class='slides'></ul>");

					for (i=0; i<length; i++) {
						var photoURL = 'http://farm' + flickrData.photoset.photo[i].farm + '.' + 'static.flickr.com/' + flickrData.photoset.photo[i].server + '/' + flickrData.photoset.photo[i].id + '_' + flickrData.photoset.photo[i].secret +'.jpg';
						var thumbURL = 'http://farm' + flickrData.photoset.photo[i].farm + '.' + 'static.flickr.com/' + flickrData.photoset.photo[i].server + '/' + flickrData.photoset.photo[i].id + '_' + flickrData.photoset.photo[i].secret + '_s.jpg';

						//thumbHTML += '<img src=' + thumbURL + ' width="50" height="50" onclick="flickrhelpers.navImg('+ i +');" style="cursor: pointer;" title="' + flickrData.photoset.photo[i].title + '">';
						settings.imgArray[i] = photoURL;
						settings.titleArray[i] = flickrData.photoset.photo[i].title;
					}
					// Get the position of the element Flickr jqfobj will be loaded into
					
					settings.c = settings.x + (element.width() / 2);
					settings.ct = settings.y + (element.height() / 2);
					console.log("ELEMENT", element);

					// position loader
					$("#flickr_loader").css({
						"left" : settings.x,
						"top"  : settings.y
					});

					// When data is set, load first image.
                    if (settings.last === null){
	    				flickrhelpers.navImg(0);
                    } else {
	    				flickrhelpers.navImg(length - 1);
                    }

				});
        }

		// Helper functions here
		flickrhelpers = {
			navImg : function (index) {
				
				// Set the global index
				currentIndex = index;

				// Set the loader gif pos and display
				$("#flickr_loader").css({
					"top" : settings.y,
					"left" : settings.x,
					"display" : "block"
				});


				// Create an image Obj with the URL from array
				var thsImage = null;
				thsImage = new Image();
				thsImage.src = settings.imgArray[index];

				// Set global imgObj to jQuery img Object
				settings.Img = $(thsImage);

				// Display the image
				for (var i =0; i < settings.imgArray.length; i++){
				  setSlideImage(settings.imgArray[i],settings.titleArray[i], settings.imgArray.length);
			    }
			    verificaQuantiadedeImagensARemover(settings.imgArray.length);
				// Call to function to take loader away once image is fully loaded

        	    $('.bar').mosaic({
                  animation:'slide'
                });

				$("#thsImage").load(function() {
					// Set the aspect ratio
					$("#flickr_loader").css({
					  "top" : '240px',
					  "left" : '480.5px',
					  "display" : "block"
				    });
					$("#flickr_loader").fadeOut("slow");
				});


			},
		}

		// Hooray, defaults
		var defaults = {
			"flickrUser" : null,
			"flickrSet" : null,
			"flickrKey" : null,
            "last" : null,
			"x" : 0, // Object X
			"y" : 0, // Object Y
			"c" : 0, // Object center point
			"ct" : 0, // Object center point from top
			"mX" : 0, // Mouse X
			"mY" : 0,  // Mouse Y
			"imgArray" : [], // Array to hold urls to flickr images
			"titleArray" : [], // Array to hold image titles if they exist
			"currentIndex" : 0, // Default image index
			"fImg" : null, // For checking if the image jqfobject is loaded.
		}

		// For extending the defaults!
		var settings = {}

		// Init this thing
		jQuery(document).ready(function () {
			methods.init();
		});
	}
})(jQuery);
