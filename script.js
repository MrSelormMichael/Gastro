// Global variables
let currentSlideIndex = 0;
let slideInterval;

// Schedule data
const scheduleData = {
  1: [
    {
      time: '9:00 AM',
      title: 'Festival Opening & Welcome',
      type: 'keynote',
      description: 'Official opening ceremony with traditional performances and keynote on "Shaping the Future of Food in Ghana"'
    },
    {
      time: '10:00 AM',
      title: 'Farm-to-Fork Tasting Sessions Begin',
      type: 'talk',
      description: 'Sample exquisite dishes from Ghana\'s top chefs featuring fresh local ingredients'
    },
    {
      time: '11:00 AM',
      title: 'Cooking Demo: Modern Ghanaian Cuisine',
      speaker: 'Chef Abena Mensah',
      type: 'workshop',
      description: 'Watch Chef Abena transform traditional recipes with contemporary techniques'
    },
    {
      time: '12:30 PM',
      title: 'Fresh Produce Market Opens',
      type: 'networking',
      description: 'Shop directly from local farmers and discover artisanal food products'
    },
    {
      time: '2:00 PM',
      title: 'Food Tech Innovation Showcase',
      speaker: 'Samuel Antwi',
      type: 'talk',
      description: 'Discover cutting-edge technologies transforming Ghana\'s food industry'
    },
    {
      time: '3:30 PM',
      title: 'Cultural Performance & Live Music',
      type: 'networking',
      description: 'Traditional dance, drumming, and musical performances'
    },
    {
      time: '5:00 PM',
      title: 'Sustainable Farming Panel Discussion',
      speaker: 'Kwame Osei & Kofi Mensah',
      type: 'talk',
      description: 'Learn about organic farming practices and sustainable agriculture in Ghana'
    },
    {
      time: '7:00 PM',
      title: 'Evening Networking & Tastings',
      type: 'networking',
      description: 'Connect with chefs, farmers, and food enthusiasts over delicious food'
    }
  ],
  2: [
    {
      time: '9:00 AM',
      title: 'Breakfast Tastings & Morning Welcome',
      type: 'networking',
      description: 'Start your day with traditional Ghanaian breakfast delicacies'
    },
    {
      time: '10:00 AM',
      title: 'Pastry Workshop: Ghanaian Desserts',
      speaker: 'Chef Ama Darko',
      type: 'workshop',
      description: 'Learn to create stunning desserts using local ingredients'
    },
    {
      time: '11:30 AM',
      title: 'Youth Cooking Challenge',
      type: 'workshop',
      description: 'Young chefs compete in an exciting culinary challenge'
    },
    {
      time: '1:00 PM',
      title: 'Lunch Break & Market Exploration',
      type: 'break',
      description: 'Explore the fresh produce market and enjoy lunch'
    },
    {
      time: '2:30 PM',
      title: 'Culinary Education & Career Paths',
      speaker: 'Chef Yaa Boateng',
      type: 'talk',
      description: 'Discover opportunities in Ghana\'s growing culinary industry'
    },
    {
      time: '4:00 PM',
      title: 'Farm Tours & Agricultural Exhibits',
      speaker: 'Kwame Osei',
      type: 'workshop',
      description: 'Virtual farm tours and interactive agricultural displays'
    },
    {
      time: '5:30 PM',
      title: 'Grand Finale Cooking Competition',
      type: 'keynote',
      description: 'Top chefs compete in the ultimate culinary showdown'
    },
    {
      time: '7:00 PM',
      title: 'Closing Ceremony & Cultural Celebration',
      type: 'networking',
      description: 'Festival finale with awards, performances, and celebration'
    },
    {
      time: '8:00 PM',
      title: 'After Party & Live Music',
      type: 'networking',
      description: 'Dance the night away with live bands and DJ performances'
    }
  ]
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

// Initialize all features
function initializeApp() {
  setupNavigation();
  setupHeroSlideshow();
  setupCountdown();
  setupSchedule();
  setupBackToTop();
  setupScrollAnimations();
}

// ==================== NAVIGATION ====================
function setupNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!navbar || !mobileMenuBtn || !mobileNav) return;

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (icon) {
      icon.className = mobileNav.classList.contains('active') ? 'fas fa-times' : 'fas fa-bars';
    }
  });

  // Smooth scrolling for navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        scrollToSection(targetId.substring(1));
        // Close mobile menu
        mobileNav.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (icon) {
          icon.className = 'fas fa-bars';
        }
      }
    });
  });
}

