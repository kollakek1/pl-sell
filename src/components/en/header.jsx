import { useEffect, useState } from "react";
export default function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

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
    return (
        <header className={`transition-all duration-700 fixed ${headerClass} container mx-auto inset-x-0 h-min z-30`}>
            <div className="border-b sm:border border-white/5 bg-white/5 backdrop-blur sm:card py-3 px-4">
                <div className="flex justify-between items-center">
                    <div className="flex gap-3">
                        <a href="/" className="text-3xl font-bold my-auto">VND<span className="text-primary">team</span></a>
                        <div className="h-8 w-[1px] bg-white/20 my-auto"></div>
                        <div className="max-lg:hidden">
                            <a href="/" className="my-auto btn btn-ghost text-xl">Home</a>
                            <a href="/" className="my-auto btn btn-ghost text-xl">News</a>
                            <a href="/" className="my-auto btn btn-ghost text-xl">Orders</a>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <a href="/" className="btn btn-ghost my-auto text-base">RU</a>
                        <a href="/" className="btn btn-primary my-auto text-base">Order now</a>
                    </div>
                </div>
            </div>
        </header>
    );
}
