export default function Footer() {
    return (
        <footer className="footer footer-center p-4 bg-base-200 text-base-content mt-8 border-2 border-base-100 flex justify-center">
                <p className="text-xl font-bold flex">VND<span className="text-primary">team</span> - разработка серверов майнкрафт</p>
                <a href="/User-Agreement.pdf" className="btn btn-ghost flex">
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z" clipRule="evenodd"/>
                </svg>

                Пользовательское соглашение
                </a>
        </footer>
    );
}