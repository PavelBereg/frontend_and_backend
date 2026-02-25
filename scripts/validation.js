document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Останавливаем стандартную отправку страницы
        
        // 1. Сбрасываем предыдущие ошибки
        document.querySelectorAll('.input.is-danger, .textarea.is-danger, .select.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
        
        let isValid = true;
        
        // 2. Проверка ФИО (минимум 2 слова)
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        
        if (fullnameValue === '') {
            showError(fullname, 'Пожалуйста, введите ваше имя');
            isValid = false;
        } else if (fullnameValue.split(' ').length < 2) {
            showError(fullname, 'Введите фамилию и имя (минимум 2 слова)');
            isValid = false;
        }
        
        // 3. Проверка телефона (не менее 10 цифр)
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, ''); // Оставляем только цифры
        
        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Номер должен содержать не менее 10 цифр');
            isValid = false;
        }
        
        // 4. Проверка email
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email (например, test@mail.ru)');
            isValid = false;
        }

        // 5. Проверка чекбокса (Согласие)
        const agreement = document.getElementById('agreement');
        if (!agreement.checked) {
            showError(agreement, 'Необходимо согласие на обработку данных');
            isValid = false;
        }
        
        // 6. Если всё корректно - отправляем пользовательское событие
        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                topic: document.getElementById('topic').value || 'Не выбрана',
                message: document.getElementById('message').value.trim() || '(сообщение пустое)'
            };
            
            // Генерируем событие для второго скрипта (consoleLogger)
            const customEvent = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(customEvent);
            
            alert('Форма успешно отправлена! Данные выведены в консоль.');
            form.reset(); // Очищаем форму после успешной отправки
        }
    });
    
    // Функция для показа ошибок
    function showError(input, message) {
        input.classList.add('is-danger');
        
        // Находим родительский .field для вставки текста ошибки
        const field = input.closest('.field');
        if (field) {
            const help = document.createElement('p');
            help.classList.add('help', 'is-danger');
            help.textContent = message;
            field.appendChild(help);
        }
    }
    
    // Очистка ошибки при начале ввода
    document.querySelectorAll('.input, .textarea, input[type="checkbox"]').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const field = this.closest('.field');
            if (field) {
                const errors = field.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            }
        });
    });
});