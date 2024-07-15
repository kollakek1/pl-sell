import { useState, useEffect } from 'react';

export default function List() {
    const [products, setProducts] = useState(null);
    const [sortProducts, setSortProducts] = useState(products);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/getproducts');
            const data = await response.json();
            setProducts(data);
            setSortProducts(data);
        };
        fetchProducts();
    }, []);
    
    const sortByType = (type) => {
        const filteredProducts = products.filter(product => {
            if (type === 'all') {
                return true;
            }
            if (type === 'free') {
                return product.price === 0;
            }
            return product.type === type;
        });
        setSortProducts(filteredProducts);
    }

    
    return (
        <div className="w-full max-lg:px-2">
            <div className="join w-full">
                <button className="btn join-item w-1/5 lg:w-1/6 transition-colors duration-500" onClick={() => sortByType('all')}>Всё</button>
                <button className="btn join-item w-1/6 max-lg:hidden transition-colors duration-500" onClick={() => sortByType('free')}>Бесплатные</button>
                <button className="btn join-item w-1/5 lg:w-1/6 transition-colors duration-500" onClick={() => sortByType('plugin')}>Плагины</button>
                <button className="btn join-item w-1/5 lg:w-1/6 transition-colors duration-500" onClick={() => sortByType('build')}>Сборки</button>
                <button className="btn join-item w-1/5 lg:w-1/6 transition-colors duration-500" onClick={() => sortByType('site')}>Сайты</button>
                <button className="btn join-item w-1/5 lg:w-1/6 transition-colors duration-500" onClick={() => sortByType('config')}>Файлы настроек</button>
            </div>
            <div className='w-full flex gap-x-4'>
                <div className='w-1/4 max-lg:hidden shadow-md transition-all duration-500 border-2 border-base-100 bg-base-200 mt-3 rounded-box p-4'>
                    
                </div>
                <div className="w-full h-max mt-3 lg:grid grid-cols-2 gap-x-3">
                    {!sortProducts && 
                        <>
                            <p className="w-full h-48 skeleton shadow-md mb-3"></p>
                            <p className="w-full h-48 skeleton shadow-md"></p>
                        </>
                    }
                    {sortProducts?.map((product) => (
                        <div key={product._id} className="bg-base-200 shadow-md transition-all duration-500 border-2 border-base-100 card p-6 w-full h-48 mb-3">
                            <div className="flex justify-between">
                                <h1 className="text-2xl font-medium">{product.name}</h1>
                                {product.price === 0 ? (
                                    product.bages.includes('Open Source') && product.github ? (
                                        <a href={product.github} className="btn btn-primary btn-sm mt-1">Смотреть</a>
                                    ) : (
                                        <a href={'/product/' + product._id} className="btn btn-primary btn-sm mt-1">Смотреть</a>
                                    )
                                ) : (
                                    <a href={'/product/' + product._id} className="btn btn-primary btn-sm mt-1">{product.price} ₽</a>
                                )}
                            </div>
                            <div className="flex gap-2 mt-3">
                                {product.price === 0 ?
                                    <div className="tooltip" data-tip="Бесплатный продукт">
                                        <div className="badge badge-success badge-lg">Free</div>
                                    </div>
                                    : 
                                    <div className="tooltip" data-tip="Платный продукт">
                                        <div className="badge badge-secondary badge-lg">Paid</div>
                                    </div>
                                }
                                {product.bages.includes('Open Source') && <div className="tooltip" data-tip="Продукт имеет открытый исходный код"><div className="badge badge-neutral badge-lg">Open Source</div></div>}
                                {product.bages.includes('Out of date') && <div className="tooltip" data-tip="Продукт больше не поддерживается или не работает"><div className="badge badge-error badge-lg">Out of date</div></div>}
                            </div>
                            <p className="text-lg mt-3 text-base-content/75 text-pretty truncate">{product.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        
    );
}