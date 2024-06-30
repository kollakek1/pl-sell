import { useState, useEffect } from 'react';
const Product = ({ id }) => {

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/getproduct/${id}`)
            .then((response) => response.json())
            .then((data) => setProduct(data));

        setProduct(product);

    }, []);

    useEffect(() => {
        if (product) {
            document.title = product.name;
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', product.description);
            }
            setLoading(false);
        }
        
    }, [product]);

    const handleSumbit = async () => {
        setLoading(true);
        fetch('/api/create-product-order/' + id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({product: product}),
        })
        .then((response) => response.json())
        .then((data) => {
            window.location.href = data.confirmation.confirmation_url;
        })

    };

  return (
    <section className="lg:min-h-screen mt-28 max-lg:mt-2 h-max flex max-lg:flex-wrap gap-8 lg:container mx-auto w-full max-lg:px-4">
        <div className="w-full flex gap-4">
            <div className="rounded-box bg-base-200 border-2 border-base-100 w-full transition-colors duration-500 p-6">
            {product && (
                <>
                    <h1 className="text-5xl font-medium">{product.name}</h1>
                    <h2 className="text-2xl mt-8">{product.description}</h2>
                    {product.preview_url && (
                        <a
                        href={product.preview_url}
                        className="btn btn-primary btn-lg mt-8 text-2xl rounded-2xl"
                        >
                        Пример шаблона
                        </a>
                    )}
                </>
            )}
            {!product && <div className='w-full h-full flex justify-center items-center'><span className="loading loading-spinner loading-lg"></span></div>}
            </div>
        </div>

        <div className="lg:w-1/3 w-full">
        <form
          className="rounded-box bg-base-200 border-2 border-base-100 transition-colors duration-500 p-6"
          onSubmit={(e) => {e.preventDefault(); handleSumbit()}}
        >
          <p className="text-2xl mb-5 font-medium">{product?.name}</p>
          <p className="text-2xl mb-3 font-medium">
            Цена: {product?.price}₽
          </p>
          <div className="flex justify-between mb-5">
            <input type="checkbox" className="checkbox" required />
            <p className="ml-2">
              Я согласен с{" "}
              <a href="/User-Agreement.pdf" className="link">
                пользовательским соглашением
              </a>
            </p>
          </div>
          <button className="btn btn-primary w-full" type="submit" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-md"></span> : "Купить"}
          </button>
        </form>
        </div>
    </section>
  );
};

export default Product;
