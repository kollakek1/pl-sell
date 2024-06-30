import { useState, useEffect } from "react";
export default function Lk() {
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');
    const [products, setProducts] = useState(null);

    useEffect(() => {
        fetch('/api/login', {
            'method': 'POST',
            'body': JSON.stringify({userCode: userPassword, userEmail: userEmail}),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                setProducts(data);
            }
            else {
                localStorage.clear();
                location.href = '/'
            }
        })
    }, []);

    if (userEmail && userPassword) {
        return (
            <div className="w-full flex gap-8 max-lg:flex-col">
                <div className="lg:w-1/3 rounded-box bg-base-200 border-2 shadow-md border-base-100 hover:scale-105 hover:shadow-lg transition-all duration-500 h-max p-4">
                    <h1 className="text-2xl text-center font-medium mb-4">Личный кабинет</h1>
                    <p className="text-center">Email: {userEmail}</p>
                    <button className="btn btn-primary btn-sm w-full mt-4" onClick={() => {localStorage.clear(); location.href = '/'}}>Выйти</button>
                </div>
                    <div className="w-full rounded-box bg-base-200 border-2 shadow-md border-base-100 transition-all duration-500 p-4 lg:grid gap-4 grid-cols-3">
                    {products?.map((product, index) => (
                        <div key={index} className="rounded-box p-3 bg-base-100 border-2 border-base-300 shadow-md hover:scale-105 hover:shadow-xl transition-all duration-500 h-56">
                            <h2 className="text-2xl text-center font-medium mb-2">
                                {product.type === 'plugin' ? 'Плагин' :
                                    product.type === 'server' ? 'Minecraft сервер' :
                                        product.type === 'site' ? 'Сайт автодоната' : ''}
                            </h2>
                            <p className="text-center text-xl mb-5">{product.name}</p>
                            {product.type === 'plugin' && <p className="text-center">Ключ: <span className="blur hover:blur-none duration-1000">{product.key}</span></p>}
                            <div className="flex justify-center gap-3 mt-8">
                                {product?.download_url && <a href={product.download_url} className="btn btn-primary">Скачать</a>}
                                {product?.key && <button className="btn btn-secondary" onClick={() => navigator.clipboard.writeText(product.name)}>Скопировать ключ</button>}
                            </div>
                        </div>
                    ))}
                    {!products &&
                        <>
                            <div className="rounded-box h-56 border-2 border-base-300 shadow-md transition-all duration-500 skeleton"></div>
                            <div className="rounded-box h-56 border-2 border-base-300 shadow-md transition-all duration-500 skeleton"></div>
                        </>
                    }

                </div>
            </div>
        );
    }
    else {
        location.href = '/';
    }
}