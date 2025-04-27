document.addEventListener('DOMContentLoaded', function() {
    const slides = document.getElementById('slides');
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");
    let currentSlide = 0;
    const totalSlides = document.querySelectorAll('.slide').length;

    function showSlide(index) {
        document.querySelector('.slide.active')?.classList.remove('active');
        currentSlide = index;
        slides.style.transform = `translateX(-${currentSlide * 20}%)`;
        document.querySelectorAll('.slide')[currentSlide].classList.add('active');
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % totalSlides;
        window.showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        window.showSlide(prevIndex);
    }

    let intervalId = null;
    function startAutoSlide() {
        intervalId = setInterval(nextSlide, 5000); 
    }
    function stopAutoSlide() {
        if (intervalId) {
            clearInterval(intervalId); 
        }
    }

    window.showSlide = showSlide;
    window.prevSlide = prevSlide;
    window.nextSlide = nextSlide;
    window.startAutoSlide = startAutoSlide;
    window.stopAutoSlide = stopAutoSlide; 

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    startAutoSlide();
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        navLinks.classList.toggle("show");
    });

    document.addEventListener('click', function(event) {
        if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
            navLinks.classList.remove('show');
        }
    });

    const registrationForm = document.getElementById("registrationform");

    registrationForm.addEventListener("submit", function(event) {
        let isValid = true;

        const visitDateInput = document.getElementById("date-of-visit");
        const visitDateError = document.getElementById("visitDateError");
        if (!visitDateInput.value.trim()) {
            visitDateError.textContent = "Select your visit date.";
            isValid = false;
        } else {
            visitDateError.textContent = "";
        }

        const visitorsInput = document.getElementById("no-of-visitors");
        const visitorsError = document.getElementById("visitorsError");
        if (!visitorsInput.value.trim()) {
            visitorsError.textContent = "Select the number of visitors.";
            isValid = false;
        } else {
            visitorsError.textContent = "";
        }

        const nameInput = document.getElementById("name");
        const nameError = document.getElementById("nameError");
        if (!nameInput.value.trim()) {
            nameError.textContent = "Name is required.";
            isValid = false;
        } else {
            nameError.textContent = "";
        }

        const emailInput = document.getElementById("email");
        const emailError = document.getElementById("emailError");
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.match(emailPattern)) {
            emailError.textContent = "Enter a valid email.";
            isValid = false;
        } else {
            emailError.textContent = "";
        }

        const dobInput = document.getElementById("dob");
        const dobError = document.getElementById("dobError");
        if (!dobInput.value) {
            dobError.textContent = "Select your birth date.";
            isValid = false;
        } else {
            dobError.textContent = "";
        }

        const genderInput = document.querySelector('input[name="gender"]:checked');
        const genderError = document.getElementById("genderError");
        if (!genderInput) {
            genderError.textContent = "Select your gender.";
            isValid = false;
        } else {
            genderError.textContent = "";
        }
        const ticketInput = document.getElementById("ticket");
        const ticketError = document.getElementById("ticketError");
        if (!ticketInput.value) {
            ticketError.textContent = "Choose a ticket type.";
            isValid = false;
        } else {
            ticketError.textContent = "";
        }

        if (!isValid) {
            event.preventDefault();
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const shopItems = document.querySelectorAll('.shop-item');
    const cartItems = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const checkoutBtn = document.getElementById('checkout-btn');
    const cart = [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemIndex = parseInt(this.getAttribute('data-id')) - 1;
            const shopItem = shopItems[itemIndex];
            const itemName = shopItem.querySelector('h3').textContent;
            const itemPrice = parseFloat(shopItem.querySelector('.price').textContent.replace('$', ''));
            const itemImage = shopItem.querySelector('img').src;

            cart.push({ name: itemName, price: itemPrice, image: itemImage });
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            total += item.price;
            const cartItemElement = document.createElement('li');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            cartItems.appendChild(cartItemElement);
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;

        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                cart.splice(index, 1);
                updateCart();
            });
        });
    }

    checkoutBtn.addEventListener('click', function() {
        if (cart.length > 0) {
            // 创建结算窗口
            const checkoutWindow = document.createElement('div');
            checkoutWindow.id = 'checkoutWindow';
            checkoutWindow.style.position = 'fixed';
            checkoutWindow.style.top = '0';
            checkoutWindow.style.left = '0';
            checkoutWindow.style.width = '100%';
            checkoutWindow.style.height = '100%';
            checkoutWindow.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
            checkoutWindow.style.zIndex = '1000';
            checkoutWindow.style.display = 'flex';
            checkoutWindow.style.justifyContent = 'center';
            checkoutWindow.style.alignItems = 'center';

            const checkoutContent = document.createElement('div');
            checkoutContent.style.backgroundColor = 'white';
            checkoutContent.style.padding = '30px';
            checkoutContent.style.borderRadius = '10px';
            checkoutContent.style.maxWidth = '600px';
            checkoutContent.style.width = '80%';

            const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
            checkoutContent.innerHTML = `
                <h3>Thank you for your purchase!</h3>
                <p>You have bought ${cart.length} goods for a total of $${totalAmount.toFixed(2)}.</p>
                <ul style="margin-top: 20px;">
                    ${cart.map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`).join('')}
                </ul>
                <div style="margin-top: 20px; display: flex; justify-content: space-between;">
                    <button id="closeCheckout" style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Close</button>
                </div>
            `;

            checkoutWindow.appendChild(checkoutContent);
            document.body.appendChild(checkoutWindow);

            // 添加关闭按钮事件
            const closeCheckout = checkoutContent.querySelector('#closeCheckout');
            closeCheckout.addEventListener('click', function() {
                document.body.removeChild(checkoutWindow);
                cart.length = 0;
                updateCart();
            });
        } else {
            alert('Your cart is empty!');
        }
    });

    updateCart();
});