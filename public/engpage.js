
document.addEventListener('DOMContentLoaded', function () {
    const userLang = navigator.language || navigator.userLanguage; 
    const userLangPrefix = userLang.split('-')[0];
  
    if (userLangPrefix !== 'ru') {
      window.location.href = '/en';
    }
  });
  