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
        <header className={`transition-all duration-700 ${headerClass} border border-white/10 bg-white/10 backdrop-blur container mx-auto fixed inset-x-0 py-3 px-4 sm:card h-min z-30`}>
            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <a href="/" className="text-3xl font-bold my-auto">VND<span className="text-primary">team</span></a>
                    <div className="h-8 w-[1px] bg-white/20 my-auto"></div>
                    <div className="max-lg:hidden">
                        <a href="/" className="my-auto btn btn-ghost text-xl">Главная</a>
                        <a href="/" className="my-auto btn btn-ghost text-xl">Новости</a>
                        <a href="/" className="my-auto btn btn-ghost text-xl">Заказы</a>
                    </div>
                </div>
                <div className="flex gap-2">
                    <a href="/" className="btn btn-primary my-auto text-base">Заказать</a>
                </div>
            </div>
        </header>
    );
}
