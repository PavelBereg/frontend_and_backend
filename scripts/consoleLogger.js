document.addEventListener('DOMContentLoaded', function() {
    // Слушаем кастомное событие formValid, которое мы создали в validation.js
    document.addEventListener('formValid', function(event) {
        // Получаем данные из события
        const formData = event.detail;
        
        // Очищаем консоль (чтобы не было мусора от предыдущих отправок)
        console.clear();
        
        // Красивый вывод данных в консоль
        console.log('%c--- Новая заявка с сайта ---', 'color: #3273dc; font-weight: bold; font-size: 14px;');
        console.log('ФИО:', formData.fullname);
        console.log('Телефон:', formData.phone);
        console.log('Email:', formData.email);
        console.log('Тема обращения:', formData.topic);
        console.log('Сообщение:', formData.message);
        
        // Вывод времени
        const timestamp = new Date().toLocaleString('ru-RU');
        console.log('%cВремя отправки: ' + timestamp, 'color: gray; font-style: italic;');
        console.log('%c----------------------------', 'color: #3273dc; font-weight: bold;');
    });
});