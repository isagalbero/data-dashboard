window.addEventListener('load', start);

function start() {
  var filterHeadOffice = document.getElementById('head-office');
  var filterClass = document.getElementById('class');
  var filterSprint = document.getElementById('sprint');
}

filterHeadOffice.addEventListener('change', fillClass);
filterClass.addEventListener('change', fillSprint);
document.addEventListener ('change', infoOverview);
document.addEventListener('change', infoSprint);

// Turmas
function fillClass(event) {
  for (var i = 0; i < Object.keys(data).length; i++) {
    if (event.target.value === Object.keys(data)[i]) {
      filterClass.innerHTML = '';
      var classList = Object.keys(data[filterClass.value]).reverse();
      console.log(classList);
      for (var j = 0; j < classList.length; j++) {
        var optionClass = document.createElement('option');
        optionClass.value = promList[j];
        optionClass.textContent = classList[j];
        filterClass.appendChild(optionClass);
      }
    }
  }
}

// Sprints
function fillSprint(event) {
  var sprints = data[filterHeadOffice.value][filterClass.value].ratings.length;
  filterSprint.innerHTML = '';
  for (var i = sprints; 0 < i; i--) {
    var optionSprint = document.createElement('option');
    optionSprint.value = i;
    optionSprint.textContent = 'Sprint ' + (i);
    filterSprint.appendChild(optionSprint);
  }
}

function infoOverview(event) {
    if (event.target === filterHeadOffice || event.target === filterClass) {
      var students = data[filterHeadOffice.value][filterClass.value].students;
      var sprints = data[filterHeadOffice.value][filterClass.value].ratings.length;
      var currentStudents = 0;
      var withdrawalsStudents = 0;
      var overcomeStudents = 0;
      var techTarget = 0; // nota máxima 1260
      var hseTarget = 0; // nota máxima 840

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
              techTarget++;
            }
            hseSum += students[i].sprints[j].score.hse;
            if (students[i].sprints[j].score.hse > 840) {
              hseTarget++;
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
    var techTargetAverage = techTarget / sprints;
      console.log(techTargetAverage);
      var hseTargetAverage = hseTarget / sprints;
      console.log(hseTargetAverage);
      // Exibir na visão geral
      document.getElementById('current-students').textContent = currentStudents;
      document.getElementById('withdrawal').textContent = Math.round((withdrawalsStudents / students.length) * 100) * 10 / 10 + '%';
      document.getElementById('overcome-average').textContent = overcomeStudents;
      document.getElementById('overcome-percent').textContent = Math.round((overcomeStudents / currentStudents) * 100) * 10 / 10 + '%';
      document.getElementById('tech-target-average').textContent = Math.round(techTargetAverage);
      document.getElementById('hse-target-average').textContent = Math.round(hseTargetAverage);

      // Média NPS
      var ratings = data[filterHeadOffice.value][filterClass.value].ratings;
      var sumNps = 0;
      var sumProm = 0;
      var sumPass = 0;
      var sumDet = 0;
      for (var i = 0; i < sprints; i++) {
        sumProm += ratings[i].nps.promoters;
        sumPass += ratings[i].nps.passive;
        sumDet += ratings[i].nps.detractors;
        sumNps += ratings[i].nps.promoters - ratings[i].nps.detractors;
      }

      // Exibir em visão geral
      document.getElementById('promoters').textContent = Math.round(sumProm / sprints) + '%';
      document.getElementById('passive').textContent = Math.round(sumPass / sprints) + '%';
      document.getElementById('detractors').textContent = Math.round(sumDet / sprints) + '%';
      document.getElementById('nps').textContent = sumNps / sprints + '%';
    }
  }

  function infoSprint(event) {
    var students = data[filterHeadOffice.value][filterClass.value].students;
    // Estudantes que superaram os 70%
    var techTarget = 0;
    var hseTarget = 0;
    for (var i = 0; i < students.length; i++) {
      if (students[i].sprints[filterSprint.value - 1] !== undefined && students[i].sprints[selectSprint.value - 1].score.tech > 1260) {
        techTarget++;
      }
      if (students[i].sprints[filterSprint.value - 1] !== undefined && students[i].sprints[selectSprint.value - 1].score.hse > 840) {
        hseTarget++;
      }
    }
    document.getElementById('tech-target-sprint').textContent = techTarget;
    document.getElementById('hse-target-sprint').textContent = hseTarget;
    // Estudantes satisfeitas com a experiência na laboratoria
    var ratings = data[filterHeadOffice.value][filterClass.value].ratings;
    document.getElementById('teachers-average').textContent = ratings[filterSprint.value - 1].teacher;
    document.getElementById('jedi-average').textContent = ratings[filterSprint.value - 1].jedi;
    var reachExp = ratings[filterSprint.value - 1].student.cumple + ratings[filterSprint.value - 1].student.supera;
    document.getElementById('satisfaction-percent').textContent = reachExp + '%';
  }


// Gráficos
var sede1 = data['AQP']['2017-1']['students'].length;
var sede2 = data['AQP']['2016-2']['students'].length;
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Generacion', 'Porcentaje'],
    ['2017', sede1],
    ['2016', sede2]]);

  var options = { title: 'Alumnas' };

  var chart = new google.visualization.PieChart(document.getElementById('piechart'));

  chart.draw(data, options);
};

  function openPage(evnt, opt) {
  var i, tabContent, menu;
  tabContent = document.getElementsByClassName('tabContent');
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = 'none';
  }
  menu = document.getElementsByClassName('menu');
  for (i = 0; i < menu.length; i++) {
    menu[i].className = menu[i].className.replace('active', '');
  }
  document.getElementById(opt).style.display = 'block';
  evnt.currentTarget.className += 'active';
}
document.getElementById('default').click();
