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
                        <label className="swap swap-rotate">
                            <input type="checkbox" className="theme-controller" value="dark" />

                            <svg
                                className="swap-off h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                            </svg>

                            <svg
                                className="swap-on h-7 w-7 fill-current"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                            </svg>
                        </label>
                        <a href="/" className="btn btn-ghost my-auto text-base">RU</a>
                        <a href="/" className="btn btn-primary my-auto text-base">Order now</a>
                    </div>
                </div>
            </div>
        </header>
    );
}
