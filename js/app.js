window.addEventListener('load', start);

function start() {
  var filterHeadOffice = document.getElementById('head-office');
  var filterClass = document.getElementById('class');
  var filterSprint = document.getElementById('sprint');


filterHeadOffice.addEventListener('change', chooseClass);
filterClass.addEventListener('change', chooseSprint);
document.addEventListener ('change', infoGeneralView);
document.addEventListener('change', infoSprint);

// Turmas
function chooseClass(event) {
  for (var i = 0; i < Object.keys(data).length; i++) {
    if (event.target.value === Object.keys(data)[i]) {
      filterClass.innerHTML = '';
        var classList = Object.keys(data[filterHeadOffice.value]).reverse();
      console.log(classList);
      for (var j = 0; j < classList.length; j++) {
        var optionClass = document.createElement('option');
        optionClass.value = classList[j];
        optionClass.textContent = classList[j];
        filterClass.appendChild(optionClass);
      }
    }
  }
}

// Sprints
function chooseSprint(event) {
  var sprints = data[filterHeadOffice.value][filterClass.value].ratings.length;
  filterSprint.innerHTML = '';
  for (var i = sprints; 0 < i; i--) {
    var optionSprint = document.createElement('option');
    optionSprint.value = i;
    optionSprint.textContent = 'Sprint ' + (i);
    filterSprint.appendChild(optionSprint);
  }
}

function infoGeneralView(event) {
    if (event.target === filterHeadOffice || event.target === filterClass) {
      var students = data[filterHeadOffice.value][filterClass.value].students;
      var sprints = data[filterHeadOffice.value][filterClass.value].ratings.length;
      var currentStudents = 0;
      var withdrawalsStudents = 0;
      var overcomeStudents = 0;
      var techNote = 0; // nota máxima 1260
      var hseNote = 0; // nota máxima 840

      // Estudantes ativas e desistentes
      for (var i = 0; i < students.length; i++) {
        if (students[i]['active'] === true) {
          // Estudantes ativas
          currentStudents++;
          // Calcular a média
          var techSum = 0;
          var hseSum = 0;
          // Média tech e HSE
          for (var j = 0; j < sprints; j++) {
            techSum += students[i].sprints[j].score.tech;
            if (students[i].sprints[j].score.tech > 1260) {
              techNote++;
            }
            hseSum += students[i].sprints[j].score.hse;
            if (students[i].sprints[j].score.hse > 840) {
              hseNote++;
            }
          }
          var techAverage = Math.floor(techSum / sprints);
          console.log(techAverage);
          var hseAverage = Math.floor(hseSum / sprints);
          console.log(hseAverage);

          // Estudantes que superaram a meta geral
          if (techAverage > 1260 && hseAverage > 840) {
            overcomeStudents++;
          }
      } else {
        withdrawalsStudents++;
      }
    }
    var techNoteAverage = techNote / sprints;
      console.log(techNoteAverage);
      var hseNoteAverage = hseNote / sprints;
      console.log(hseNoteAverage);

      // Exibir na visão geral
      document.getElementById('current-students').textContent = currentStudents;
      document.getElementById('withdrawals').textContent = Math.round((withdrawalsStudents / students.length) * 100) * 10 / 10 + '%';
      document.getElementById('overcome-average').textContent = overcomeStudents;
      document.getElementById('overcome-percent').textContent = Math.round((overcomeStudents / currentStudents) * 100) * 10 / 10 + '%';
      document.getElementById('tech-note-average').textContent = Math.round(techNoteAverage);
      document.getElementById('hse-note-average').textContent = Math.round(hseNoteAverage);

      // Média NPS
      var ratings = data[filterHeadOffice.value][filterClass.value].ratings;
      var sumNps = 0;
      var sumPromoters = 0;
      var sumPassive = 0;
      var sumDetractors = 0;
      for (var i = 0; i < sprints; i++) {
        sumPromoters += ratings[i].nps.promoters;
        sumPassive += ratings[i].nps.passive;
        sumDetractors += ratings[i].nps.detractors;
        sumNps += ratings[i].nps.promoters - ratings[i].nps.detractors;
      }

      // Exibir em visão geral
      document.getElementById('promoters').textContent = Math.round(sumPromoters / sprints) + '%';
      document.getElementById('passive').textContent = Math.round(sumPassive / sprints) + '%';
      document.getElementById('detractors').textContent = Math.round(sumDetractors / sprints) + '%';
      document.getElementById('nps').textContent = sumNps / sprints + '%';
    }
  }

  function infoSprint(event) {
    var students = data[filterHeadOffice.value][filterClass.value].students;

    // Estudantes que superaram os 70%
    var techNote = 0;
    var hseNote = 0;
    for (var i = 0; i < students.length; i++) {
      if (students[i].sprints[filterSprint.value] !== undefined && students[i].sprints[filterSprint.value].score.tech > 1260) {
        techNote++;
      }
      if (students[i].sprints[filterSprint.value] !== undefined && students[i].sprints[filterSprint.value].score.hse > 840) {
        hseNote++;
      }
    }
    document.getElementById('tech-note-sprint').textContent = techNote;
    document.getElementById('hse-note-sprint').textContent = hseNote;

    // Estudantes satisfeitas com a experiência na laboratoria
    var ratings = data[filterHeadOffice.value][filterClass.value].ratings;
    document.getElementById('teachers-average').textContent = ratings[filterSprint.value].teacher;
    document.getElementById('jedi-average').textContent = ratings[filterSprint.value].jedi;
    var reachExp = ratings[filterSprint.value].student.cumple + ratings[filterSprint.value].student.supera;
    document.getElementById('satisfaction-percent').textContent = reachExp + '%';
  }

// Gráficos aqui

};

// Função para abrir dados estudantes, mentores, jedis aqui
