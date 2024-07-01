import { useState, useEffect } from "react"
export default function Main() {
    const [server, setServer] = useState(false);
    const [plugin, setPlugin] = useState(false);
    const [site, setSite] = useState(false);
    const [launcher, setLauncher] = useState(false);

    const[sitePrice, setSitePrice] = useState(0);

    const[autoDesign, setAutoDesign] = useState(true);
    const[serverType, setServerType] = useState('Ванилла');

    const [price, setPrice] = useState(0);

    const[userEmail, setUserEmail] = useState('');
    const[userName, setUserName] = useState('');
    const[tgName, setTgName] = useState('');

    const[serverDescription, setServerDescription] = useState('');
    const[pluginDescription, setPluginDescription] = useState('');
    const[siteDescription, setSiteDescription] = useState('');
    const[launcherDescription, setLauncherDescription] = useState('');

    const[loading, setLoading] = useState(false);

    const[successData, setSuccessData] = useState(null);

    useEffect(() => {
        let newPrice = 0;
        if (server) newPrice += 300;
        if (plugin) newPrice += 500;
        if (site) newPrice += 500;
        if (launcher) newPrice += 2500;
        if (autoDesign && site) newPrice += 400;
        if (site) {
            newPrice += sitePrice;
        } else {
            setSitePrice(0);
        }
        setPrice(newPrice);
    }, [server, plugin, site, launcher, pluginPrice, sitePrice, autoDesign]);

    const handleSubmit = () => {
        event.preventDefault();
        setLoading(true);
        fetch('/api/createorder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                server,
                plugin,
                site,
                launcher,
                autoDesign,
                serverType,
                price,
                userEmail,
                userName,
                tgName,
                serverDescription,
                pluginDescription,
                siteDescription,
                launcherDescription
            })
        })
        .then(response => response.json())
        .then(data => setSuccessData(data))
    }
    if (!successData) {
        return (
            <form className="w-full flex gap-8 max-2xl:flex-wrap" onSubmit={handleSubmit}>
                <div className="card w-full p-6 border-2 border-base-100">
                    <h1 className="text-4xl font-bold mb-4">Наши услуги</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                        <div className={`w-full p-3 card bg-base-200 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-500 border-2 cursor-pointer ${server === true ? 'border-primary' : 'border-base-100'}`} onClick={() => setServer(!server)}>
                            <h1 className="text-3xl font-bold flex">
                                <svg className="mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M5 5a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2H5Zm9 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H14Zm3 0a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17ZM3 17v-3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm11-2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H14Zm3 0a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clipRule="evenodd"/>
                                </svg>
                                <p className="ml-2">Minecraft сервер</p>
                            </h1>
                            <p className="text-lg mt-2 text-base-content/75">Разработка сервера под ваши нужды</p>
                        </div>
                        <div className={`w-full p-3 card bg-base-200 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-500 border-2 cursor-pointer ${plugin === true ? 'border-primary' : 'border-base-100'}`} onClick={() => setPlugin(!plugin)}>
                            <h1 className="text-3xl font-bold flex">
                            <svg className="mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2h-7Z" clipRule="evenodd"/>
                            </svg>
                                <p className="ml-2">Плагин</p>
                            </h1>
                            <p className="text-lg mt-2 text-base-content/75">Разработка плагина под ваши нужды</p>
                        </div>
                        <div className={`w-full p-3 card bg-base-200 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-500 border-2 cursor-pointer ${site === true ? 'border-primary' : 'border-base-100'}`} onClick={() => setSite(!site)}>
                            <h1 className="text-3xl font-bold flex">
                            <svg className="mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M5.535 7.677c.313-.98.687-2.023.926-2.677H17.46c.253.63.646 1.64.977 2.61.166.487.312.953.416 1.347.11.42.148.675.148.779 0 .18-.032.355-.09.515-.06.161-.144.3-.243.412-.1.111-.21.192-.324.245a.809.809 0 0 1-.686 0 1.004 1.004 0 0 1-.324-.245c-.1-.112-.183-.25-.242-.412a1.473 1.473 0 0 1-.091-.515 1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.401 1.401 0 0 1 13 9.736a1 1 0 1 0-2 0 1.4 1.4 0 0 1-.333.927.896.896 0 0 1-.667.323.896.896 0 0 1-.667-.323A1.4 1.4 0 0 1 9 9.74v-.008a1 1 0 0 0-2 .003v.008a1.504 1.504 0 0 1-.18.712 1.22 1.22 0 0 1-.146.209l-.007.007a1.01 1.01 0 0 1-.325.248.82.82 0 0 1-.316.08.973.973 0 0 1-.563-.256 1.224 1.224 0 0 1-.102-.103A1.518 1.518 0 0 1 5 9.724v-.006a2.543 2.543 0 0 1 .029-.207c.024-.132.06-.296.11-.49.098-.385.237-.85.395-1.344ZM4 12.112a3.521 3.521 0 0 1-1-2.376c0-.349.098-.8.202-1.208.112-.441.264-.95.428-1.46.327-1.024.715-2.104.958-2.767A1.985 1.985 0 0 1 6.456 3h11.01c.803 0 1.539.481 1.844 1.243.258.641.67 1.697 1.019 2.72a22.3 22.3 0 0 1 .457 1.487c.114.433.214.903.214 1.286 0 .412-.072.821-.214 1.207A3.288 3.288 0 0 1 20 12.16V19a2 2 0 0 1-2 2h-6a1 1 0 0 1-1-1v-4H8v4a1 1 0 0 1-1 1H6a2 2 0 0 1-2-2v-6.888ZM13 15a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-2Z" clipRule="evenodd"/>
                            </svg>
                                <p className="ml-2">Автодонат</p>
                            </h1>
                            <p className="text-lg mt-2 text-base-content/75">Разработка сайта под ваши нужды</p>
                        </div>
                        <div className={`w-full p-3 card bg-base-200 shadow-md hover:scale-105 hover:shadow-lg transition-all duration-500 border-2 cursor-pointer ${launcher === true ? 'border-primary' : 'border-base-100'}`} onClick={() => setLauncher(!launcher)}>
                            <h1 className="text-3xl font-bold flex">
                            <svg className="mt-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm16 7H4v7h16v-7ZM5 8a1 1 0 0 1 1-1h.01a1 1 0 0 1 0 2H6a1 1 0 0 1-1-1Zm4-1a1 1 0 0 0 0 2h.01a1 1 0 0 0 0-2H9Zm2 1a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H12a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                            </svg>
                                <p className="ml-2">Лаунчер</p>
                            </h1>
                            <p className="text-lg mt-2 text-base-content/75">Разработка лаунчера под ваши нужды</p>
                        </div>
                    </div>
                    <div className="w-full mt-4">
                        {(launcher || plugin || server || site) && (
                            <h2 className="text-3xl font-bold mb-3">Добавте к заказу?</h2>
                        )}
                        {server && (
                            <div className="w-full card bg-base-200 border-2 border-base-100 shadow-md p-4 mb-2 transition-colors duration-500">
                                <h3 className="text-3xl font-medium mb-4">Сервер</h3>
                                <h2 className="text-2xl font-medium mb-3">Тип сервера</h2>
                                <select className="select w-full max-w-xs mb-3" onChange={(e) => setServerType(e.target.value)} value={serverType}>
                                    <option value="Ванильный">Ванильный</option>
                                    <option value="Анархия">Анархия</option>
                                    <option value="Гриферский">Гриферский</option>
                                    <option value="Выживание">Выживание</option>
                                    <option value="Мини-игры">Мини-игры</option>
                                    <option value="Прокси">Прокси</option>
                                </select>
                                <h2 className="text-2xl font-medium mb-3">Описание</h2>
                                <textarea onChange={(e) => setServerDescription(e.target.value)} className="textarea textarea-bordered" placeholder="Укажите максимально подробное описание, детали можно обговорить с менеджером"></textarea>
                            </div>
                        )}
                        {plugin && (
                            <div className="w-full card bg-base-200 border-2 border-base-100 shadow-md p-4 mb-2 transition-colors duration-500">
                                <h3 className="text-3xl font-medium mb-4">Плагин для сервера Minecraft</h3>
                                <h2 className="text-2xl font-medium mb-3">Описание</h2>
                                <textarea onChange={(e) => setPluginDescription(e.target.value)} className="textarea textarea-bordered mb-1" placeholder="Укажите максимально подробное описание, детали можно обговорить с менеджером"></textarea>
                                <p className="*text-base-content/75">*Плагины нацелены только на 1 проект</p>
                            </div>
                        )}
                        {site && (
                            <div className="w-full mb-2 card bg-base-200 border-2 border-base-100 shadow-md p-4 transition-colors duration-500">
                                <h3 className="text-3xl font-medium mb-4">Сайт автодоната</h3>
                                <h2 className="text-2xl font-medium mb-4">Сложность сайта</h2>
                                <input type="range" min={0} max="4000" className="range" step="1000" onChange={(e) => setSitePrice(parseInt(e.target.value))} />
                                <div className="flex w-full justify-between px-2 text-xs mb-4">
                                    <span>Лёгкий</span>
                                    <span>|</span>
                                    <span>|</span>
                                    <span>|</span>
                                    <span>Сложный</span>
                                </div>
                                <div className="flex mb-4">
                                    <input type="checkbox" defaultChecked className="checkbox" onChange={(e) => setAutoDesign(e.target.checked)}/>
                                    <p className="ml-2">Придумайте дизайн за меня</p>
                                </div>
                                <h2 className="text-2xl font-medium mb-4">Описание</h2>
                                <textarea onChange={(e) => setSiteDescription(e.target.value)} className="textarea textarea-bordered mb-1" placeholder="Укажите максимально подробное описание, детали можно обговорить с менеджером"></textarea>
                            </div>
                        )}
                        {launcher && (
                            <div className="w-full mb-2 card bg-base-200 border-2 border-base-100 shadow-md p-4 transition-colors duration-500">
                                <h3 className="text-3xl font-medium mb-4">Лаунчер</h3>
                                <h2 className="text-2xl font-medium mb-4">Сложность лаунчера</h2>
                                <input type="range" min={0} max="4000" className="range" step="1000" onChange={(e) => setSitePrice(parseInt(e.target.value))} />
                                <div className="flex w-full justify-between px-2 text-xs mb-4">
                                    <span>Лёгкий</span>
                                    <span>|</span>
                                    <span>|</span>
                                    <span>|</span>
                                    <span>Сложный</span>
                                </div>
                                <h2 className="text-2xl font-medium mb-4">Описание</h2>
                                <textarea onChange={(e) => setLauncherDescription(e.target.value)} className="textarea textarea-bordered mb-1" placeholder="Укажите максимально подробное описание, детали можно обговорить с менеджером"></textarea>
                            </div>
                        )}
                    </div>

                </div>
                <div className="2xl:w-1/3 w-full card bg-base-200 border-2 border-base-100 shadow-md p-6 transition-colors duration-500">
                    <h1 className="text-2xl font-bold mb-2">Как к вам обращаться?</h1>
                    <input type="text" placeholder="Псевдоним" className="input input-bordered w-full mb-5" onChange={(e) => setUserName(e.target.value)} required/>
                    <h1 className="text-2xl font-bold mb-2">Никнейм в Telegram</h1>
                    <input type="text" className="input input-bordered w-full mb-5" placeholder="@example" onChange={(e) => setTgName(e.target.value)} required/>
                    <h1 className="text-2xl font-bold mb-2">Почта</h1>
                    <input type="text" className="input input-bordered w-full mb-5" placeholder="example@mail.com" onChange={(e) => setUserEmail(e.target.value)} required/>
                    <h1 className="text-2xl font-bold mb-5">Цена: ~{price}₽</h1>
                    <div className="flex justify-between mb-5">
                        <input type="checkbox" className="checkbox" required/>
                        <p className="ml-2">Я согласен с <a href="/User-Agreement.pdf" className="link">пользовательским соглашением</a></p>
                    </div>
                    <button className="btn btn-primary w-full" type="submit" disabled={loading}>{loading ? <span className="loading loading-spinner"></span> : 'Создать заявку'}</button>
                </div>
            </form>
        )
    }
    if (successData) {
        return(
            <div className="w-full flex items-center justify-center h-screen">
                <div className="bg-base-200 border-2 border-base-100 shadow-md p-6 card">
                    <h1 className="text-4xl font-bold mb-6 text-center">Заявка создана</h1>
                    <h2 className="text-center text-xl mb-2">Номер вашей заявки: <span className="font-bold text-primary">{successData.insertedId}</span></h2>
                    <h2 className="text-center mb-4">Сохраните, что бы не потерять</h2>
                    <h2 className="text-center">Мы свяжемся с вами в ближайшее время</h2>
                </div>
            </div>
        )
    }
}