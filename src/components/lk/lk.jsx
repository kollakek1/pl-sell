import { useState, useEffect } from "react";
export default function Lk() {
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');

    if (userEmail && userPassword) {
        return (
            <div className="w-full flex gap-8 max-lg:flex-col">
                <div className="lg:w-1/3 rounded-box bg-base-200 border-2 shadow-md border-base-100 hover:scale-105 hover:shadow-lg transition-all duration-500 h-max p-4">
                    <h1 className="text-2xl text-center font-medium mb-4">Личный кабинет</h1>
                    <p className="text-center">Email: {userEmail}</p>
                    <button className="btn btn-primary btn-sm w-full mt-4" onClick={() => {localStorage.clear(); location.href = '/'}}>Выйти</button>
                </div>
                <div className="w-full rounded-box bg-base-200 border-2 shadow-md border-base-100 transition-all duration-500 p-4 lg:grid grid-cols-3">
                    <div className="rounded-box p-3 bg-base-100 border-2 border-base-300 shadow-md hover:scale-105 hover:shadow-xl transition-all duration-500 h-max">
                        <h2 className="text-2xl text-center font-medium mb-2">Плагин</h2>
                        <p className="text-center text-xl mb-5">Тестовый плагин</p>
                        <p className="text-center">Ключ: <span className="blur hover:blur-none duration-1000">HF2N0-DNMWXC-XJIWX-XKOW</span></p>
                        <div className="flex justify-center gap-3 mt-8">
                            <a href="/plugins" className="btn btn-primary">Скачать</a>
                            <button className="btn btn-secondary" onClick={() => navigator.clipboard.writeText('HF2N0-DNMWXC-XJIWX-XKOW')}>Скопировать ключ</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    else {
        location.href = '/';
    }
}