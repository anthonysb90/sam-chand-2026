gsap.registerPlugin(ScrollTrigger);

  // LOADER
  window.addEventListener("load", () => {
    setTimeout(() => {
      document.getElementById("loader").classList.add("hidden");
      runHeroAnimation();
    }, 2200);
  });

  // HERO ENTRANCE
  function runHeroAnimation() {
    gsap.set(".hero-logo-item", { opacity: 0, y: 16 });
    gsap.set(["#hero-meta","#hero-pre","#hero-main","#hero-sub","#hero-cta-wrap",".hero-fine",".hero-scroll"], { opacity: 0, y: 20 });
    gsap.set("#hero-divider", { width: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".hero-logo-item", { opacity: 1, y: 0, stagger: 0.1, duration: 0.7 })
      .to("#hero-divider", { width: 80, duration: 0.55, ease: "power2.inOut" }, "-=0.3")
      .to("#hero-meta", { opacity: 1, y: 0, duration: 0.55 }, "-=0.2")
      .to("#hero-pre", { opacity: 1, y: 0, duration: 0.6 }, "-=0.35")
      .to("#hero-main", { opacity: 1, y: 0, duration: 0.75 }, "-=0.45")
      .to("#hero-sub", { opacity: 1, y: 0, duration: 0.55 }, "-=0.3")
      .to("#hero-cta-wrap", { opacity: 1, y: 0, duration: 0.55 }, "-=0.25")
      .to(".hero-fine", { opacity: 1, y: 0, duration: 0.45 }, "-=0.2")
      .to(".hero-scroll", { opacity: 1, y: 0, duration: 0.4 }, "-=0.2");
  }

  // NAV SCROLL
  const nav = document.getElementById("main-nav");
  ScrollTrigger.create({
    start: "top -60",
    onUpdate: self => {
      nav.classList.toggle("scrolled", self.progress > 0);
    }
  });

  // REVEAL on scroll
  gsap.utils.toArray(".reveal").forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 44 },
      { opacity: 1, y: 0, duration: 0.85, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 86%", once: true } }
    );
  });
  gsap.utils.toArray(".reveal-left").forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -64 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true } }
    );
  });
  gsap.utils.toArray(".reveal-right").forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: 64 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 82%", once: true } }
    );
  });

  // TIMELINE ITEMS
  gsap.utils.toArray(".timeline-item").forEach((item, i) => {
    gsap.fromTo(item,
      { opacity: 0, x: -32 },
      { opacity: 1, x: 0, duration: 0.65, ease: "power3.out",
        delay: i * 0.08,
        scrollTrigger: { trigger: item, start: "top 84%", once: true } }
    );
  });

  // STAT COUNTERS
  gsap.utils.toArray(".stat-number").forEach(el => {
    const target = parseInt(el.getAttribute("data-target"));
    ScrollTrigger.create({
      trigger: el, start: "top 85%", once: true,
      onEnter: () => {
        gsap.to({ v: 0 }, {
          v: target, duration: 1.8, ease: "power2.out",
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].v) + "+";
          }
        });
      }
    });
  });

  // SMOOTH SCROLL
  document.querySelectorAll("a[href^='#']").forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (id === "#") return;
      e.preventDefault();
      const target = document.querySelector(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // HAMBURGER MENU
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
      if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      }
    });
  }
