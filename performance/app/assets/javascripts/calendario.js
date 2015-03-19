$.getJSON("https://www.google.com/calendar/feeds/performancefb%40hotmail.com/private-9a607467878beac5e27bfa591212c1c1/full?alt=json-in-script&callback=?&orderby=starttime&max-results=500&singleevents=true&sortorder=ascending&futureevents=false",
  function(agenda) {
    if (agenda.feed.entry == undefined) {
      $("#agenda").append("Nada cadastrado.");
      return;
    }
    var length = agenda.feed.entry.length;
    var year = new Date().getYear() + 1900;
    for (i = 0; i < length; i++) {
      var data = agenda.feed.entry[i].gd$when[0];
      var y = data.startTime.split("-")[0];
      if (y == year) {
        var startTime = data.startTime.replace(/T.*/, "").split("-").reverse().join("/");
        var endTime = data.endTime.replace(/T.*/, "").split("-").reverse().join("/");
        var title = agenda.feed.entry[i].title.$t;
        var periodo = startTime
        color = "#000";
        if (title.search(/prova/i) >= 0) {
          color = "#ff0080";
        }
        if (title.search(/(in.cio|final|f.rias|volta)/i) >= 0) {
          color = "red";
        }
        content = agenda.feed.entry[i].content.$t;
        content = content.replace(/(http[^ ]+.(jpg|jpeg|gif|png))/mg, "<img src='\$1' style='float:left;margin:10px;max-width:906px'/>");

        if (startTime == endTime) {
          $('#agenda').append("<div id='" + title.replace(/ /g, "-") + "' class='accordion-header'><h4 style='color:" + color + "'>" + startTime + " - " + title + "</h4></div><div class='accordion-content'>" + content + "</div>");
        } else if (startTime.split("/")[1] == endTime.split("/")[1] && startTime.split("/")[2] == endTime.split("/")[2]) {
          $('#agenda').append("<div id='" + title.replace(/ /g, "-") + "' class='accordion-header'><h4 style='color:" + color + "'>" + startTime + " - " + title + "</h4></div><div class='accordion-content'>" + content + "</div>");
        } else {
          $('#agenda').append("<div id='" + title.replace(/ /g, "-") + "' class='accordion-header'><h4 style='color:" + color + "'>" + startTime + " - " + title + "</h4></div><div class='accordion-content'>" + content + "</div>");
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
  });