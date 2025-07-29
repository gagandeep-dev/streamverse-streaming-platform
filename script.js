// GSAP Animations and Interactions
gsap.registerPlugin(ScrollTrigger);

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader-container');
    const loaderBlob = document.querySelector('.loader-blob');
    const loaderText = document.querySelector('.loader-text');
    
    // Animate loader out
    gsap.timeline()
        .to(loaderBlob, {
            scale: 0,
            rotation: 360,
            duration: 0.8,
            ease: "back.in(1.7)"
        })
        .to(loaderText, {
            opacity: 0,
            y: -20,
            duration: 0.5
        }, "-=0.3")
        .to(loader, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
                loader.style.display = 'none';
                initializeAnimations();
            }
        });
});

function initializeAnimations() {
    // Navbar Animation
    gsap.fromTo('.navbar', 
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    // Hero Content Animation
    const heroTl = gsap.timeline();
    heroTl
        .fromTo('.hero-badge', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
        )
        .fromTo('.hero-title', 
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.5"
        )
        .fromTo('.hero-description', 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.7"
        )
        .fromTo('.hero-meta', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.5"
        )
        .fromTo('.hero-actions', 
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4"
        )
        .fromTo('.hero-video-preview', 
            { opacity: 0, x: 50, scale: 0.9 },
            { opacity: 1, x: 0, scale: 1, duration: 1, ease: "power3.out" }, "-=1"
        );

    // Floating Blobs Animation
    gsap.to('.hero-blob', {
        rotation: 360,
        duration: 20,
        ease: "none",
        repeat: -1
    });

    // Content Cards Animation
    gsap.utils.toArray('.content-card').forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, scale: 0.9 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Section Titles Animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: title,
                    start: "top 90%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Parallax Effect for Background Blobs
    gsap.utils.toArray('.floating-blob').forEach(blob => {
        gsap.to(blob, {
            y: -100,
            duration: 2,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
                trigger: blob,
                start: "top bottom",
                end: "bottom top",
                scrub: 1
            }
        });
    });
}

// Interactive Elements
document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality
    const searchInput = document.querySelector('.search-input');
    const searchIcon = document.querySelector('.search-icon');

    searchInput.addEventListener('focus', () => {
        gsap.to(searchIcon, { scale: 1.2, duration: 0.3 });
    });

    searchInput.addEventListener('blur', () => {
        gsap.to(searchIcon, { scale: 1, duration: 0.3 });
    });

    // Content Card Hover Effects
    document.querySelectorAll('.content-card').forEach(card => {
        const image = card.querySelector('.card-image img');
        const overlay = card.querySelector('.card-overlay');
        const actions = card.querySelector('.card-actions');

        card.addEventListener('mouseenter', () => {
            gsap.to(card, { 
                y: -10, 
                duration: 0.3, 
                ease: "power2.out" 
            });
            
            if (image) {
                gsap.to(image, { 
                    scale: 1.05, 
                    duration: 0.5, 
                    ease: "power2.out" 
                });
            }
            
            if (overlay) {
                gsap.to(overlay, { 
                    opacity: 1, 
                    duration: 0.3 
                });
            }
            
            if (actions) {
                gsap.fromTo(actions.children, 
                    { y: 20, opacity: 0 },
                    { 
                        y: 0, 
                        opacity: 1, 
                        duration: 0.3, 
                        stagger: 0.1,
                        delay: 0.1
                    }
                );
            }
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, { 
                y: 0, 
                duration: 0.3, 
                ease: "power2.out" 
            });
            
            if (image) {
                gsap.to(image, { 
                    scale: 1, 
                    duration: 0.5, 
                    ease: "power2.out" 
                });
            }
            
            if (overlay) {
                gsap.to(overlay, { 
                    opacity: 0, 
                    duration: 0.3 
                });
            }
        });
    });

    // Button Hover Effects
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, { 
                scale: 1.05, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { 
                scale: 1, 
                duration: 0.3, 
                ease: "power2.out" 
            });
        });
    });

    // Navigation Arrow Functionality
    document.querySelectorAll('.nav-arrow').forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            const section = e.target.closest('.content-section');
            const slider = section.querySelector('.content-slider');
            const cardWidth = 300; // Approximate card width + gap
            
            if (arrow.classList.contains('nav-next')) {
                slider.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
            } else {
                slider.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
            }
            
            // Button click animation
            gsap.to(arrow, {
                scale: 0.9,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });

    // Play Button Interactions
    document.querySelectorAll('.play-button, .play-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // Ripple effect
            const ripple = document.createElement('div');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (rect.width / 2 - size / 2) + 'px';
            ripple.style.top = (rect.height / 2 - size / 2) + 'px';
            
            btn.style.position = 'relative';
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Navbar Scroll Effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            gsap.to(navbar, { 
                y: -100, 
                duration: 0.3, 
                ease: "power2.inOut" 
            });
        } else {
            // Scrolling up
            gsap.to(navbar, { 
                y: 0, 
                duration: 0.3, 
                ease: "power2.inOut" 
            });
        }
        
        lastScrollY = currentScrollY;
    });

    // Progress Bar Animation for Continue Watching
    document.querySelectorAll('.progress-fill').forEach(progress => {
        const width = progress.style.width;
        progress.style.width = '0%';
        
        gsap.to(progress, {
            width: width,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
                trigger: progress,
                start: "top 80%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Smooth Scrolling for Internal Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: target,
                    ease: "power2.inOut"
                });
            }
        });
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for Performance
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, observerOptions);

