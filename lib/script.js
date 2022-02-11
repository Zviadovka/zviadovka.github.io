var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var mas = [];
var count = 0;
var stop = 0;
var level =0;
var population = 0;
var stop = 0;
var cellsAtstart = 0;
ctx.fillStyle = "#d6ffe0";

canvas.onclick=function(event){
  var x = event.offsetX;
  var y = event.offsetY;
  console.log(x);
  console.log(y);
  x = Math.floor(x/10);
  y = Math.floor(y/10);
  mas[y][x] = 1;
  drawField();
}

function goLife() {
  var n = 70,
    m = 70;
  for (var i = 0; i < m; i++) {
    mas[i] = [];
    for (var j = 0; j < n; j++) {
      mas[i][j] = [0];
    }
  }
}
goLife();
function stopLife() {
  stop = 1;
  //console.log(stop);
}

function clearField() {
  
  ctx.clearRect(0, 0, 700, 700);
  for (var i = 0; i < 70; i++) {
    for (var j = 0; j < 70; j++) {
      mas[i][j] = [0];
    }
  }
  count = 0;
  document.getElementById('count').innerHTML = count;
  stop = 0;
  population = 0;
  document.getElementById('popul').innerHTML = population;
  document.getElementById('info').innerHTML = 'EMPTY';
}

function drawField() {
  ctx.clearRect(0, 0, 700, 700);

  for (var i = 0; i < 70; i++) {
    for (var j = 0; j < 70; j++) {
      if (mas[i][j] == 1) {
        ctx.fillRect(j * 10, i * 10, 10, 10);
      }
    }
  }
}
function startLife() {
  console.log(level);
  var mas2 = [];
  //console.log(mas);
  for (var i = 0; i < 70; i++) {
    mas2[i] = [];

    for (var j = 0; j < 70; j++) {
      var neighbors = 0;
      if (mas[fpm(i) - 1][j] == 1) neighbors++;
      if (mas[i][fpp(j) + 1] == 1) neighbors++;
      if (mas[fpp(i) + 1][j] == 1) neighbors++;
      if (mas[i][fpm(j) - 1] == 1) neighbors++;
      if (mas[fpm(i) - 1][fpp(j) + 1] == 1) neighbors++;
      if (mas[fpp(i) + 1][fpp(j) + 1] == 1) neighbors++;
      if (mas[fpp(i) + 1][fpm(j) - 1] == 1) neighbors++;
      if (mas[fpm(i) - 1][fpm(j) - 1] == 1) neighbors++;
  
      if (mas[i][j]==1 && neighbors<2) mas2[i][j]=0;
      if (mas[i][j]==1 && neighbors>3) mas2[i][j]=0;
      if (mas[i][j]==1 && neighbors==2 || neighbors==3 ) mas2[i][j]=1;
      if (mas[i][j]==0 && neighbors==3) mas2[i][j]=1;
    }
  }
  mas = mas2;
  drawField();
  count++;
  if ((level == 1)) {
    check1level();
  }
  else if ((level == 2)) {
        check2level();
  }
  else if ((level == 3)) {
        check3level();
  }
  else if ((level == 4)) {
        check4level();
  }
  else if ((level == 5)) {
        check5level();
  }
    count_population();
  document.getElementById('count').innerHTML = count;
  document.getElementById('popul').innerHTML = population;
  if (stop == 0) timer = setTimeout(startLife, 700);
}
function fpm(i) {
  if (i == 0) return 70;
  else return i;
}
function fpp(i) {
  if (i == 69) return -1;
  else return i;
}

function level1() {
  mas[14][20] = 1;
  mas[16][20] = 1;
  level = 1;
  population = 2;
  document.getElementById('popul').innerHTML = population;
  document.getElementById('info').innerHTML =
    'Размер популяции должен быть равен 4 к 10 поколению';
  drawField();
}
function level2() {
  mas[40][45] = 1;
  mas[40][44] = 1;
  level = 2;
  population = 2;
  document.getElementById('popul').innerHTML = population;
  document.getElementById('info').innerHTML =
    'Размер популяции должен быть равен 4 к 10 поколению';
  drawField();
}
function level3() {
  mas[20][65] = 1;
  mas[20][20] = 1;
  mas[21][20] = 1;
  mas[20][64] = 1;
  mas[60][65] = 1;
  mas[59][65] = 1;
  mas[60][20] = 1;
  mas[60][21] = 1;

  level = 3;
  population = 12;
  document.getElementById('popul').innerHTML = population;
  document.getElementById('info').innerHTML =
    'Размер популяции должен быть равен 16 к 10 поколению';
  drawField();
}
function level4() {
  level = 4;
  population = 0;
  document.getElementById('popul').innerHTML = population;
  document.getElementById('info').innerHTML =
    'Размер популяции должен быть равен минимум 3 к 10 поколению';
  drawField();
}
function level5() {
  mas[20][35] = 1;
  mas[20][34] = 1;
  mas[21][35] = 1;
  mas[21][34] = 1;
  level = 5;
  population = 4;
  document.getElementById('popul').innerHTML = population;
  document.getElementById('info').innerHTML =
    'Убей всех за 5 поколений.';
  drawField();
}
function count_population() {
  population=0;
  for (var i = 0; i < 70; i++) {
    for (var j = 0; j < 70; j++) {
      if (mas[i][j] == 1) {
        population++;
      }
    }
  }
  console.log(population);
}

function check1level() {
  count_population();
  
  if (count == 10 && population == 158) {
    stopLife();
    document.getElementById('info').innerHTML = 'You score';
  } else if (count > 10 && population != 158) {
    stopLife();
    document.getElementById('info').innerHTML = 'Didn’t work, Try again';
  }
}
function check2level() {
  count_population();
  
  if (count == 10 && population == 4) {
    stopLife();
    document.getElementById('info').innerHTML = 'You score';
  } else if (count > 10 && population != 4) {
    stopLife();
    document.getElementById('info').innerHTML = 'Didn’t work, Try again';
  }
}
function check3level() {
  count_population();
  
  if (count == 10 && population == 16) {
    stopLife();
    document.getElementById('info').innerHTML = 'You score';
  } else if (count > 10 && population != 16) {
    stopLife();
    document.getElementById('info').innerHTML = 'Didn’t work, Try again';
  }
}
function check4level() {
  count_population();
  
  if (count == 10 && population >= 3) {
    stopLife();
    document.getElementById('info').innerHTML = 'You score';
  } else if (count > 10 && population < 3) {
    stopLife();
    document.getElementById('info').innerHTML = 'Didn’t work, Try again';
  }
}
function check5level() {
  count_population();
  
  if (count == 5 && population ==0) {
    stopLife();
    document.getElementById('info').innerHTML = 'You score';
  } else if (count > 5 && population > 5) {
    stopLife();
    document.getElementById('info').innerHTML = 'Didn’t work, Try again';
  }
}

