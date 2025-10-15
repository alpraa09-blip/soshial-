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

// Initialize Firebase (commented for demo)
// const app = firebase.initializeApp(firebaseConfig);
// const analytics = firebase.analytics();

// DOM Elements
const authPage = document.getElementById('authPage');
const appContainer = document.getElementById('appContainer');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const registerContainer = document.getElementById('registerContainer');
const logoutBtn = document.getElementById('logoutBtn');
const navItems = document.querySelectorAll('.nav-item');
const bottomNavItems = document.querySelectorAll('.bottom-nav-item');

// Pages
const homePage = document.getElementById('homePage');
const livePage = document.getElementById('livePage');
const profilePage = document.getElementById('profilePage');
const settingsPage = document.getElementById('settingsPage');
const coinsPage = document.getElementById('coinsPage');

// بيانات التطبيق
let currentUser = null;
let selectedCoinPackage = null;

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

// Navigation
function showPage(page) {
    // Hide all pages
    homePage.style.display = 'none';
    livePage.style.display = 'none';
    profilePage.style.display = 'none';
    settingsPage.style.display = 'none';
    coinsPage.style.display = 'none';
    
    // Remove active class from all nav items
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    bottomNavItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected page
    if (page === 'home') {
        homePage.style.display = 'block';
        document.querySelector('[data-page="home"]').classList.add('active');
        document.querySelector('.bottom-nav-item[data-page="home"]').classList.add('active');
    } else if (page === 'live') {
        livePage.style.display = 'block';
        document.querySelector('[data-page="live"]').classList.add('active');
        document.querySelector('.bottom-nav-item[data-page="live"]').classList.add('active');
    } else if (page === 'profile') {
        profilePage.style.display = 'block';
        document.querySelector('[data-page="profile"]').classList.add('active');
        document.querySelector('.bottom-nav-item[data-page="profile"]').classList.add('active');
    } else if (page === 'settings') {
        settingsPage.style.display = 'block';
        document.querySelector('[data-page="settings"]').classList.add('active');
    } else if (page === 'coins') {
        coinsPage.style.display = 'block';
        document.querySelector('[data-page="coins"]').classList.add('active');
        initCoinsPage();
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
    
    payButton.addEventListener('click', function() {
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
    });
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

// Add event listeners to nav items
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

// تفعيل الإعجابات على المنشورات
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('fa-heart')) {
        e.target.classList.toggle('far');
        e.target.classList.toggle('fas');
        e.target.style.color = e.target.classList.contains('fas') ? 'red' : '';
    }
});

// إنشاء صفحة العملات الديناميكية
function createCoinsPage() {
    if (!document.getElementById('coinsPage')) {
        const coinsPageHTML = `
            <div class="coins-page" id="coinsPage">
                <h1 style="margin-bottom: 20px;">شحن العملات</h1>
                <div class="user-coins-display" style="text-align: center; margin-bottom: 20px;">
                    <h3>رصيدك الحالي: <span class="user-coins">${currentUser ? currentUser.coins : 0}</span> عملة</h3>
                </div>
                <div class="coin-packages">
                    <div class="coin-package">
                        <div class="coin-amount">500</div>
                        <div class="coin-price">1 دولار</div>
                    </div>
                    <div class="coin-package">
                        <div class="coin-amount">1,000</div>
                        <div class="coin-price">5 دولار</div>
                    </div>
                    <div class="coin-package">
                        <div class="coin-amount">2,500</div>
                        <div class="coin-price">10 دولار</div>
                    </div>
                    <div class="coin-package">
                        <div class="coin-amount">5,000</div>
                        <div class="coin-price">50 دولار</div>
                    </div>
                </div>
                <div class="payment-form">
                    <h3 style="margin-bottom: 15px;">معلومات الدفع</h3>
                    <input type="text" id="paymentName" placeholder="الاسم بالكامل" required>
                    <input type="tel" id="paymentPhone" placeholder="رقم الهاتف" required>
                    <button class="pay-button">الانتقال للدفع عبر واتساب</button>
                </div>
            </div>
        `;
        document.querySelector('.main-content').insertAdjacentHTML('beforeend', coinsPageHTML);
    }
}

// استدعاء إنشاء صفحة العملات عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    createCoinsPage();
});
