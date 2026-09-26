document.addEventListener('DOMContentLoaded', () => {

    /* ---------- Footer year ---------- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------- Navbar scroll state ---------- */
    const nav = document.getElementById('mainNav');
    const onScroll = () => {
        if (window.scrollY > 40) nav.classList.add('scrolled');
        else nav.classList.remove('scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    /* ---------- Close mobile menu on link click ---------- */
    const navCollapseEl = document.getElementById('navContent');
    const bsCollapse = navCollapseEl && window.bootstrap ? new bootstrap.Collapse(navCollapseEl, { toggle: false }) : null;
    document.querySelectorAll('#navContent .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navCollapseEl.classList.contains('show') && bsCollapse) bsCollapse.hide();
        });
    });

    /* ---------- Scroll reveal ---------- */
    const revealItems = document.querySelectorAll('[data-reveal]');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-reveal-delay') || 0;
                setTimeout(() => entry.target.classList.add('in-view'), Number(delay));
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealItems.forEach(item => revealObserver.observe(item));

    /* ---------- KPI counters (signature stat strip) ---------- */
    const kpiNumbers = document.querySelectorAll('.kpi-num');
    const animateCount = (el) => {
        const target = Number(el.getAttribute('data-count'));
        const duration = 1400;
        const start = performance.now();
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target);
            if (progress < 1) requestAnimationFrame(step);
            else el.textContent = target;
        };
        requestAnimationFrame(step);
    };
    const kpiObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCount(entry.target);
                kpiObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    kpiNumbers.forEach(num => kpiObserver.observe(num));

    /* ---------- Project category filter ---------- */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.project-category');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            categories.forEach(cat => {
                const match = filter === 'all' || cat.getAttribute('data-category') === filter;
                cat.classList.toggle('is-hidden', !match);
            });
        });
    });

    /* ---------- Back to top ---------- */
    const backToTop = document.getElementById('backToTop');
    const toggleBackToTop = () => {
        if (window.scrollY > 500) backToTop.classList.add('show');
        else backToTop.classList.remove('show');
    };
    toggleBackToTop();
    window.addEventListener('scroll', toggleBackToTop, { passive: true });
    backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

});
