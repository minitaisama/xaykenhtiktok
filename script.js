// Scroll animations with Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, parseInt(delay));
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 10) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileNav = document.getElementById('mobileNav');

    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.toggle('open');
    });

    // Close mobile nav on link click
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('open');
        });
    });

    // Counter animation for stats
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(el => counterObserver.observe(el));

    function animateCounter(element, target) {
        let current = 0;
        const duration = 1500;
        const start = performance.now();

        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(eased * target);
            element.textContent = current + '+';

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                const headerHeight = header.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Phone mockup parallax on mouse move
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        document.addEventListener('mousemove', (e) => {
            const phones = heroVisual.querySelectorAll('.phone-mockup');
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            const moveX = (e.clientX - centerX) / centerX;
            const moveY = (e.clientY - centerY) / centerY;

            phones.forEach((phone, index) => {
                const depth = (index + 1) * 3;
                const x = moveX * depth;
                const y = moveY * depth;
                phone.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }

    // Pain item hover effect with dynamic solution card
    const painItems = document.querySelectorAll('.pain-item');
    const solutionTitle = document.querySelector('.solution-title');
    const solutionText1 = document.querySelector('.solution-text-1');
    const solutionText2 = document.querySelector('.solution-text-2');
    const solutionText3 = document.querySelector('.solution-text-3');
    const solutionCard = document.querySelector('.solution-card');

    const solutionData = [
        {
            title: 'Chúng tôi biến lợi thế sản phẩm thành nội dung mà khách hàng thật sự muốn xem',
            items: [
                'Nghiên cứu sản phẩm và insight người mua trước khi viết kịch bản',
                'Kịch bản storytelling, kể chuyện cảm xúc, không liệt kê tính năng',
                'Mỗi video là 1 luận điểm bán hàng được xây dựng có chủ đích'
            ]
        },
        {
            title: 'Chúng tôi mang chuẩn production phim vào từng video TikTok của bạn.',
            items: [
                'Ekip 3 người chuyên biệt: đạo diễn, quay phim, dựng phim',
                'Thiết bị Sony A73/A74/FX3, hình ảnh sắc nét, màu sắc chuẩn brand guideline',
                'Nói không với thiếu sáng, rung tay, tạp âm...'
            ]
        },
        {
            title: 'Casting đã bao gồm trong gói, bạn không cần lo tìm diễn viên',
            items: [
                'Ngân hàng diễn viên đa dạng theo ngành hàng và đối tượng khách hàng',
                'Định hướng phong cách diễn xuất phù hợp với DNA thương hiệu',
                'Diễn viên được brief kỹ về sản phẩm, truyền tải tự nhiên'
            ]
        },
        {
            title: 'Hệ thống đo lường giúp bạn biết video nào hiệu quả, video nào cần cải thiện',
            items: [
                'Báo cáo hiệu suất từng video: view, like, share, comment, tỷ lệ xem hết',
                'So sánh performance giữa các dạng nội dung',
                'Đề xuất cải thiện dựa trên dữ liệu thực tế'
            ]
        },
        {
            title: 'Quy trình tối ưu: nhanh mà vẫn chất, không cần đánh đổi',
            items: [
                'Quy trình sản xuất chuẩn hóa từ brief đến duyệt',
                'Quay hàng loạt theo batch, tối ưu thời gian và chi phí',
                'Đảm bảo output đều đặn, không gián đoạn kênh'
            ]
        }
    ];

    painItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            painItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const index = parseInt(item.dataset.solution);
            const data = solutionData[index];
            if (data && solutionTitle) {
                solutionCard.style.opacity = '0';
                solutionCard.style.transform = 'translateY(8px)';
                setTimeout(() => {
                    solutionTitle.textContent = data.title;
                    solutionText1.textContent = data.items[0];
                    solutionText2.textContent = data.items[1];
                    solutionText3.textContent = data.items[2];
                    solutionCard.style.opacity = '1';
                    solutionCard.style.transform = 'translateY(0)';
                }, 150);
            }
        });
    });
});
