var CLIENT_ID = '186026638324-0l2m013uh26dlvgemd2i7tc994ua9fma.apps.googleusercontent.com';
var apiKey = 'AIzaSyDC9f1UQjrU6uxvrNPB4Ze29sZt5SCnOts';
calendarid = '3sv3aefg65slkecmgb1omfirc8@group.calendar.google.com';
    //url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid+ '/events?key=' + apiKey),
url_feed = 'https://www.google.com/calendar/feeds/'+calendarid+'/public/full';
    
    $.ajax({
       type: 'GET',
       url: 'https://www.google.com/calendar/feeds/'+calendarid+'/public/basic?singleEvents=true&key='+apiKey,
       headers:'Access-Control-Allow-Origin',
       crossDomain: true,
       dataType: 'jsonp',
       ProcessData: true,
       success: function (response) {
          getEventos(response);
       }, 
       error: function (response) {
        console.log("ERROR",response);
       }
     });
    //https://www.googlewapis.com/calendar/v3/calendars/"+ calendarid +"/
    //events?key=private-a1159206bcc1fae12b66e2f602484b96/
    //full?alt=json-in-script&callback=?&orderby=updated&max-results=500&singleevents=true&sortorder=descending&futureevents=false
    
    function getEventos(response) {
      
      xmlAgenda = $.parseXML(response);
      eventos = $(xmlAgenda).find("entry");        
      vallenato();
      for(var i = 0; i < eventos.length; i++){ 

        data = $(eventos[i]).find("content").text().match(/Quando: ([^<].*)/);
        conteudo = $(eventos[i]).find("content").text();
        if (conteudo.match(/Descri.* do evento: ([^"]+.*)/) != null){
          conteudo = conteudo.match(/Descri.* do evento: ([^"]+.*)/)[0];
        }  else {
          conteudo = "";
        }
        local = "";
        titulo = $(eventos[i]).find("title").text();
        data = $(eventos[i]).find("content").text().match(/Quando: ([^<].*)/);
        injetaAccordion(titulo, data[1], conteudo, local);
      }
      vallenato();
    };

    function injetaAccordion(titulo, data, conteudo, local) {
      conteudo = conteudo.replace(/(http[^ ]+.(jpg|jpeg|gif|png))/mg, "<img src='\$1' style='max-width:100%;max-height: auto'/>");
      conteudo = conteudo.replace(/download\(([^;]+);([^"]*)\)/, "<a href='\$1' title='Download' target='_blank'><img src='https://cdn1.iconfinder.com/data/icons/pretty_office_3/32/Package-Download.png' style='margin: 0 auto' />\$2</a>");
      titulo = titulo.replace(/ /g, "-");

      if (conteudo){
        $('#accordion-container').append("<div id='"+ titulo + 
            "' class='accordion-header'><h2>"+ data +" - "+ titulo.toUpperCase() + 
            "</h2></div><div class='accordion-content'>"+ conteudo +"<p>"+ local +"</p><div/>");      
      } else {
        $('#accordion-container').append("<div id='"+ titulo + 
            "' class='accordion-header'><h2>"+ data +" - "+ titulo.toUpperCase() + 
            "</h2></div><div class='accordion-content'>"+ conteudo +"<p>"+ local +"</p><div/>");
        $('div#'+titulo).removeClass('inactive-header');
        $('div#'+titulo).addClass('text-center');
      }
    };