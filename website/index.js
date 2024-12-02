'use strict';

///////////////////////////////////////
// Modal window
// sare query selctors
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

const navcontainer = document.querySelector('.nav__links');
const nav = document.querySelector('.nav');
const tabContainer = document.querySelector('.operations__tab-container');
const tabOperation = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');

// sare function yaha se suru

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(mov => mov.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const message = document.createElement('div');
message.classList.add(`cookie-message`);
message.innerHTML = `I am the Irretating one Click Ok to get rid of me <button class= btn_ok>OK😒</button>`;
message.style.backgroundColor = 'black';
header.append(message);

const btgn = document.querySelector(`.btn_ok`);
btgn.addEventListener(`click`, function () {
  message.parentElement.removeChild(message);
});

const btnScrollto = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);

btnScrollto.addEventListener(`click`, function (e) {
  const S1coords = section1.getBoundingClientRect();

  //   console.log(e.target.getBoundingClientRect());
  //   console.log(`current scroll X${window.pageXOffset}`, window.pageYOffset);

  //   console.log(S1coords);
  //   window.scrollTo(
  //     S1coords.left + window.pageXOffset,
  //     S1coords.top + window.pageYOffset
  //   );

  section1.scrollIntoView({ behavior: `smooth` });
});

navcontainer.addEventListener('click', function (l) {
  l.preventDefault();
  if (l.target.classList.contains('nav__link')) {
    const id = l.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// mouse hover kerne pe hight or remaining dim ho jayega

const hoverfunc = function (e) {
  if (!e.target.classList.contains('nav__links')) {
    const slected = e.target;
    const siblings = slected.closest('.nav').querySelectorAll('.nav__link');
    siblings.forEach(mov => {
      if (mov !== slected) {
        mov.style.opacity = this;
      }
    });
  }
};

navcontainer.addEventListener('mouseover', hoverfunc.bind(0.5));
navcontainer.addEventListener('mouseout', hoverfunc.bind(1));

// tab click krne pe wo tab lift hoga or uska containt dikhega

tabContainer.addEventListener('click', function (e) {
  const target = e.target.closest('.operations__tab');
  // console.log(target);

  if (!target) return;

  tabOperation.forEach(mov => mov.classList.remove('operations__tab--active'));
  tabsContent.forEach(mov =>
    mov.classList.remove('operations__content--active')
  );

  target.classList.add('operations__tab--active');

  const dataset = target.dataset;

  document
    .querySelector(`.operations__content--${target.dataset.tab}`)
    .classList.add('operations__content--active');

  console.log(dataset);
});

// Sticking Nav on page top \

// there is a method to check the foot which is described below
const marginHeight = nav.getBoundingClientRect().height;

const sticknav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else nav.classList.remove('sticky');
};

const sectionObservation = new IntersectionObserver(sticknav, {
  root: null,
  threshold: 0,
  rootMargin: `-${marginHeight}px`,
});
sectionObservation.observe(header);

const slide = document.querySelectorAll('.slide');
// slide.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%`));

// fuction defined which helps slide to move here we selceted all the slide then from foreach loop we are moving slide 100 % so next slide will come in play by setting transform  to translate on X axis
const slideGoto = function (slides) {
  slide.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slides)}%`)
  );
};
slideGoto(0); // slideGoto is defined function which we called here so when it loads it go to slide number zero

const slider = document.querySelector('.slider');

// ********so we can see all slide if we give over style as visible and reducing scale will reduce the size of img
// slider.style.transform = 'scale(0.2) translateX(-800px)';
// slider.style.overflow = 'visible';

const btnleft = document.querySelector('.slider__btn--left');
const btnright = document.querySelector('.slider__btn--right');
let currentSlide = 0;
const maxSlide = slide.length - 1;

const dotContainer = document.querySelector('.dots');
console.log(dotContainer);

// dot.classList.add('dots__dot--active');
const createDots = function () {
  slide.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

const activateDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
createDots();
activateDot(currentSlide);

const rightSlide = function () {
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  slideGoto(currentSlide); // slideGoto is defined function which we called here
  activateDot(currentSlide);
};
const leftSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else {
    currentSlide--;
  }
  slideGoto(currentSlide); // slideGoto is defined function which we called here
  activateDot(currentSlide);
};
btnright.addEventListener('click', rightSlide);
btnleft.addEventListener('click', leftSlide); // left right done pr event listner addd kr diye take button kaam kare
document.addEventListener('keydown', function (e) {
  console.log(e.key);
  if (e.key === 'ArrowRight') rightSlide();
  if (e.key === 'ArrowLeft') leftSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const Slide_data = e.target.dataset.slide;
    const Slide = e.target;
    slideGoto(Slide_data);
    console.log(Slide);
    activateDot(Slide_data);
  }
});

// ***************lazy loading image***********
const lazyImage = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observe) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  imageObserver.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.2,
});

lazyImage.forEach(mov => {
  imageObserver.observe(mov);
});
