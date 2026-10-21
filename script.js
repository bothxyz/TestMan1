
// FORM dan scroll
 const modal = document.getElementById('form-modal');
  const joinBtn = document.getElementById('Schedule-button');

  let scrollPos = 0;

  // Fungsi buka modal
  function openModal() {
    scrollPos = window.scrollY || document.documentElement.scrollTop;
    document.body.style.top = `-${scrollPos}px`;
    document.body.classList.add('overflow-hidden');
    modal.classList.remove('hidden');
  }

  // Fungsi tutup modal
function closeModal() {
  modal.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');

  // Biarkan browser render ulang dulu, baru scroll
  const scrollY = parseInt(document.body.style.top || '0') * -1;

  // Reset style
  document.body.style.top = '';

  // Gunakan timeout agar scrollTo tidak dieksekusi terlalu cepat
  setTimeout(() => {
    window.scrollTo({
      top: scrollY,
      behavior: 'instant' 
    });
  }, 0);
}

  // Event klik tombol "Schedule"
  joinBtn.addEventListener('click', openModal);
  

// HEADER SCROLL
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// slideshow
document.addEventListener("DOMContentLoaded", function () {
  const allSlideshows = document.querySelectorAll(".slideshow");

  allSlideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll(".slide");
    let currentSlide = 0;

    // Init slide pertama
    slides.forEach((slide, i) => {
      slide.style.opacity = i === 0 ? '1' : '0';
      slide.style.zIndex = i === 0 ? '2' : '1';
    });

    setInterval(() => {
      const prev = currentSlide;
      currentSlide = (currentSlide + 1) % slides.length;

      // Tampilkan slide baru
      slides[currentSlide].style.opacity = '1';
      slides[currentSlide].style.zIndex = '2';

      // Hilangkan slide sebelumnya setelah delay kecil
      setTimeout(() => {
        slides[prev].style.opacity = '0';
        slides[prev].style.zIndex = '1';
      }, 100);
    }, 4000);
  });


  // INTERSECTION OBSERVER
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .testimonial-card, .comparison-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

   // SMOOTH SCROLLING
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
      const navLinks = document.querySelector('.nav-links');
      navLinks.classList.remove('active');
    });
  });

  // CLOSE MOBILE MENU OUTSIDE CLICK
  document.addEventListener('click', function(event) {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    if (!nav.contains(event.target) && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
    }
  });

  // FLOATING ANIMATION SPEED
  document.querySelectorAll('.floating-element').forEach((element, index) => {
    element.style.animationDuration = `${6 + index * 2}s`;
  });

  // INTERACTIVE TILT EFFECT
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      card.style.transform = `translateY(-8px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(-8px) rotateX(0) rotateY(0)';
    });
  });
});

// AOS INIT
if (typeof AOS !== "undefined") {
  AOS.init({
    once: true,
    duration: 500,
    easing: 'ease-in-out'
  });
}

//section time stealing
const icons = document.querySelectorAll('.icon');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.6 });

icons.forEach(icon => observer.observe(icon));

//section we get it
  const imageBox = document.querySelector('.image-box');
  const textBox = document.querySelector('.text-content');

  const observerWeGetIt = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      imageBox.classList.add('show');
      textBox.classList.add('show');
    } else {
      imageBox.classList.remove('show');
      textBox.classList.remove('show');
    }
  });
}, { threshold: 0.3 });

observerWeGetIt.observe(document.querySelector('#we-get-it'));


//section testimoni
  document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".testimonial-logos");
    const card = document.querySelector(".testimonial-card");

    const testimonialObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            logo.classList.add("fade-in-left");
            card.classList.add("fade-in-right");
          } else {
            logo.classList.remove("fade-in-left");
            card.classList.remove("fade-in-right");
          }
        });
      },
      { threshold: 0.3 }
    );

    testimonialObserver.observe(document.querySelector(".testimonial-wrapper"));
  });


