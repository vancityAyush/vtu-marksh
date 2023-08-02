'use client';
import {useRouter} from "next/navigation";

export default function Home() {
    const regex = /^[0-9][a-zA-Z]\w{1}\d{2}[a-zA-Z]\w{1}\d{3}$/;
    const router = useRouter();
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const value = Object.fromEntries(data.entries());
        const usn = value.usn.toUpperCase().trim();
        if (!regex.test(usn)) {
            alert("Invalid USN");
            return;
        }
        router.push('/usn/' + usn);
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
                    Get started by entering your USN
                </p>
                <div
                    className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
                    <a
                        className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                        href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        a Ayush Kumar Production
                        {/*<Image*/}
                        {/*  src="/vercel.svg"*/}
                        {/*  alt="Vercel Logo"*/}
                        {/*  className="dark:invert"*/}
                        {/*  width={100}*/}
                        {/*  height={24}*/}
                        {/*  priority*/}
                        {/*/>*/}
                    </a>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col justify-center items-center space-y-10">

                    <div className="form-control">
                        <input className="input input-alt" placeholder="Enter Your USN" required="" type="text"
                               name="usn"/>
                        <span className="input-border input-border-alt"></span>
                    </div>

                    <div className="button-borders">
                        <button className="primary-button" type="submit"> Submit
                        </button>
                    </div>
                </div>
            </form>
            <div>
            </div>


        </main>
    )
}

