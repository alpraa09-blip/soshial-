// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAtJKG2p4mfbxYLqVZHcu7t_YOSx15ts14",
    authDomain: "soshial-9932a.firebaseapp.com",
    projectId: "soshial-9932a",
    storageBucket: "soshial-9932a.firebasestorage.app",
    messagingSenderId: "678676776751",
    appId: "1:678676776751:web:165b761716f6df2b3f03da",
    measurementId: "G-4LL3LE15P9"
};

// DOM Elements
const authPage = document.getElementById('authPage');
const appContainer = document.getElementById('appContainer');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const registerContainer = document.getElementById('registerContainer');
const logoutBtn = document.getElementById('logoutBtn');

// بيانات التطبيق
let currentUser = null;
let selectedCoinPackage = null;

// تهيئة التطبيق
function initApp() {
    // Show Register Form
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        registerContainer.style.display = 'block';
    });
    
    // Show Login Form
    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerContainer.style.display = 'none';
    });
    
    // Login Form Submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // محاكاة تسجيل الدخول
        if (username && password) {
            currentUser = {
                username: username,
                email: `${username}@example.com`,
                coins: 100
            };
            authPage.style.display = 'none';
            appContainer.style.display = 'flex';
            showPage('home');
            updateUserInfo();
        }
    });
    
    // Register Form Submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // محاكاة إنشاء حساب
        if (username && email && password) {
            currentUser = {
                username: username,
                email: email,
                coins: 50 // عملات مجانية عند التسجيل
            };
            authPage.style.display = 'none';
            appContainer.style.display = 'flex';
            showPage('home');
            updateUserInfo();
        }
    });
    
    // Logout
    logoutBtn.addEventListener('click', function() {
        currentUser = null;
        appContainer.style.display = 'none';
        authPage.style.display = 'flex';
        // إعادة تعيين النماذج
        loginForm.reset();
        registerForm.reset();
        registerContainer.style.display = 'none';
    });

    // تهيئة التنقل
    initNavigation();
    
    // تهيئة التفاعلات
    initInteractions();
}

// تهيئة التنقل
function initNavigation() {
    // Add event listeners to nav items
    const navItems = document.querySelectorAll('.nav-item');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });
    
    // Add event listeners to bottom nav items
    bottomNavItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });

    // Settings icon in profile
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-cog')) {
            showPage('settings');
        }
    });
}

// تهيئة التفاعلات
function initInteractions() {
    // تفعيل الإعجابات على المنشورات
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-heart')) {
            e.target.classList.toggle('far');
            e.target.classList.toggle('fas');
            e.target.style.color = e.target.classList.contains('fas') ? 'red' : '';
            
            // تحديث عدد الإعجابات
            const likesElement = e.target.closest('.post').querySelector('.post-likes');
            if (e.target.classList.contains('fas')) {
                const currentLikes = parseInt(likesElement.textContent.replace(/\D/g, ''));
                likesElement.textContent = (currentLikes + 1).toLocaleString() + ' إعجاب';
            } else {
                const currentLikes = parseInt(likesElement.textContent.replace(/\D/g, ''));
                likesElement.textContent = (currentLikes - 1).toLocaleString() + ' إعجاب';
            }
        }
    });

    // إضافة تعليقات
    document.addEventListener('click', function(e) {
        if (e.target.textContent === 'نشر' && e.target.parentElement.classList.contains('add-comment')) {
            const commentInput = e.target.parentElement.querySelector('input');
            const commentText = commentInput.value.trim();
            
            if (commentText) {
                const post = e.target.closest('.post');
                const commentsSection = post.querySelector('.post-caption');
                
                // إنشاء تعليق جديد
                const newComment = document.createElement('div');
                newComment.className = 'post-caption';
                newComment.innerHTML = `<span class="username">${currentUser.username}</span> ${commentText}`;
                
                // إضافة التعليق بعد التسمية التوضيحية الأصلية
                commentsSection.parentNode.insertBefore(newComment, commentsSection.nextSibling);
                
                // مسح حقل الإدخال
                commentInput.value = '';
            }
        }
    });
}

// Navigation
function showPage(page) {
    // Hide all pages
    const pages = ['home', 'live', 'profile', 'settings', 'coins'];
    pages.forEach(pageName => {
        const pageElement = document.getElementById(pageName + 'Page');
        if (pageElement) {
            pageElement.style.display = 'none';
        }
    });
    
    // Remove active class from all nav items
    const navItems = document.querySelectorAll('.nav-item');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    bottomNavItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected page
    let targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.style.display = 'block';
        
        // تحديث العناصر النشطة في القائمة
        const navItem = document.querySelector(`[data-page="${page}"]`);
        const bottomNavItem = document.querySelector(`.bottom-nav-item[data-page="${page}"]`);
        
        if (navItem) navItem.classList.add('active');
        if (bottomNavItem) bottomNavItem.classList.add('active');
        
        // تهيئة الصفحة الخاصة إذا لزم الأمر
        if (page === 'coins') {
            initCoinsPage();
        }
    }
}

// تحديث معلومات المستخدم
function updateUserInfo() {
    if (currentUser) {
        // تحديث اسم المستخدم في الملف الشخصي
        const profileUsername = document.querySelector('.profile-username h2');
        if (profileUsername) {
            profileUsername.textContent = currentUser.username;
        }
        
        // تحديث العملات
        const coinsElements = document.querySelectorAll('.user-coins');
        coinsElements.forEach(element => {
            element.textContent = currentUser.coins;
        });
    }
}

// تهيئة صفحة العملات
function initCoinsPage() {
    const coinPackages = document.querySelectorAll('.coin-package');
    const payButton = document.querySelector('.pay-button');
    
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
                amount: this.querySelector('.coin-amount').textContent,
                price: this.querySelector('.coin-price').textContent
            };
        });
    });
    
    if (payButton) {
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
            
            // محاكاة عملية الدفع
            processPayment(name, phone, selectedCoinPackage);
        };
    }
}

// معالجة الدفع
function processPayment(name, phone, package) {
    const message = `طلب شراء عملات:
الاسم: ${name}
رقم الهاتف: ${phone}
الباقة: ${package.amount} عملة
السعر: ${package.price}`;
    
    // محاكاة إرسال الرسالة إلى واتساب
    const whatsappUrl = `https://wa.me/201055891020?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    alert('سيتم تحويلك إلى واتساب لإكمال عملية الدفع');
}

// بدء التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});
