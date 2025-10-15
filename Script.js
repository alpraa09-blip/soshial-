// بيانات التطبيق
let currentUser = null;
let selectedCoinPackage = null;

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    console.log('Soshial M - بدء التهيئة');
    initializeApp();
});

function initializeApp() {
    // إعداد مستمعي الأحداث للنماذج
    setupAuthForms();
    
    // إعداد التنقل
    setupNavigation();
    
    // إعداد التفاعلات
    setupInteractions();
    
    console.log('Soshial M - جاهز للاستخدام');
}

// إعداد نماذج المصادقة
function setupAuthForms() {
    const authPage = document.getElementById('authPage');
    const appContainer = document.getElementById('appContainer');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegister = document.getElementById('showRegister');
    const showLogin = document.getElementById('showLogin');
    const registerContainer = document.getElementById('registerContainer');
    const googleLogin = document.getElementById('googleLogin');
    const logoutBtn = document.getElementById('logoutBtn');

    // عرض نموذج التسجيل
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        registerContainer.style.display = 'block';
    });

    // عرض نموذج تسجيل الدخول
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerContainer.style.display = 'none';
    });

    // تسجيل الدخول
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        if (username && password) {
            currentUser = {
                username: username,
                email: `${username}@example.com`,
                coins: 100
            };
            
            authPage.style.display = 'none';
            appContainer.style.display = 'flex';
            updateUserInfo();
            showPage('home');
        }
    });

    // إنشاء حساب
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        if (username && email && password) {
            currentUser = {
                username: username,
                email: email,
                coins: 50
            };
            
            authPage.style.display = 'none';
            appContainer.style.display = 'flex';
            updateUserInfo();
            showPage('home');
        }
    });

    // تسجيل الدخول بـ Google
    googleLogin.addEventListener('click', function() {
        currentUser = {
            username: 'user_google',
            email: 'user@gmail.com',
            coins: 75
        };
        
        authPage.style.display = 'none';
        appContainer.style.display = 'flex';
        updateUserInfo();
        showPage('home');
    });

    // تسجيل الخروج
    logoutBtn.addEventListener('click', function() {
        currentUser = null;
        appContainer.style.display = 'none';
        authPage.style.display = 'flex';
        loginForm.reset();
        registerForm.reset();
        registerContainer.style.display = 'none';
    });
}

// إعداد التنقل
function setupNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });

    bottomNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });

    // أيقونة الإعدادات في الملف الشخصي
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-cog')) {
            showPage('settings');
        }
    });
}

// إعداد التفاعلات
function setupInteractions() {
    // تفعيل الإعجابات
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-heart')) {
            const heartIcon = e.target;
            const isLiked = heartIcon.classList.contains('fas');
            
            if (isLiked) {
                heartIcon.classList.remove('fas');
                heartIcon.classList.add('far');
                heartIcon.style.color = '';
            } else {
                heartIcon.classList.remove('far');
                heartIcon.classList.add('fas');
                heartIcon.style.color = 'red';
            }
            
            // تحديث عدد الإعجابات
            updateLikesCount(heartIcon, !isLiked);
        }
    });

    // إضافة تعليقات
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'نشر' && e.target.parentElement.classList.contains('add-comment')) {
            const commentInput = e.target.parentElement.querySelector('input');
            const commentText = commentInput.value.trim();
            
            if (commentText && currentUser) {
                const post = e.target.closest('.post');
                const caption = post.querySelector('.post-caption');
                
                const newComment = document.createElement('div');
                newComment.className = 'post-caption';
                newComment.innerHTML = `<span class="username">${currentUser.username}</span> ${commentText}`;
                
                caption.parentNode.insertBefore(newComment, caption.nextSibling);
                commentInput.value = '';
            }
        }
    });
}

// تحديث عدد الإعجابات
function updateLikesCount(heartIcon, isAdding) {
    const likesElement = heartIcon.closest('.post').querySelector('.post-likes');
    const currentText = likesElement.textContent;
    const currentLikes = parseInt(currentText.replace(/\D/g, '')) || 0;
    
    if (isAdding) {
        likesElement.textContent = (currentLikes + 1).toLocaleString() + ' إعجاب';
    } else {
        likesElement.textContent = (currentLikes - 1).toLocaleString() + ' إعجاب';
    }
}

// عرض الصفحة
function showPage(page) {
    // إخفاء جميع الصفحات
    const pages = ['home', 'live', 'profile', 'settings', 'coins'];
    pages.forEach(pageName => {
        const pageElement = document.getElementById(pageName + 'Page');
        if (pageElement) {
            pageElement.style.display = 'none';
        }
    });

    // إزالة النشط من جميع العناصر
    document.querySelectorAll('.nav-item, .bottom-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // عرض الصفحة المطلوبة
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.style.display = 'block';
        
        // تحديث العناصر النشطة
        const activeNav = document.querySelector(`[data-page="${page}"]`);
        const activeBottomNav = document.querySelector(`.bottom-nav-item[data-page="${page}"]`);
        
        if (activeNav) activeNav.classList.add('active');
        if (activeBottomNav) activeBottomNav.classList.add('active');
        
        // تهيئة الصفحة الخاصة إذا لزم الأمر
        if (page === 'coins') {
            initCoinsPage();
        }
    }
}

// تحديث معلومات المستخدم
function updateUserInfo() {
    if (currentUser) {
        const profileUsername = document.getElementById('profileUsername');
        const userCoins = document.getElementById('userCoins');
        const currentCoins = document.getElementById('currentCoins');
        
        if (profileUsername) profileUsername.textContent = currentUser.username;
        if (userCoins) userCoins.textContent = currentUser.coins;
        if (currentCoins) currentCoins.textContent = currentUser.coins;
    }
}

// تهيئة صفحة العملات
function initCoinsPage() {
    const coinPackages = document.querySelectorAll('.coin-package');
    const payButton = document.getElementById('payButton');
    
    // إعادة تعيين التحديد
    coinPackages.forEach(p => p.classList.remove('selected'));
    selectedCoinPackage = null;
    
    coinPackages.forEach(package => {
        package.addEventListener('click', function() {
            // إزالة التحديد من جميع الباقات
            coinPackages.forEach(p => p.classList.remove('selected'));
            // تحديد الباقة المختارة
            this.classList.add('selected');
            selectedCoinPackage = {
                amount: this.getAttribute('data-amount'),
                price: this.getAttribute('data-price')
            };
        });
    });
    
    payButton.onclick = function() {
        if (!selectedCoinPackage) {
            alert('يرجى اختيار باقة العملات أولاً');
            return;
        }
        
        const name = document.getElementById('paymentName').value;
        const phone = document.getElementById('paymentPhone').value;
        
        if (!name || !phone) {
            alert('يرجى ملء جميع الحقول');
            return;
        }
        
        processPayment(name, phone, selectedCoinPackage);
    };
}

// معالجة الدفع
function processPayment(name, phone, package) {
    const message = `طلب شراء عملات Soshial M:
الاسم: ${name}
رقم الهاتف: ${phone}
الباقة: ${package.amount} عملة
السعر: ${package.price} دولار
التاريخ: ${new Date().toLocaleString()}`;
    
    const whatsappUrl = `https://wa.me/201055891020?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    alert('سيتم تحويلك إلى واتساب لإكمال عملية الدفع. سيتم إضافة العملات إلى حسابك بعد التأكيد.');
}
