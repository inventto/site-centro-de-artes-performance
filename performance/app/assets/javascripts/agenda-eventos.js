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
      console.log(">>>>>>>>>>",xmlAgenda);
      console.log(">>>>>", eventos);        
      periodos = new Array(eventos.length);
      for(var i = 0; i < eventos.length; i++){
        publicado = $(eventos[i -1]).find("published").text(); 
        content = "";
        where = "";
        title = $(eventos[i]).find("title").text();
        periodo = $(eventos[i]).find("content").text();
        data = periodo.match(/Quando: ([^<].*)/);
        console.log('DATA: ', data[1]);
        periodos[i] = publicado;
        
        
        $('#accordion-container').append("<div id='" + title.replace(/ /g, "-") + 
          "' class='accordion-header'><h2>" + data + " - " + title.toUpperCase() + 
          "</h2></div><div class='accordion-content'>" + content + "<p>" + where + "</p><div/>");
      }
      console.log("PERIODOS: ", periodos);
    };

    function inserindoHtml(periodos, eventos){
      
    }
    
  /*$.getJSON('https://www.google.com/calendar/feeds/'+calendarid+'/public/basic?singleEvents=true&key='+apiKey,
  fu\nction(agenda) {    
    if (agenda.feed.entry == undefined) {
      return;
    }
    length = agenda.feed.entry.length;
    year = new Date().getYear() + 1900;
    for (i = 0; i < length; i++) {
      data = agenda.feed.entry[i].gd$when[0];
      y = data.startTime.split("-")[0];
      if (y == year) {
        where = agenda.feed.entry[i].gd$where[0].valueString;
        if (where != "") {
          where = "<strong>Local:</strong> " + where;
        }
        content = agenda.feed.entry[i].content.$t;
        content = content.replace("\n", "<br/>");
        title = agenda.feed.entry[i].title.$t;
        
      //  startTime = data.startTime.replace(/T.*/ //, "").split("-").reverse().join("/");
      //  endTime = data.endTime.replace(/T.*/, "").split("-").reverse().join("/");
      /*  color = "#000";
        content = content.replace(/(http[^ ]+.(jpg|jpeg|gif|png))/mg, "<img src='\$1' style='float:left;margin:10px;width: 906px;'/>");
        content = content.replace(/download\(([^;]+);"([^"]*)"\)/, "<a href='\$1' title='Download' target='_blank'><img src='https://cdn1.iconfinder.com/data/icons/pretty_office_3/32/Package-Download.png' style='margin:0 10px -10px 0;' />\$2</a>");
        if (startTime == endTime) {
          $('#accordion-container').append("<div id='" + title.replace(/ /g, "-") + "' class='accordion-header'><h2>" + startTime + " - " + title.toUpperCase() + "</h2></div><div class='accordion-content'>" + content + "<p>" + where + "</p></div>");
        } else if (startTime.split("/")[1] == endTime.split("/")[1] && startTime.split("/")[2] == endTime.split("/")[2]) {
          periodo = startTime.split("/")[0] + " a " + endTime
          $('#accordion-container').append("<div id='" + title.replace(/ /g, "-") + "' class='accordion-header'><h2>" + periodo + " - " + title.toUpperCase() + "</h2></div><div class='accordion-content'>" + content + "<p>" + where + "</p></div>");
        } else {
          periodo = startTime + " a " + endTime
          $('#accordion-container').append("<div id='" + title.replace(/ /g, "-") + "' class='accordion-header'><h2>" + periodo + " - " + title.toUpperCase() + "</h2></div><div class='accordion-content'>" + content + "<p>" + where + "</p><div/>");
        }
      }
    }
    vallenato();
    if (window.location.hash.length > 0) {
      var target_offset = $(window.location.hash).offset();
      var target_top = target_offset.top;
      $('html, body').animate({
        scrollTop: target_top
      }, 500);
    }
  });*/