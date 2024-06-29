
document.addEventListener('DOMContentLoaded', function () {
  const redirected = localStorage.getItem('redirected');

  if (!redirected) {
    const userLang = navigator.language || navigator.userLanguage; 
    const userLangPrefix = userLang.split('-')[0];

    if (userLangPrefix !== 'ru') {
      window.location.href = '/en';
      localStorage.setItem('redirected', 'true');
    }
  }
});
