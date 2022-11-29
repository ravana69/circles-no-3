const anims = ['ppp', 'ppm', 'pmp', 'mpp', 'pmm', 'mpm', 'mmp', 'mmm', 'poo', 'opo', 'oop', 'moo', 'omo', 'oom'];
let circle_counter = 0,completed = {};
let wrp = document.getElementsByClassName('wrp')[0];

init();
function init() {
  circle_counter = 0;
  wrp.innerHTML = '';
  addCircle(wrp);
}

function addCircle(parent) {
  onResize();
  let circle = document.createElement('div');
  circle.id = `c${circle_counter}`;
  circle.classList.add('circle');
  circle.addEventListener('animationend', function (e) {
    e.stopPropagation();
    completed[circle.id] = true;
    if (circle_counter === Object.keys(completed).length) {
      completed = {};
      resetCircles();
    }
  });
  parent.appendChild(circle);
  circle_counter++;
  if (circle_counter < wrp.getBoundingClientRect().height / 25) addCircle(circle);else
  resetCircles();
}

function resetCircles() {
  for (let i = 0; i < circle_counter; i++) {
    let _c = document.getElementsByClassName('circle');
    let _r = getRandom(0, 5);
    let old_ani = _c[i].getAttribute('class').replace('circle ', '');
    let new_ani_seq = getRandomInt(0, anims.length);
    let new_ani = anims[new_ani_seq];
    if (old_ani === new_ani) {
      if (new_ani_seq === anims.length - 1) new_ani = anims[0];else
      new_ani = anims[new_ani_seq + 1];
    }
    _c[i].style['animation-duration'] = `${_r}s`;
    _c[i].setAttribute('class', `circle ${new_ani}`);
  }
}

window.addEventListener('resize', init);
function onResize() {
  let ww = window.innerWidth,wh = window.innerHeight;
  if (ww > wh) {
    wrp.style.width = `${wh - 40}px`;
    wrp.style.height = `${wh - 40}px`;
  } else {
    wrp.style.width = `${ww - 40}px`;
    wrp.style.height = `${ww - 40}px`;
  }
}

// Returns a random integer between min (included) and max (excluded)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
  // return Math.random() * (max - min) + min;
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}