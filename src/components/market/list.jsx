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
                <button className="btn join-item w-1/5 lg:w-1/6" onClick={() => sortByType('all')}>Всё</button>
                <button className="btn join-item w-1/6 max-lg:hidden" onClick={() => sortByType('free')}>Бесплатные</button>
                <button className="btn join-item w-1/5 lg:w-1/6" onClick={() => sortByType('plugin')}>Плагины</button>
                <button className="btn join-item w-1/5 lg:w-1/6" onClick={() => sortByType('build')}>Сборки</button>
                <button className="btn join-item w-1/5 lg:w-1/6" onClick={() => sortByType('site')}>Сайты</button>
                <button className="btn join-item w-1/5 lg:w-1/6" onClick={() => sortByType('config')}>Файлы настроек</button>
            </div>
            <div className="w-full h-max mt-3 lg:grid grid-cols-2 gap-6">
                {!sortProducts && 
                    <>
                        <p className="w-full h-48 skeleton shadow-md mb-3"></p>
                        <p className="w-full h-48 skeleton shadow-md"></p>
                    </>
                }
                {sortProducts?.map((product) => (
                    <div key={product._id} className="bg-base-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-500 border-2 border-base-100 card p-6 w-full h-max mb-3">
                        <div className="flex justify-between">
                            <h1 className="text-2xl font-medium">{product.name}</h1>
                            {product.price === 0 ? 
                                <a href={product.github} className="btn btn-primary btn-sm mt-1">Смотреть</a> 
                                : 
                                <a href={'/product/' + product._id} className="btn btn-primary btn-sm mt-1">{product.price} ₽</a>
                            }
                        </div>
                        <div className="flex gap-2 mt-3">
                            {product.price === 0 ? 
                                <div className="badge badge-success badge-lg">Free</div>
                                : 
                                <div className="badge badge-secondary badge-lg">Paid</div>
                            }
                            {product.bages.includes('Open Source') && <div className="badge badge-neutral badge-lg">Open Source</div>}
                        </div>
                        <p className="text-lg mt-3 text-base-content/75">{product.description}</p>
                    </div>
                ))}
            </div>
        </div>
        
    );
}