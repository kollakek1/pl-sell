
document.addEventListener('DOMContentLoaded', function () {
  // Проверяем, было ли перенаправление уже выполнено
  const redirected = localStorage.getItem('redirected');

  if (!redirected) {
    const userLang = navigator.language || navigator.userLanguage; 
    const userLangPrefix = userLang.split('-')[0];

    // Если язык пользователя не русский, перенаправляем на другую страницу
    if (userLangPrefix !== 'ru') {
      window.location.href = '/en';
      localStorage.setItem('redirected', 'true');
    }
  }
});
