
        // Dark Mode Functionality
        const darkModeToggle = document.getElementById('darkModeToggle');
        const mobileDarkModeToggle = document.getElementById('mobileDarkModeToggle');
        const body = document.body;

        // Auto-update copyright year
        document.getElementById("copyright-year").textContent = new Date().getFullYear();
        
        // Check for saved theme preference or default to light mode
        const currentTheme = localStorage.getItem('theme') || 'light';
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            updateDarkModeIcons(true);
        } else {
            body.classList.remove('dark-mode');
            updateDarkModeIcons(false);
        }
        
        function toggleDarkMode() {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
                updateDarkModeIcons(false);
            } else {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
                updateDarkModeIcons(true);
            }
        }
        
        function updateDarkModeIcons(isDarkMode) {
            const moonIcons = document.querySelectorAll('.dark-mode-toggle i, .mobile-dark-mode-toggle i');
            moonIcons.forEach(icon => {
                if (isDarkMode) {
                    icon.className = 'fas fa-sun';
                    icon.parentElement.title = 'Switch to Light Mode';
                } else {
                    icon.className = 'fas fa-moon';
                    icon.parentElement.title = 'Switch to Dark Mode';
                }
            });
        }
        
        // Event listeners for dark mode toggles
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', toggleDarkMode);
        }
        
        if (mobileDarkModeToggle) {
            mobileDarkModeToggle.addEventListener('click', toggleDarkMode);
        }
        
        // Mobile Connect Dropdown Toggle
        const mobileConnectDropdown = document.getElementById('mobileConnectDropdown');
        if (mobileConnectDropdown) {
            const connectBtn = mobileConnectDropdown.querySelector('.mobile-connect-btn');
            
            connectBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                mobileConnectDropdown.classList.toggle('show');
                // Toggle active class for color
                connectBtn.classList.toggle('active');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileConnectDropdown.contains(e.target)) {
                    mobileConnectDropdown.classList.remove('show');
                    connectBtn.classList.remove('active');
                }
            });
        }
        
        // Desktop header scroll effect
        const desktopHeader = document.getElementById('desktopHeader');
        if (desktopHeader) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    desktopHeader.classList.add('scrolled');
                } else {
                    desktopHeader.classList.remove('scrolled');
                }
            });
        }
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Function to update active navigation icon (desktop)
        function updateActiveNavIcon() {
            const sections = document.querySelectorAll('.section');
            const navIcons = document.querySelectorAll('.desktop-nav-menu a');
            
            let currentSectionId = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSectionId = section.id;
                }
            });
            
            // Remove active class from all icons
            navIcons.forEach(icon => {
                icon.classList.remove('active');
            });
            
            // Add active class to corresponding icon
            if (currentSectionId) {
                const activeIcon = document.querySelector(`.desktop-nav-menu a[href="#${currentSectionId}"]`);
                if (activeIcon) {
                    activeIcon.classList.add('active');
                }
            }
        }
        
        // Function to update active mobile nav button
        function updateActiveNavButton() {
            const sections = document.querySelectorAll('.section');
            const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
            
            let currentSectionId = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.clientHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSectionId = section.id;
                }
            });
            
            // Remove active class from all buttons
            mobileNavButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Add active class to corresponding button
            if (currentSectionId) {
                const activeButton = document.querySelector(`.mobile-nav-btn[href="#${currentSectionId}"]`);
                if (activeButton) {
                    activeButton.classList.add('active');
                }
            }
        }
        
        // Listen for scroll to update active nav icons
        window.addEventListener('scroll', function() {
            updateActiveNavIcon();
            updateActiveNavButton();
        });
        
        // Animate elements on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe all animated elements
        document.querySelectorAll('.timeline-item, .skill-box, .experience-card, .achievement-card').forEach(item => {
            observer.observe(item);
        });
        
        // Mobile/Desktop visibility control
        function checkScreenSize() {
            const mobileNavButtons = document.getElementById('mobileNavButtons');
            const desktopHeader = document.getElementById('desktopHeader');
            
            if (window.innerWidth <= 768) {
                // Mobile mode - show mobile nav, hide desktop header
                if (mobileNavButtons) mobileNavButtons.style.display = 'flex';
                if (desktopHeader) desktopHeader.style.display = 'none';
            } else {
                // Desktop mode - hide mobile nav, show desktop header
                if (mobileNavButtons) mobileNavButtons.style.display = 'none';
                if (desktopHeader) desktopHeader.style.display = 'block';
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize(); // Initial check
        
        // Initialize active nav icons on page load
        window.addEventListener('load', function() {
            updateActiveNavIcon();
            updateActiveNavButton();
        });
