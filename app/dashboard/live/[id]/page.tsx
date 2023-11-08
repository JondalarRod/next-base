import {getLiveDetail, getLives} from "@/app/lib/data";
import {Metadata} from 'next';
import {GetStaticProps, GetStaticPaths} from 'next';
import {useRouter} from 'next/navigation';
import Link from "next/link";


export const metadata: Metadata = {};

export default async function LiveDetail({params}: { params: { id: string } }) {
    const itemID: any = params?.id;
    const data = await getLiveDetail(itemID);
    metadata.title = data.title
    metadata.description = data.description
    const RenderDetail = () => {
        return <>{data ?
            <>
                <h1>{data.title}</h1>
                <p>{data.description}</p>
                <p>{itemID}</p>
                <Link href={data.route}>More Information here</Link>
            </> : <> <h1>Error - please try another parameter</h1> </>
        }
        </>
    }
    return (
        <div>
            <RenderDetail/>
        </div>
    )
}
