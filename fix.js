(() => {
    console.log("%c[Fix] Running combined anti-jump & manual scroll engine...", "color: cyan; font-weight: bold;");

    // 1. Kill all background loops and automated scrolling timers
    let id = window.setTimeout(() => {}, 0);
    while (id--) { window.clearTimeout(id); window.clearInterval(id); }

    // 2. Reset and unlock base page dimensions
    const body = document.body;
    const html = document.documentElement;
    [body, html].forEach(el => {
        if (el) {
            el.style.overflow = 'auto'; 
            el.style.height = 'unset';
            el.style.maxHeight = 'unset';
        }
    });

    // 3. Inject global CSS to kill infinite animation loops and shaky transitions
    const style = document.createElement('style');
    style.innerHTML = `
        * { 
            scroll-behavior: auto !important; 
            animation: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

    // 4. Intercept and isolate user-driven scrolling from site-driven scrolling
    const handleManualScroll = (e) => {
        // Stop the website's own glitchy code from hijacking the movement
        e.stopPropagation(); 
        
        // Calculate scroll direction based on wheel or touch input
        let delta = e.deltaY || (e.touches && e.touches[0] ? -e.touches[0].clientY : 0);
        
        // Execute instant movement bypass to avoid automated layout recalculation
        window.scrollBy({
            top: delta,
            left: 0,
            behavior: 'instant'
        });
    };

    // 5. Attach the isolated scroll listeners directly to your physical input devices
    window.addEventListener('wheel', handleManualScroll, { passive: true, capture: true });
    window.addEventListener('touchmove', handleManualScroll, { passive: true, capture: true });

    console.log("%c[Fix] Combined script active. Test scrolling now.", "color: green; font-weight: bold;");
})();
