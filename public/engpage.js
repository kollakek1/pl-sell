
document.addEventListener('DOMContentLoaded', function () {

  const redirected = localStorage.getItem('en');
  
  if (!redirected) {
    const userLang = navigator.language || navigator.userLanguage; 
    const userLangPrefix = userLang.split('-')[0];


    if (userLangPrefix !== 'ru') {
      window.location.href = '/en';
    }

    localStorage.setItem('en', 'true');
  }
});