// Observe all content cards
document.querySelectorAll('.content-card').forEach(card => {
    observer.observe(card);
});

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals or overlays
        document.querySelectorAll('.card-overlay').forEach(overlay => {
            gsap.to(overlay, { opacity: 0, duration: 0.3 });
        });
    }
    
    if (e.key === '/' && !e.target.matches('input')) {
        e.preventDefault();
        document.querySelector('.search-input').focus();
    }
});

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.querySelectorAll('.content-slider').forEach(slider => {
    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(slider);
    });
});

function handleSwipe(slider) {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        const cardWidth = 280;
        if (diff > 0) {
            // Swipe left - scroll right
            slider.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
        } else {
            // Swipe right - scroll left
            slider.scrollBy({ left: -cardWidth * 2, behavior: 'smooth' });
        }
    }
}

// Video Background Controls (add to existing JavaScript)
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.hero-bg-video');
    const muteBtn = document.querySelector('.mute-btn');
    const pauseBtn = document.querySelector('.pause-btn');
    const soundOnIcon = document.querySelector('.sound-on');
    const soundOffIcon = document.querySelector('.sound-off');
    const pauseIcon = document.querySelector('.pause-icon');
    const playIcon = document.querySelector('.play-icon');

    // Video loading handler
    if (video) {
        video.addEventListener('loadstart', () => {
            console.log('Video loading started');
        });

        video.addEventListener('canplay', () => {
            video.classList.add('loaded');
            console.log('Video ready to play');
        });

        video.addEventListener('error', (e) => {
            console.log('Video error:', e);
            document.querySelector('.video-fallback').style.display = 'block';
        });

        // Mute/Unmute functionality
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                video.muted = !video.muted;
                
                if (video.muted) {
                    soundOnIcon.style.display = 'none';
                    soundOffIcon.style.display = 'block';
                } else {
                    soundOnIcon.style.display = 'block';
                    soundOffIcon.style.display = 'none';
                }
                
                gsap.to(muteBtn, {
                    scale: 0.9,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
            });
        }

        // Pause/Play functionality
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    pauseIcon.style.display = 'block';
                    playIcon.style.display = 'none';
                } else {
                    video.pause();
                    pauseIcon.style.display = 'none';
                    playIcon.style.display = 'block';
                }
                
                gsap.to(pauseBtn, {
                    scale: 0.9,
                    duration: 0.1,
                    yoyo: true,
                    repeat: 1
                });
            });
        }
    }
});
// NEW RELEASES SECTION ANIMATIONS
function initNewReleasesAnimations() {
  const newReleasesSection = document.querySelector('.new-releases-section');
  const newReleasesCards = document.querySelectorAll('.new-releases-slider .content-card');
  const newBadges = document.querySelectorAll('.new-badge');
  
  if (!newReleasesSection) return;

  // Section title animation
  const sectionTitle = newReleasesSection.querySelector('.section-title');
  gsap.fromTo(sectionTitle,
    { x: -100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: newReleasesSection,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // New releases cards animation
  gsap.fromTo(newReleasesCards,
    { y: 80, opacity: 0, scale: 0.8 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: newReleasesSection,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // New badges pulsing animation
  newBadges.forEach(badge => {
    gsap.to(badge, {
      scale: 1.1,
      duration: 1.5,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });

    // Glow effect
    gsap.to(badge, {
      boxShadow: "0 0 20px rgba(255, 107, 107, 0.6)",
      duration: 2,
      ease: "power2.inOut",
      yoyo: true,
      repeat: -1
    });
  });

  // Card hover animations
  newReleasesCards.forEach(card => {
    const newBadge = card.querySelector('.new-badge');
    const cardImage = card.querySelector('.card-image img');
    const cardOverlay = card.querySelector('.card-overlay');

    card.addEventListener('mouseenter', () => {
      const tl = gsap.timeline();
      
      tl
        .to(card, {
          scale: 1.05,
          y: -15,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(cardImage, {
          scale: 1.15,
          duration: 0.4,
          ease: "power2.out"
        }, 0)
        .to(newBadge, {
          scale: 1.2,
          rotation: 5,
          duration: 0.3,
          ease: "back.out(1.7)"
        }, 0.1)
        .to(cardOverlay, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.out"
        }, 0.2);
    });

    card.addEventListener('mouseleave', () => {
      const tl = gsap.timeline();
      
      tl
        .to(card, {
          scale: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(cardImage, {
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        }, 0)
        .to(newBadge, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        }, 0)
        .to(cardOverlay, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out"
        }, 0);
    });
  });
}

// GENRES SECTION ANIMATIONS
function initGenresAnimations() {
  const genresSection = document.querySelector('.genres-section');
  const genreCards = document.querySelectorAll('.genre-card');
  
  if (!genresSection) return;

  // Section title animation
  const sectionTitle = genresSection.querySelector('.section-title');
  gsap.fromTo(sectionTitle,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: genresSection,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Genre cards staggered animation
  gsap.fromTo(genreCards,
    { y: 100, opacity: 0, scale: 0.8, rotationY: 45 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      rotationY: 0,
      duration: 1,
      stagger: {
        amount: 0.8,
        from: "start"
      },
      ease: "power3.out",
      scrollTrigger: {
        trigger: genresSection,
        start: "top 70%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Individual genre card animations
  genreCards.forEach((card, index) => {
    const genreIcon = card.querySelector('.genre-icon');
    const genreTitle = card.querySelector('.genre-title');
    const genreCount = card.querySelector('.genre-count');
    const genreBackground = card.querySelector('.genre-background img');

    // Hover animations
    card.addEventListener('mouseenter', () => {
      const tl = gsap.timeline();
      
      tl
        .to(card, {
          scale: 1.05,
          y: -20,
          rotationY: 5,
          duration: 0.5,
          ease: "power2.out"
        })
        .to(genreBackground, {
          scale: 1.2,
          duration: 0.5,
          ease: "power2.out"
        }, 0)
        .to(genreIcon, {
          scale: 1.3,
          rotation: 360,
          duration: 0.6,
          ease: "back.out(1.7)"
        }, 0.1)
        .to(genreTitle, {
          scale: 1.1,
          y: -5,
          duration: 0.3,
          ease: "power2.out"
        }, 0.2)
        .to(genreCount, {
          scale: 1.1,
          y: -3,
          duration: 0.3,
          ease: "power2.out"
        }, 0.25);
    });

    card.addEventListener('mouseleave', () => {
      const tl = gsap.timeline();
      
      tl
        .to(card, {
          scale: 1,
          y: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "power2.out"
        })
        .to(genreBackground, {
          scale: 1,
          duration: 0.5,
          ease: "power2.out"
        }, 0)
        .to(genreIcon, {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: "power2.out"
        }, 0)
        .to([genreTitle, genreCount], {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        }, 0.1);
    });

    // Click animation
    card.addEventListener('click', () => {
      gsap.to(card, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    });
  });
}

// FEATURES SECTION ANIMATIONS
function initFeaturesAnimations() {
  const featuresSection = document.querySelector('.features-section');
  const featureCards = document.querySelectorAll('.feature-card');
  
  if (!featuresSection) return;

  // Section title and description animation
  const sectionTitle = featuresSection.querySelector('.section-title');
  const sectionDescription = featuresSection.querySelector('.section-description');

  const headerTl = gsap.timeline({
    scrollTrigger: {
      trigger: featuresSection,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  });

  headerTl
    .fromTo(sectionTitle,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(sectionDescription,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

  // Feature cards animation
  featureCards.forEach((card, index) => {
    const featureIcon = card.querySelector('.feature-icon');
    const featureTitle = card.querySelector('.feature-title');
    const featureDescription = card.querySelector('.feature-description');

    // Initial card animation
    gsap.fromTo(card,
      { y: 120, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        delay: index * 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Icon animation
    gsap.fromTo(featureIcon,
      { scale: 0, rotation: -180 },
      {
        scale: 1,
        rotation: 0,
        duration: 0.8,
        delay: index * 0.2 + 0.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Text content animation
    gsap.fromTo([featureTitle, featureDescription],
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: index * 0.2 + 0.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover animations
    card.addEventListener('mouseenter', () => {
      const tl = gsap.timeline();
      
      tl
        .to(card, {
          y: -20,
          scale: 1.05,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(featureIcon, {
          scale: 1.2,
          rotation: 10,
          duration: 0.3,
          ease: "back.out(1.7)"
        }, 0)
        .to(featureTitle, {
          color: "#4ecdc4",
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        }, 0.1);
    });

    card.addEventListener('mouseleave', () => {
      const tl = gsap.timeline();
      
      tl
        .to(card, {
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        })
        .to(featureIcon, {
          scale: 1,
          rotation: 0,
          duration: 0.3,
          ease: "power2.out"
        }, 0)
        .to(featureTitle, {
          color: "white",
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        }, 0);
    });
  });
}

// SUBSCRIPTION PLANS ANIMATIONS
function initSubscriptionAnimations() {
  const subscriptionSection = document.querySelector('.subscription-section');
  const planCards = document.querySelectorAll('.plan-card');
  
  if (!subscriptionSection) return;

  // Section header animation
  const sectionTitle = subscriptionSection.querySelector('.section-title');
  const sectionDescription = subscriptionSection.querySelector('.section-description');

  const headerTl = gsap.timeline({
    scrollTrigger: {
      trigger: subscriptionSection,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse"
    }
  });

  headerTl
    .fromTo(sectionTitle,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "back.out(1.7)" }
    )
    .fromTo(sectionDescription,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

  // Plan cards animation
  planCards.forEach((card, index) => {
    const planHeader = card.querySelector('.plan-header');
    const planFeatures = card.querySelector('.plan-features');
    const planBtn = card.querySelector('.plan-btn');
    const popularBadge = card.querySelector('.popular-badge');
    const featureItems = card.querySelectorAll('.feature-item');

    // Card entrance animation
    gsap.fromTo(card,
      { y: 150, opacity: 0, scale: 0.8, rotationX: 45 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        delay: index * 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Popular badge animation
    if (popularBadge) {
      gsap.fromTo(popularBadge,
        { scale: 0, y: -30, rotation: -180 },
        {
          scale: 1,
          y: 0,
          rotation: 0,
          duration: 0.8,
          delay: index * 0.3 + 0.5,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Continuous glow animation for popular badge
      gsap.to(popularBadge, {
        boxShadow: "0 0 30px rgba(78, 205, 196, 0.8)",
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1
      });
    }

    // Plan header animation
    gsap.fromTo(planHeader.children,
      { y: 50, opacity: 0, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        delay: index * 0.3 + 0.7,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Feature items animation
    gsap.fromTo(featureItems,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: index * 0.3 + 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Plan button animation
    gsap.fromTo(planBtn,
      { y: 30, opacity: 0, scale: 0.9 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: index * 0.3 + 1.3,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Card hover animations
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('popular')) {
        gsap.to(card, {
          scale: 1.05,
          y: -15,
          rotationY: 5,
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        gsap.to(card, {
          scale: 1.02,
          y: -10,
          duration: 0.5,
          ease: "power2.out"
        });
      }
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    });

    // Button hover animation
    planBtn.addEventListener('mouseenter', () => {
      gsap.to(planBtn, {
        scale: 1.05,
        y: -5,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    planBtn.addEventListener('mouseleave', () => {
      gsap.to(planBtn, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    // Button click animation
    planBtn.addEventListener('click', () => {
      gsap.to(planBtn, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut"
      });
    });
  });
}

// FOOTER ANIMATIONS
function initFooterAnimations() {
  const footer = document.querySelector('.footer');
  const footerBrand = document.querySelector('.footer-brand');
  const footerColumns = document.querySelectorAll('.footer-column');
  const socialLinks = document.querySelectorAll('.social-link');
  const footerBottom = document.querySelector('.footer-bottom');
  const deviceIcons = document.querySelectorAll('.device-icon');
  
  if (!footer) return;

  // Footer brand animation
  gsap.fromTo(footerBrand,
    { x: -100, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Footer columns animation
  gsap.fromTo(footerColumns,
    { y: 80, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footer,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Social links animation
  gsap.fromTo(socialLinks,
    { scale: 0, rotation: -180 },
    {
      scale: 1,
      rotation: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: footerBrand,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Social links hover animations
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        scale: 1.3,
        y: -8,
        rotation: 15,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    });

    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        scale: 1,
        y: 0,
        rotation: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Device icons animation
  deviceIcons.forEach((icon, index) => {
    gsap.fromTo(icon,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 0.7,
        duration: 0.5,
        delay: index * 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: icon.parentElement,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Hover animation
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, {
        scale: 1.3,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, {
        scale: 1,
        opacity: 0.7,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Footer bottom animation
  gsap.fromTo(footerBottom,
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: footerBottom,
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );

  // Certification badges animation
  const certBadges = document.querySelectorAll('.certification-badge');
  gsap.fromTo(certBadges,
    { scale: 0, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: footerBottom,
        start: "top 90%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    }
  );
}

// BACK TO TOP BUTTON
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTop');
  
  if (!backToTopBtn) return;

  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
      gsap.to(backToTopBtn, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(backToTopBtn, {
        scale: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          backToTopBtn.classList.remove('visible');
        }
      });
    }
  });

  // Smooth scroll to top with animation
  backToTopBtn.addEventListener('click', () => {
    // Button click animation
    gsap.to(backToTopBtn, {
      scale: 0.8,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Smooth scroll to top
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 2,
      ease: "power2.inOut"
    });
  });

  // Button hover animation
  backToTopBtn.addEventListener('mouseenter', () => {
    gsap.to(backToTopBtn, {
      scale: 1.2,
      y: -5,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  backToTopBtn.addEventListener('mouseleave', () => {
    gsap.to(backToTopBtn, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out"
    });
  });
}

// NEWSLETTER MODAL ANIMATIONS
function initNewsletterModal() {
  const modal = document.getElementById('newsletterModal');
  const modalContent = document.querySelector('.modal-content');
  const closeBtn = document.querySelector('.modal-close');
  const form = document.querySelector('.newsletter-form');
  
  if (!modal) return;

  // Show modal after delay (optional)
  setTimeout(() => {
    if (!localStorage.getItem('newsletterShown')) {
      showModal();
      localStorage.setItem('newsletterShown', 'true');
    }
  }, 15000);

  function showModal() {
    modal.classList.add('active');
    
    const tl = gsap.timeline();
    tl
      .fromTo(modal,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      )
      .fromTo(modalContent,
        { scale: 0.7, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
        0.1
      )
      .fromTo(modalContent.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: "power2.out" },
        0.3
      );
  }

  function hideModal() {
    const tl = gsap.timeline();
    tl
      .to(modalContent.children,
        { y: -20, opacity: 0, duration: 0.2, stagger: 0.05, ease: "power2.inOut" }
      )
      .to(modalContent,
        { scale: 0.8, opacity: 0, y: 30, duration: 0.3, ease: "power2.inOut" },
        0.1
      )
      .to(modal,
        { opacity: 0, duration: 0.2, ease: "power2.inOut" },
        0.2
      )
      .call(() => {
        modal.classList.remove('active');
      });
  }

  // Close modal events
  closeBtn?.addEventListener('click', hideModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) hideModal();
  });

  // Form submission animation
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    gsap.to(form, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Show success animation
        gsap.to(form, {
          y: -20,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            form.innerHTML = '<div style="text-align: center; color: #4ecdc4; font-weight: 600;">Thank you for subscribing! 🎉</div>';
            gsap.fromTo(form,
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
            setTimeout(hideModal, 2000);
          }
        });
      }
    });
  });
}

// INITIALIZE ALL ANIMATIONS
function initAllNewSectionAnimations() {
  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize all new section animations
    initNewReleasesAnimations();
    initGenresAnimations();
    initFeaturesAnimations();
    initSubscriptionAnimations();
    initFooterAnimations();
    initBackToTop();
    initNewsletterModal();
    
    console.log('All new section animations initialized! 🎬');
  });
}

// Call the initialization function
initAllNewSectionAnimations();

// UTILITY FUNCTIONS

// Refresh ScrollTrigger on window resize
window.addEventListener('resize', () => {
  ScrollTrigger.refresh();
});

// Pause animations when page is not visible
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    gsap.globalTimeline.pause();
  } else {
    gsap.globalTimeline.resume();
  }
});
