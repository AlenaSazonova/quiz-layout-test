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