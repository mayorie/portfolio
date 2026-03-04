let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');

function updateIndicators(index) {
  indicators.forEach(ind => ind.classList.remove('active'));
  if (indicators[index]) {
    indicators[index].classList.add('active');
  }
}

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
  updateIndicators(index);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function goToSlide(index) {
  if (index >= 0 && index < slides.length) {
    currentIndex = index;
    showSlide(currentIndex);
  }
}

if (slides.length > 0) {
  showSlide(currentIndex);
}
