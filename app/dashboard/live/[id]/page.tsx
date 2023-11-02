import {getLiveDetail, getLives} from "@/app/lib/data";
import {Metadata} from 'next';
import {GetStaticProps, GetStaticPaths} from 'next';
import {useRouter} from 'next/navigation';
import Link from "next/link";


export const metadata: Metadata = {
    title: 'Lives',
};

export default async function LiveDetail({params}: { params: { id: string } }) {
    const itemID: any = params?.id;
    const {data} = await getLiveDetail(itemID);
    console.log("PROPS ", data)
    const RenderDetail = () => {
        console.log("INSIDE RENDER")
        return <>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <p>{itemID}</p>
            <Link href={data.route}>More Information here</Link>
        </>
    }



    return (
        <div>
            <RenderDetail/>
        </div>
    )

}


const getStaticProps: any = async (itemID: string) => {
    const data = await getLiveDetail(itemID);
    console.log(data)
    return {
        props: {
            specificStarData: data
        }
    }
}

const getStaticPaths: GetStaticPaths = async () => {
    const {data} = await getLives();
    const pathsWithParams = data.items.map((item: any) => ({params: {id: item.id}}))

    return {
        paths: pathsWithParams,
        fallback: true
    }
}
