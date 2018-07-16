/*
 * Funcionalidad de tu producto
 */

// Puedes hacer uso de la base de datos a través de la variable `data`
// console.log(data);

var dropMenu = document.getElementById('dropMenu');
var profileStudents = document.getElementById('profileStudents');
dropMenu.addEventListener('change', photoStudents);
dropMenu.addEventListener('change', nameStudents);

window.onload = loadMenu();

function loadMenu(){
    var local = document.createElement('option');
    local.innerHTML = 'Visão geral por sede';
    local.value = 'none';
    dropMenu.appendChild(local);
    for (sede in data){
        var itemMenu = document.createElement('option');
        itemMenu.value = sede;
        itemMenu.innerHTML = sede;
        dropMenu.appendChild(itemMenu);
    }
};

function photoStudents(){
    var sede = dropMenu.value;
    var photoStudents = document.getElementById('photoStudents');
    photoStudents.innerHTML = '';
    for (turma in data[sede]){
        for (i in data[sede][turma]['students']){
            var img = document.createElement('img');
            img.src = data[sede][turma]['students'][i]['photo'];
            photoStudents.appendChild(img);
            profileStudents.appendChild(photoStudents);
        }
    }
};

function nameStudents(){
    var sede = dropMenu.value;
    var nameStudents = document.getElementById('nameStudents');
    console.log(nameStudents);
    nameStudents.innerHTML = '';
    for (turma in data[sede]){
        for (j in data[sede][turma]['students']){
            var paragraph = document.createElement('p');
            paragraph.innerHTML = data[sede][turma]['students'][j]['name'];
            nameStudents.appendChild(paragraph);
            profileStudents.appendChild(nameStudents);
        }
    }
};
