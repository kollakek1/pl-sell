import { useState } from "react";

export default function Search() {
    const [order, setOrder] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const[loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        const orderId = event.target.elements.orderId.value;
        const response = await fetch(`/api/getorder/${orderId}`);
        if (response.status === 404) {
            setErrorMessage('Заказ не найден');
        } else {
            const data = await response.json();
            document.getElementById('modal').showModal()
            setOrder(data);
        }
        setLoading(false);
    };

    return (
        <div className={`w-96 mx-auto mt-4`}>
            <form onSubmit={handleSubmit}>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" name="orderId" className="grow" placeholder="Введите уникальный номер" required />
                    <button type="submit" disabled={loading}>
                        {loading ? <span className="loading loading-spinner loading-sm mt-2"></span> :
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70 cursor-pointer">
                            <path
                            fillRule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clipRule="evenodd" 
                            />
                        </svg>
                        }
                    </button>
                </label>
                <p className="text-error mt-1">{errorMessage}</p>
            </form>
            <dialog id="modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl">Заказ</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div >
                            <p className="mb-2 mt-4">Заказчик: {order?.userName}</p>
                            <p className="mb-2">Статус: {order?.status}</p>
                            <p className="">Цена: {order?.price}₽</p>
                            <a href={order?.link} className="btn btn-primary mt-4" disabled={!order?.link}>{order?.link ? 'Скачать' : 'Нет ссылки'}</a>
                        </div>
                        <div>
                            <h3 className="font-medium text-xl mt-4">В заказе:</h3>
                            {order?.server && <p className="mb-2">Сервер</p>}
                            {order?.plugin && <p className="mb-2">Плагин</p>}
                            {order?.site && <p className="mb-2">Сайт</p>}
                            {order?.launcher && <p className="mb-2">Лаунчер</p>}
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}