// Smooth scroll to section
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    const navbar = document.getElementById('navbar');
    const navHeight = navbar ? navbar.offsetHeight : 80;
    const elementPosition = element.offsetTop - navHeight;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
}

// ==================== HERO SLIDESHOW ====================
function setupHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  
  if (slides.length === 0) return;

  // Auto-advance slides every 5 seconds
  startSlideshow();
}

function startSlideshow() {
  slideInterval = setInterval(() => {
    changeSlide(1);
  }, 5000);
}

function changeSlide(direction) {
  const slides = document.querySelectorAll('.hero-slide');
  
  if (slides.length === 0) return;
  
  // Remove active class from current slide
  slides[currentSlideIndex].classList.remove('active');
  
  // Calculate next slide index
  currentSlideIndex = (currentSlideIndex + direction + slides.length) % slides.length;
  
  // Add active class to next slide
  slides[currentSlideIndex].classList.add('active');
  
  // Reset interval
  clearInterval(slideInterval);
  startSlideshow();
}

// ==================== COUNTDOWN TIMER ====================
function setupCountdown() {
  const eventDate = new Date('2025-12-05T09:00:00').getTime();
  
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance > 0) {
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      daysEl.textContent = days.toString().padStart(2, '0');
      hoursEl.textContent = hours.toString().padStart(2, '0');
      minutesEl.textContent = minutes.toString().padStart(2, '0');
      secondsEl.textContent = seconds.toString().padStart(2, '0');
    } else {
      // Event has started or passed
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
    }
  }

  // Update immediately and then every second
  updateCountdown();
  setInterval(updateCountdown, 1000);
}

// ==================== SCHEDULE SECTION ====================
function setupSchedule() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const scheduleContent = document.querySelector('.schedule-content');
  
  if (!scheduleContent || tabBtns.length === 0) return;
  
  // Add click handlers to tabs
  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
      showScheduleDay(index + 1);
    });
  });
  
  // Show day 1 by default
  showScheduleDay(1);
}

function showScheduleDay(day) {
  const scheduleContent = document.querySelector('.schedule-content');
  const tabBtns = document.querySelectorAll('.tab-btn');
  
  if (!scheduleContent) return;
  
  // Update active tab
  tabBtns.forEach((btn, index) => {
    if (index + 1 === day) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // Clear previous content
  scheduleContent.innerHTML = '';
  
  // Get schedule data for the selected day
  const daySchedule = scheduleData[day];
  
  if (!daySchedule) return;
  
  // Add schedule items for the day
  daySchedule.forEach((item, index) => {
    const scheduleItem = document.createElement('div');
    scheduleItem.className = 'schedule-item';
    scheduleItem.style.opacity = '0';
    scheduleItem.style.transform = 'translateX(-30px)';
    
    scheduleItem.innerHTML = `
      <div class="schedule-time">
        <i class="fas fa-clock"></i>
        <span>${item.time}</span>
      </div>
      <div class="schedule-details">
        <span class="schedule-type ${item.type}">${item.type}</span>
        <h3 class="schedule-title">${item.title}</h3>
        ${item.speaker ? `<p class="schedule-speaker"><i class="fas fa-user"></i> ${item.speaker}</p>` : ''}
        <p class="schedule-description">${item.description}</p>
      </div>
    `;
    
    scheduleContent.appendChild(scheduleItem);
    
    // Animate in with delay
    setTimeout(() => {
      scheduleItem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      scheduleItem.style.opacity = '1';
      scheduleItem.style.transform = 'translateX(0)';
    }, index * 100);
  });
}

// ==================== SCROLL ANIMATIONS ====================
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all elements with fade-in class
  const fadeElements = document.querySelectorAll('.fade-in, .stat-item, .highlight-card, .speaker-card');
  fadeElements.forEach(el => {
    observer.observe(el);
  });
}

// ==================== BACK TO TOP BUTTON ====================
function setupBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (!backToTopBtn) return;
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.remove('hidden');
      backToTopBtn.style.display = 'flex';
    } else {
      backToTopBtn.classList.add('hidden');
      backToTopBtn.style.display = 'none';
    }
  });
  
  // Scroll to top on click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ==================== UTILITY FUNCTIONS ====================

// Add smooth hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.highlight-card, .speaker-card, .stat-item, .sponsor-logo');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-15px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Log when page is fully loaded
window.addEventListener('load', () => {
  console.log('🎉 Gastro Feastival 2025 - Page loaded successfully!');
  console.log('✅ Slideshow active');
  console.log('✅ Countdown active');
  console.log('✅ Schedule tabs active');
  console.log('✅ Smooth scrolling active');
});