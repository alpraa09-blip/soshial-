// بيانات التطبيق
let currentUser = null;
let selectedCoinPackage = null;

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    console.log('Soshial M - بدء التهيئة');
    initializeApp();
});

function initializeApp() {
    // إعداد التنقل
    setupNavigation();
    
    // إعداد التفاعلات
    setupInteractions();
    
    console.log('Soshial M - جاهز للاستخدام');
}

// إعداد التنقل
function setupNavigation() {
    const navItems = document.querySelectorAll('.bottom-nav-item');

    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            showPage(page);
        });
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
            
            if (commentText) {
                const post = e.target.closest('.post');
                const caption = post.querySelector('.post-caption');
                
                const newComment = document.createElement('div');
                newComment.className = 'post-caption';
                newComment.innerHTML = `<span class="username">زائر</span> ${commentText}`;
                
                caption.parentNode.insertBefore(newComment, caption.nextSibling);
                commentInput.value = '';
            }
        }
    });

    // تسجيل الدخول
    const loginBtn = document.getElementById('loginBtn');
    const loginForm = document.getElementById('loginForm');
    const submitLogin = document.getElementById('submitLogin');
    const profileActions = document.getElementById('profileActions');

    loginBtn.addEventListener('click', function() {
        loginForm.style.display = 'block';
        this.style.display = 'none';
    });

    submitLogin.addEventListener('click', function() {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username && password) {
            currentUser = {
                username: username,
                coins: 100
            };
            
            loginForm.style.display = 'none';
            profileActions.style.display = 'block';
            document.querySelector('.profile-username h2').textContent = username;
            document.querySelector('.login-btn').style.display = 'none';
            
            alert('تم تسجيل الدخول بنجاح!');
        }
    });

    // شحن العملات
    const coinsBtn = document.getElementById('coinsBtn');
    const coinsPage = document.getElementById('coinsPage');

    coinsBtn.addEventListener('click', function() {
        coinsPage.style.display = 'block';
        profileActions.style.display = 'none';
        initCoinsPage();
    });

    // زر العودة من صفحة العملات
    coinsPage.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
            profileActions.style.display = 'block';
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
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // إزالة النشط من جميع عناصر التنقل
    document.querySelectorAll('.bottom-nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // عرض الصفحة المطلوبة
    const targetPage = document.getElementById(page + 'Page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // تحديث العنصر النشط في التنقل
        const activeNav = document.querySelector(`[data-page="${page}"]`);
        if (activeNav) activeNav.classList.add('active');
        
        // إخفاء صفحات إضافية إذا كانت ظاهرة
        if (page !== 'profile') {
            document.getElementById('loginForm').style.display = 'none';
            document.getElementById('coinsPage').style.display = 'none';
            document.getElementById('profileActions').style.display = 'none';
            document.getElementById('loginBtn').style.display = 'block';
        }
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
المستخدم: ${currentUser ? currentUser.username : 'زائر'}
التاريخ: ${new Date().toLocaleString()}

يرجى تأكيد الطلب وإضافة العملات للحساب.`;

    const whatsappUrl = `https://wa.me/201055891020?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    alert('سيتم تحويلك إلى واتساب لإكمال عملية الدفع. سيتم إضافة العملات إلى حسابك بعد التأكيد.');
}
