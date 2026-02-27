const nextButtons = document.querySelectorAll('.quiz__button--next');
const backButtons = document.querySelectorAll('.quiz__button--back');
const cards = document.querySelectorAll('.quiz__card');
const steps = document.querySelectorAll('.quiz__step');

const checkboxes = document.querySelectorAll('.option--checkbox input');
const radios = document.querySelectorAll('.option--radio input');

const step1Answer = document.querySelector('[data-step="1"] .quiz__step-answer');
const step2Answer = document.querySelector('[data-step="2"] .quiz__step-answer');

let currentStep = 1;

function updateQuiz() {
    cards.forEach(card => {
        card.classList.remove('quiz__card--active');
        if (Number(card.dataset.step) === currentStep) {
            card.classList.add('quiz__card--active');
        }
    });

    steps.forEach(step => {
        const stepNumber = Number(step.dataset.step);

        step.classList.remove('quiz__step--active', 'quiz__step--visible');

        if (stepNumber <= currentStep) {
            step.classList.add('quiz__step--visible');
        }

        if (stepNumber === currentStep) {
            step.classList.add('quiz__step--active');
        }
    });
}

nextButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep < cards.length) {
            currentStep++;
            updateQuiz();
        }
    });
});

backButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            updateQuiz();
        }
    });
});

checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
        const selected = Array.from(checkboxes)
            .filter(i => i.checked)
            .map(i => {
                const content = i.nextElementSibling;
                const icon = content.querySelector('.option__icon');

                const clone = content.cloneNode(true);
                const cloneIcon = clone.querySelector('.option__icon');
                if (cloneIcon) cloneIcon.remove();

                return clone.textContent.trim();
            });

        step1Answer.textContent = selected.length
            ? selected.join(', ')
            : '';
    });
});

radios.forEach(radio => {
    radio.addEventListener('change', () => {
        const selected = document.querySelector('.option--radio input:checked');
        if (selected) {
            const content = selected.nextElementSibling;

            const clone = content.cloneNode(true);
            const cloneIcon = clone.querySelector('.option__icon');
            if (cloneIcon) cloneIcon.remove();

            step2Answer.textContent = clone.textContent.trim();
        }
    });
});

updateQuiz();





document.addEventListener("DOMContentLoaded", function () {
    const cardsSlider = new Swiper(".cards__slider", {
        slidesPerView: 2.9,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,

        watchOverflow: false,

        slidesOffsetBefore: 176, 
        slidesOffsetAfter: 176,


        navigation: {
            nextEl: ".cards__arrow--next",
            prevEl: ".cards__arrow--prev",
        },
    });
});





const nonMainItem = document.getElementById("non-main-item");
const mainBtn = nonMainItem.querySelector(".main-btn");
const dropdown = nonMainItem.querySelector(".header__dropdown");
const dropdownButtons = dropdown.querySelectorAll(".header__dropdown-item");

mainBtn.addEventListener("click", (e) => {
    e.preventDefault();
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
    nonMainItem.classList.toggle("header__item--active-dropdown");
});

dropdownButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
        dropdownButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
    });
});


const menuItems = document.querySelectorAll(".header__item");

menuItems.forEach(item => {
    item.addEventListener("click", (e) => {
        e.preventDefault();
        menuItems.forEach(i => i.classList.remove("header__item--active"));
        item.classList.add("header__item--active");
    });
});





document.addEventListener("DOMContentLoaded", function () {

    const quizModal = document.getElementById("quizModal");
    const successModal = document.getElementById("successModal");

    const form = document.getElementById("quizForm");
    const comment = document.getElementById("commentField");
    const commentSection = document.querySelector(".comment-section");

    const openBtn = document.querySelector(".header__button");
    const backBtn = document.querySelector(".success-btn");

    const quizClose = quizModal.querySelector(".modal-close");
    const successClose = successModal.querySelector(".modal-close");

    const quizOverlay = quizModal.querySelector(".quiz-overlay");
    const successOverlay = successModal.querySelector(".quiz-overlay");


    if (openBtn) {
        openBtn.addEventListener("click", function () {
            quizModal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    }


    function closeQuiz() {
        form.reset();
        commentSection.classList.remove("error");
        quizModal.classList.remove("active");
        document.body.style.overflow = "";

        form.reset();
        commentSection.classList.remove("error");
    }


    function closeSuccess() {
        form.reset();
        commentSection.classList.remove("error");
        successModal.classList.remove("active");
        document.body.style.overflow = "";
    }


    if (quizClose) quizClose.addEventListener("click", closeQuiz);
    if (quizOverlay) quizOverlay.addEventListener("click", closeQuiz);

    if (successClose) successClose.addEventListener("click", closeSuccess);
    if (successOverlay) successOverlay.addEventListener("click", closeSuccess);


    if (comment) {
        comment.addEventListener("input", function () {
            if (comment.value.trim() !== "") {
                commentSection.classList.remove("error");
            }
        });
    }


    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            if (!comment.value.trim()) {
                commentSection.classList.add("error");
                return;
            }

            commentSection.classList.remove("error");

            quizModal.classList.remove("active");
            successModal.classList.add("active");
        });
    }


    if (backBtn) {
        backBtn.addEventListener("click", closeSuccess);
    }

});










document.addEventListener('DOMContentLoaded', function () {
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.mobile-menu');

    let scrollPosition = 0;

    burger.addEventListener('click', () => {

        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        if (mobileMenu.classList.contains('active')) {
            scrollPosition = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';
        } else {
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollPosition);
        }
    });
});