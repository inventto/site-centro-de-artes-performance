horariosCurso = function(agenda){
                window.agenda = agenda;
                var length = agenda.feed.entry.length;
                var horarios = {};
                for(i = 0; i < length; i++){
                     data = agenda.feed.entry[i].gd$when[0];
                     title = agenda.feed.entry[i].title.$t;
                     if (!horarios[title])
                       horarios[title] = {};
                     horaInicio = data.startTime.replace(/.*T/,"").replace(/\..*/,"").split(":").reverse().join(":").replace(/00:/,"").split(":").reverse().join(":");
                     horaFim = data.endTime.replace(/.*T/,"").replace(/\..*/,"").split(":").reverse().join(":").replace(/00:/,"").split(":").reverse().join(":");

                     dataStart = data.startTime.replace(/T.*/,"").split("-");
                     //dataEnd = data.endTime.replace(/T.*/,"").split("-");

                     dataInicio = new Date(dataStart[0], parseInt(dataStart[1]) - 1, dataStart[2]);
                     //console.log(dataStart);
                     //console.log(dataInicio);
                     //dataFim = new Date(dataEnd[0], dataEnd[1], dataEnd[2]);
                     var weekday=new Array(7);
                     weekday[0]="Domingo";
                     weekday[1]="2a";
                     weekday[2]="3a";
                     weekday[3]="4a";
                     weekday[4]="5a";
                     weekday[5]="6a";
                     weekday[6]="Sábado";
                     diaSemana = weekday[dataInicio.getDay()];
                     //diaSemanaFim = (dataFim.getDay() + 1) + "a";

                     content = agenda.feed.entry[i].content.$t;
		 if (!horarios[title][content])
                       horarios[title][content] = {}
                     horarios[title][content][diaSemana]= { horaInicio: horaInicio, horaFim: horaFim };
                  }
                  for(titulo in horarios){
                      t = titulo.split("(");
                      rand = function() {
                        return Math.floor((Math.random() * 3) + 1);
                      };
                      if (t.length > 1)
                        $('.foto').after("<div class='posicao"+rand()+" inclinacao"+rand()+"'><p><strong>"+t[0]+"</strong>("+t[1]+"</p></div>");
                      else
                        $('.foto').after("<div class='posicao"+rand()+" inclinacao"+rand()+"'><p><strong>"+t[0]+"</strong></p></div>");
                      div = $('.foto').next();
                      horarios_por_nivel = horarios[titulo];
                      window.horarios_por_nivel = horarios_por_nivel;
                      aux = [];
                      for(c in horarios_por_nivel){
                          aux.push(c);
                      }
                      aux = aux.sort(function(a,b){
                              return (a > b)? 1 : -1;
                              });
                      for(i = 0; i < aux.length; i++){
                          c = aux[i];
                          div.append("<p>"+c+"</p>");
                          horarios_por_turma = horarios_por_nivel[c];
                          mesmo_horario = true;
                          hora_inicio = undefined;
                          hora_fim = undefined;
                          for(d in horarios_por_turma) {
                            if (hora_inicio && hora_fim) {
                          if (hora_inicio != horarios_por_turma[d].horaInicio || hora_fim != horarios_por_turma[d].horaFim)
                                mesmo_horario = false;
                            }
                            hora_inicio = horarios_por_turma[d].horaInicio;
                            hora_fim = horarios_por_turma[d].horaFim;
                          }
                          if (mesmo_horario) {
                            dias = [];
                            for(d in horarios_por_turma) {
                              dias.push(d);
                            }
                            div.append("<p>" + dias.join(" e ") + " - " + horarios_por_turma[d].horaInicio + " as " + horarios_por_turma[d].horaFim + "</p>");
                          } else {
                            for(d in horarios_por_turma) {
                              div.append("<p>" + d + " - " + horarios_por_turma[d].horaInicio + " as " + horarios_por_turma[d].horaFim + "</p>");
                            }
                          }
                      }
                 }
                 window.horario = horarios;
};
