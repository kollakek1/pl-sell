import { useEffect, useState } from "react";
export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const [loginCode, setLoginCode] = useState(false);
    const [loginError, setLoginError] = useState(false);
    const [loginLoading, setLoginLoading] = useState(false);
      
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            document.documentElement.setAttribute('data-theme', storedTheme);
        }
        else {
            localStorage.setItem('theme', 'dim');
            document.documentElement.setAttribute('data-theme', 'dim');
        }
    }, []);
    
    const toggleTheme = () => {
        const theme = localStorage.getItem('theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > lastScrollY) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
            setLastScrollY(window.scrollY);
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY]);


    const headerClass = isVisible ? 'max-sm:top-0 top-6' : '-top-24';

    const handlePushCode = () => {
        event.preventDefault();
        fetch('/api/login/pushemail', {
            'method': 'POST',
            'body': JSON.stringify({userEmail: userEmail}),
        })
        setLoginCode(true);
        console.log(userEmail);
    }

    const handleLogin = () => {
        event.preventDefault();
        setLoginLoading(true);
        fetch('/api/login', {
            'method': 'POST',
            'body': JSON.stringify({userCode: userPassword, userEmail: userEmail}),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                localStorage.setItem('userEmail', userEmail);
                localStorage.setItem('userPassword', userPassword);
                window.location.href = '/lk';
            } else {
                setLoginError(true);
                setLoginLoading(false);
            }
        })
    }


    return (
        <>
        <header className={`transition-all duration-700 lg:fixed ${headerClass} container mx-auto inset-x-0 h-min z-30`}>
            <div className="border-b sm:border border-white/5 bg-white/5 backdrop-blur sm:card py-3 px-4 transition-colors duration-500">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <a href="/" className="text-3xl font-bold my-auto">VND<span className="text-primary">team</span></a>
                        <div className="h-8 w-[1px] bg-white/20 my-auto"></div>
                        <div className="max-lg:hidden flex gap-1">
                            <a href="/" className="my-auto btn btn-ghost text-xl">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clipRule="evenodd"/>
                                </svg>
                                Главная
                            </a>
                            {/* <a href="/" className="my-auto btn btn-ghost text-xl">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h11.5c.07 0 .14-.007.207-.021.095.014.193.021.293.021h2a2 2 0 0 0 2-2V7a1 1 0 0 0-1-1h-1a1 1 0 1 0 0 2v11h-2V5a2 2 0 0 0-2-2H5Zm7 4a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h.5a1 1 0 1 1 0 2H13a1 1 0 0 1-1-1Zm-6 4a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1ZM7 6a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7Zm1 3V8h1v1H8Z" clipRule="evenodd"/>
                                </svg>

                                Новости
                            </a> */}
                            <a href="/market" className="my-auto btn btn-ghost text-xl">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20 7h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C10.4 2.842 8.949 2 7.5 2A3.5 3.5 0 0 0 4 5.5c.003.52.123 1.033.351 1.5H4a2 2 0 0 0-2 2v2a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V9a2 2 0 0 0-2-2Zm-9.942 0H7.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM13 14h-2v8h2v-8Zm-4 0H4v6a2 2 0 0 0 2 2h3v-8Zm6 0v8h3a2 2 0 0 0 2-2v-6h-5Z"/>
                                </svg>

                                Продукты
                            </a>
                            <a href="/orders" className="my-auto btn btn-ghost text-xl">
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                                </svg>

                                Заказы
                            </a>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <label className="swap swap-rotate btn btn-ghost">
                            <input type="checkbox" onClick={toggleTheme}/>

                                <svg className="swap-off" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M13 3a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0V3ZM6.343 4.929A1 1 0 0 0 4.93 6.343l1.414 1.414a1 1 0 0 0 1.414-1.414L6.343 4.929Zm12.728 1.414a1 1 0 0 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 1.414 1.414l1.414-1.414ZM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm-9 4a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2H3Zm16 0a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2ZM7.757 17.657a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414Zm9.9-1.414a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM13 19a1 1 0 1 0-2 0v2a1 1 0 1 0 2 0v-2Z" clipRule="evenodd"/>
                                </svg>

                                <svg className="swap-on" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M11.675 2.015a.998.998 0 0 0-.403.011C6.09 2.4 2 6.722 2 12c0 5.523 4.477 10 10 10 4.356 0 8.058-2.784 9.43-6.667a1 1 0 0 0-1.02-1.33c-.08.006-.105.005-.127.005h-.001l-.028-.002A5.227 5.227 0 0 0 20 14a8 8 0 0 1-8-8c0-.952.121-1.752.404-2.558a.996.996 0 0 0 .096-.428V3a1 1 0 0 0-.825-.985Z" clipRule="evenodd"/>
                                </svg>
                        </label>
                        {/* <a href="/en" className="btn btn-ghost my-auto text-base max-lg:hidden">
                            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m13 19 3.5-9 3.5 9m-6.125-2h5.25M3 7h7m0 0h2m-2 0c0 1.63-.793 3.926-2.239 5.655M7.5 6.818V5m.261 7.655C6.79 13.82 5.521 14.725 4 15m3.761-2.345L5 10m2.761 2.655L10.2 15"/>
                            </svg>
                            EN
                        </a> */}
                        {localStorage.getItem('userEmail') && localStorage.getItem('userPassword') ? (
                            <a href="/lk" className="btn btn-primary my-auto text-base">
                                Кабинет
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                                </svg>
                            </a>
                        ) : (
                            <a onClick={()=>document.getElementById('login').showModal()} className="btn btn-primary my-auto text-base">
                                Кабинет
                                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4"/>
                                </svg>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </header>
        <dialog id="login" className="modal">
        <div className="modal-box">
            <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <h3 className="font-bold text-2xl text-center mb-4">Авторизация</h3>
            {!loginCode ?
                <form onSubmit={() => handlePushCode() && e.target.reset()}>
                    <input type="email" placeholder="Email" onChange={(e) => { setUserEmail(e.target.value); setUserPassword(''); }} className="input input-bordered w-full mt-4" minLength={6}/>
                    <div className="flex justify-start mb-3 mt-3">
                        <input type="checkbox" className="checkbox" required />
                        <p className="ml-2">
                        Я согласен с{" "}
                        <a href="/User-Agreement.pdf" className="link">
                            пользовательским соглашением
                        </a>
                        </p>
                    </div>
                    <button className="btn btn-primary w-full mt-4" type="submit">Получить код</button>
                </form>
                :
                <form onSubmit={() => handleLogin() && e.target.reset()}>
                    <input type="number" placeholder="Код из письма" onChange={(e) => setUserPassword(e.target.value)} className="input input-bordered w-full mt-4"/>
                    {loginError && <p className="text-error mt-1 mb-3">Код неверный</p>}
                    <button className="btn btn-primary w-full mt-4" disabled={loginLoading}>{loginLoading ? <span className="loading loading-spinner"></span> : 'Войти'}</button>
                </form>
            }

        </div>
        </dialog>
        </>
    );
}
