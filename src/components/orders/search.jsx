import { useState } from "react";

export default function Search() {
    const [order, setOrder] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
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
    };

    return (
        <div className={`w-96 mx-auto mt-4`}>
            <form onSubmit={handleSubmit}>
                <label className="input input-bordered flex items-center gap-2">
                    <input type="text" name="orderId" className="grow" placeholder="Введите уникальный номер" required />
                    <button type="submit">
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
                    </button>
                </label>
                <p className="text-error mt-1">{errorMessage}</p>
            </form>
            <dialog id="modal" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-2xl">Заказ № {order?.id}</h3>
                    <div className="w-full h-max grid grid-cols-2 gap-x-4">
                        <div>
                            <p className="text-xl mt-8 font-bold">Статус: {order?.status}</p>
                            <p className="text-xl mt-4">Цена: {order?.items.reduce((total, item) => total + item.price, 0)}₽</p>
                        </div>
                        <div className="mt-8">
                            {order?.items.map((item, index) => (
                                <div className="card bg-base-100 p-3 border-2 border-base-300 mb-2 shadow-md">
                                    <p className="text-xl font-bold">{item.name}</p>
                                    Цена: {item.price}₽
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
}