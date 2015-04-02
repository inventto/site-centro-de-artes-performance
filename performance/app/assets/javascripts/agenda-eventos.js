var CLIENT_ID = '186026638324-0l2m013uh26dlvgemd2i7tc994ua9fma.apps.googleusercontent.com';
var apiKey = 'AIzaSyDC9f1UQjrU6uxvrNPB4Ze29sZt5SCnOts';
calendarid = '3sv3aefg65slkecmgb1omfirc8@group.calendar.google.com';
  
      $.ajax({
       type: 'GET',
       url: encodeURI('https://www.googleapis.com/calendar/v3/calendars/' + calendarid+ '/events?key=' + apiKey),
       dataType: 'json',
       success: function (response) {
        console.log("SUCCESS",response);
       }, 
       error: function (response) {
        console.log("ERROR",response);
       }
     });
/*$.getJSON("https://www.google.com/calendar/feeds/3sv3aefg65slkecmgb1omfirc8%40group.calendar.google.com/private-a1159206bcc1fae12b66e2f602484b96/full?alt=json-in-script&callback=?&orderby=updated&max-results=500&singleevents=true&sortorder=descending&futureevents=false",
  function(agenda) {
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
        */
        //startTime = data.startTime.replace(/T.*/, "").split("-").reverse().join("/");
        //endTime = data.endTime.replace(/T.*/, "").split("-").reverse().join("/");
        //color = "#000";
        /*content = content.replace(/(http[^ ]+.(jpg|jpeg|gif|png))/mg, "<img src='\$1' style='float:left;margin:10px;width: 906px;'/>");
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