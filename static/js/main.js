document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        });
    }
    
    // 返回顶部
    const backTop = document.getElementById('backToTop');
    if (backTop) {
        window.addEventListener('scroll', () => {
            backTop.classList.toggle('show', window.scrollY > 400);
        });
        backTop.addEventListener('click', () => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
    
    // 移动端菜单
    const toggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = toggle.querySelector('i');
            if (icon) {
                if (navLinks.classList.contains('show')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
    
    // 移动端下拉菜单点击展开
    document.querySelectorAll('.nav-dropdown > a').forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 1024) {
                e.preventDefault();
                const parent = this.parentElement;
                const isOpen = parent.classList.contains('show');
                // 关闭所有其他下拉
                document.querySelectorAll('.nav-dropdown').forEach(d => {
                    if (d !== parent) d.classList.remove('show');
                });
                parent.classList.toggle('show');
            }
        });
    });
    
    // 点击外部关闭移动端菜单
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024 && navLinks && navLinks.classList.contains('show')) {
            if (!navbar.contains(e.target)) {
                navLinks.classList.remove('show');
                const icon = toggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    });
    
    // 数字滚动动画
    const animateNumbers = () => {
        document.querySelectorAll('[data-count]').forEach(el => {
            const target = parseInt(el.getAttribute('data-count'));
            const duration = 2000;
            const start = performance.now();
            const update = (now) => {
                const progress = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(ease * target).toLocaleString();
                if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
        });
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateNumbers();
                observer.disconnect();
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observer.observe(statsSection);
    
    // 表单提交
    const forms = document.querySelectorAll('form[action*="formsubmit"]');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
            btn.disabled = true;
            try {
                const response = await fetch(form.action, {method: 'POST', body: new FormData(form)});
                if (response.ok) {
                    alert('✅ 留言发送成功！万盛展览顾问将在24小时内联系您。');
                    form.reset();
                } else {
                    alert('❌ 发送失败，请直接拨打 13420079909');
                }
            } catch(err) {
                alert('❌ 网络错误，请直接拨打 13420079909');
            } finally {
                btn.innerHTML = original;
                btn.disabled = false;
            }
        });
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({behavior: 'smooth', block: 'start'});
            }
        });
    });
    
    // FAQ 手风琴
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            const answer = q.nextElementSibling;
            const icon = q.querySelector('.faq-icon');
            const isOpen = answer.classList.contains('show');
            document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('show'));
            document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');
            if (!isOpen) {
                answer.classList.add('show');
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });
});