import classes from "./item.module.css"
import Link from 'next/link';
import Image from 'next/image';

export interface MealItemProps {
    id: string | number;
    title: string;
    slug: string;
    image: string;
    summary: string;
    creator: string;
    creator_email: string
    instructions: string
}

export default function MealItem({ title, slug, image, summary, creator }: MealItemProps) {
    const imagePath = require(`@/assets/${image}`).default;

    return (
        <article className={classes.meal}>
            <header>
                <div className={classes.image}>
                    <Image
                        // src={`https://maxschwarzmueller-nextjs-demo-users-image.s3.amazonaws.com/${image}`}
                        src={imagePath}
                        alt={title}
                        fill
                    />
                </div>
                <div className={classes.headerText}>
                    <h2>{title}</h2>
                    <p>by {creator}</p>
                </div>
            </header>
            <div className={classes.content}>
                <p className={classes.summary}>{summary}</p>
                <div className={classes.actions}>
                    <Link href={`/meals/${slug}`}>View Details</Link>
                </div>
            </div>
        </article>
    );
}