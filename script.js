// 1.	Зберігання даних у браузері
const browserInfo = {
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language
};
localStorage.setItem('browserInfo', JSON.stringify(browserInfo));
// 2.	Відображення динамічного вмісту отриманого із серверу
window.addEventListener('DOMContentLoaded', () => {
    const commentsDiv = document.createElement('div');
    commentsDiv.id = 'comments';
    commentsDiv.innerHTML = '<h3>Коментарі роботодавців</h3>';
    document.body.appendChild(commentsDiv);
    fetch('https://jsonplaceholder.typicode.com/posts/20/comments')
        .then(response => response.json())
        .then(comments => {
            comments.forEach(comment => {
                const commentEl = document.createElement('div');
                commentEl.className = 'comment';
                commentEl.innerHTML = `<strong>${comment.name}</strong> (${comment.email}):<br>${comment.body}`;
                commentsDiv.appendChild(commentEl);
            });
        });
});
// Модальне вікно через 1 хвилину
setTimeout(() => {
    document.getElementById('modal').style.display = 'flex';
}, 60000);
// Обробка форми зворотного зв’язку
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('feedback-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Зупинити стандартну відправку

            const data = {
                name: form.name.value,
                email: form.email.value,
                phone: form.phone.value,
                message: form.message.value
            };

            console.log('Повідомлення надіслано:', data);

            alert('Дякуємо за зворотній звʼязок!');
            form.reset();

            // Закрити модальне вікно
            document.getElementById('modal').style.display = 'none';
        });
    }
});
// 4.	Перехід на нічний/денний режим
function applyTheme(theme) {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
}
function toggleTheme() {
    const currentTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(currentTheme);
}
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    const hours = new Date().getHours();
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme(hours >= 7 && hours < 21 ? 'light' : 'dark');
    }
    const themeBtn = document.createElement('button');
    themeBtn.id = 'themeToggle';
    themeBtn.textContent = 'Змінити тему';
    themeBtn.onclick = toggleTheme;
    document.body.appendChild(themeBtn);
});
// футер
window.addEventListener('DOMContentLoaded', () => {
    const footer = document.createElement('footer');
    const info = JSON.parse(localStorage.getItem('browserInfo'));
    footer.innerHTML = `<strong>Інформація про браузер:</strong><br>${Object.entries(info).map(([key, value]) => `${key}: ${value}`).join('<br>')}`;
    document.body.appendChild(footer);
});