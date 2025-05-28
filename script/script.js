// t슬라이드
const slider = document.getElementById('slider');
  const slides = slider.querySelectorAll('li');
  const slideHeight = 500;
  let index = 0;
  let isTransitioning = false;

  const moveToSlide  = () => {
    slider.style.transition = 'transform 1s ease-in-out';
    slider.style.transform = `translateY(-${slideHeight * index}px)`;
  };

  const resetToFirst = () => {
    slider.style.transition = 'none';
    slider.style.transform = 'translateY(0)';
    index = 0;
  };

  slider.addEventListener('transitionend', () => {
    if (index === slides.length - 1) {
      resetToFirst();
    }
  });

  setInterval(() => {
    if (isTransitioning) return;
    isTransitioning = true;
    index++;
    moveToSlide ();
    setTimeout(() => {
      isTransitioning = false;
    }, 1100);
  }, 3000);


//  탭메뉴
const tabs = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.tab_content');
console.log(tabs);
console.log(tabContent);

tabs.forEach(tab => {
      tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContent.forEach(tcontent => tcontent.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('tab_' + tab.dataset.tab).classList.add('active');
            console.log(tab.dataset);
            console.log(tab.dataset.tab);
      });
});





// 지점검색
const inputText = document.getElementById("input_text");
let btn = document.querySelector(".search_btn");
btn.addEventListener("click", input);
window.addEventListener("keyup", (e)=> {
    if(e.key == "Enter" && inputText === document.activeElement) {
        //inputText === document.activeElement (활성화된게 inputText 일때 엔터를 누르면 먹음(inputText 없으면 안 먹음))
        input();
    }
});

function input() {
    window.open("https://www.google.com/maps/search/%EB%9F%B0%EB%8D%98%EB%B2%A0%EC%9D%B4%EA%B8%80%EB%AE%A4%EC%A7%80%EC%97%84" + inputText.value + "/data=!3m1!4b1?entry=ttu&g_ep=EgoyMDI1MDUwNS4wIKXMDSoASAFQAw%3D%3D");
}






// 스크롤페이드인

const content = document.getElementsByClassName("content");
console.log(content);
window.addEventListener('scroll',()=>{
    const winH = window.innerHeight; // 전체 화면 높이 1080
    console.log(winH);
    for(let i = 0; i < content.length; i++){
        const contentTop = content[i].getBoundingClientRect().top; 
        console.log(contentTop);
        if(contentTop - winH < 0) {
            content[i].classList.add('in');
        }else{
            content[i].classList.remove('in');
        }
    }
});

// 반응형 캐러셀
const track = document.getElementById('carousel-track');
const dotsContainer = document.getElementById('carousel-dots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const imageList = [
  "../img/1.png",
  "../img/2.png",
  "../img/3.png",
  "../img/4.png",
  "../img/5.png",
  "../img/6.png"
];

const labelList = [
  "Potato Cheese Bagel\n감자 치즈 베이글",
  "Pretzel Butter Bagel\n프레첼 버터 베이글",
  "Spring Onion Bagel\n쪽파 베이글",
  "Pretzel Plain Bagel\n프레첼 플레인 베이글",
  "Cheese Honey Bagel\n치즈 허니 베이글",
  "Plain Bagel\n플레인 베이글"
];

const labelBgList = [
  "../img/memo1.png",
  "../img/memo2.png",
  "../img/memo3.png",
  "../img/memo1.png",
  "../img/memo2.png",
  "../img/memo3.png"
];

let slideCount = imageList.length;
let currentIndex = 0;
let visibleCount = getVisibleCount();

function renderSlides() {
  track.innerHTML = '';
  const totalImages = [...imageList.slice(-visibleCount), ...imageList, ...imageList.slice(0, visibleCount)];
  const totalLabels = [...labelList.slice(-visibleCount), ...labelList, ...labelList.slice(0, visibleCount)];
  const totalBgs = [...labelBgList.slice(-visibleCount), ...labelBgList, ...labelBgList.slice(0, visibleCount)];

  totalImages.forEach((src, idx) => {
    const [eng, kor] = totalLabels[idx].split('\n');
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `
      <img src="${src}" alt="">
      <div class="slide-label" style="background-image: url('${totalBgs[idx]}')">
        <div class="slide-label-text">
          <span class="eng">${eng}</span>
          <span class="kor">${kor}</span>
        </div>
      </div>
    `;
    track.appendChild(slide);
  });
}

function renderDots() {
  dotsContainer.innerHTML = '';
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.dataset.index = i;
    dot.addEventListener('click', () => {
      goToSlide(i);
    });
    dotsContainer.appendChild(dot);
  }
}

function getVisibleCount() {
  if (window.innerWidth < 768) return 1;
  else if (window.innerWidth < 1024) return 2;
  else return 3;
}

function updateCarousel(instant = false) {
  const slideWidth = track.children[0].getBoundingClientRect().width;
  const offset = (currentIndex + visibleCount) * slideWidth;
  track.style.transition = instant ? "none" : "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${offset}px)`;

  const dots = dotsContainer.querySelectorAll('button');
  dots.forEach(dot => dot.classList.remove('active'));
  if (dots[currentIndex]) dots[currentIndex].classList.add('active');
}

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

function moveToNext() {
  currentIndex++;
  updateCarousel();
  if (currentIndex >= slideCount) {
    setTimeout(() => {
      currentIndex = 0;
      updateCarousel(true);
    }, 500);
  }
}

function moveToPrev() {
  currentIndex--;
  updateCarousel();
  if (currentIndex < 0) {
    setTimeout(() => {
      currentIndex = slideCount - 1;
      updateCarousel(true);
    }, 500);
  }
}

let autoSlide = setInterval(moveToNext, 3000);

nextBtn.addEventListener('click', () => {
  moveToNext();
  resetAuto();
});

prevBtn.addEventListener('click', () => {
  moveToPrev();
  resetAuto();
});

function resetAuto() {
  clearInterval(autoSlide);
  autoSlide = setInterval(moveToNext, 3000);
}

function initCarousel() {
  visibleCount = getVisibleCount();
  renderSlides();
  renderDots();
  currentIndex = 0;
  updateCarousel(true);
}

window.addEventListener('resize', () => {
  initCarousel();
});

initCarousel();