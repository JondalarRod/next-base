import {lusitana} from '@/app/ui/fonts';
import {getLives} from "@/app/lib/data";
import Image from "next/image";
import {Metadata} from 'next';
import Link from "next/link";


export const metadata: Metadata = {
    title: 'Lives',
};

async function Page() {

    const response = await getLives()
    let archives: string[] = []
    let keywords: string[] = []
    console.log("response en PAGE", response)
    const RenderLives = () => (
        response.response.items.map((item: any) => {
            archives.push(item.thumbnail)
            keywords.push(item.title)
            metadata.archives = archives
            metadata.keywords = keywords
            return <div key={item.category_id}>
                <Image
                    src={item.image}
                    className=""
                    alt={`${item.name}'s profile picture`}
                    width={350}
                    height={100}
                />
                <Link href={`live/${item.category_id}`}><h3>{item.title}</h3></Link>

            </div>
        })
    )


    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <RenderLives/>
            </div>
        </main>
    );
}

export default Page