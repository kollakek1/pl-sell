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
                    <h3 className="font-bold text-2xl">Заказ № {order?._id}</h3>
                    <ul>
                        <li>ID: {order?._id}</li>
                        <li>Server: {order?.server.toString()}</li>
                        <li>Plugin: {order?.plugin.toString()}</li>
                        <li>Site: {order?.site.toString()}</li>
                        <li>Launcher: {order?.launcher.toString()}</li>
                        <li>AutoDesign: {order?.autoDesign.toString()}</li>
                        <li>ServerType: {order?.serverType}</li>
                        <li>Price: {order?.price}</li>
                        <li>UserEmail: {order?.userEmail}</li>
                        <li>UserName: {order?.userName}</li>
                        <li>ServerDescription: {order?.serverDescription}</li>
                        <li>PluginDescription: {order?.pluginDescription}</li>
                        <li>SiteDescription: {order?.siteDescription}</li>
                        <li>LauncherDescription: {order?.launcherDescription}</li>
                        <li>CreatedAt: {order?.createdAt}</li>
                    </ul>
                </div>
            </dialog>
        </div>
    );
}