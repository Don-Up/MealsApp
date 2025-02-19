import Link from "next/link";

export default function Home() {
    console.log('Home')
    return (
        <div>
            <div>Next.js</div>
            <p><Link href={"/meals"}>Meals</Link></p>
            <p><Link href={"/meals/share"}>Share Meal</Link></p>
            <p><Link href={"/community"}>Community</Link></p>
        </div>
    );
}
