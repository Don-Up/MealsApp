import classes from "./page.module.css"
import Link from "next/link";
import MealsGrid from "@/components/meals";
import {getMeals} from "../../../lib/meals";
import {MealItemProps} from "@/components/meals/item";

export default async function MealsPage() {

    const meals: MealItemProps[] = await getMeals()

    return <>
        <header className={classes.header}>
            <h1>
                Delicious means, created <span className={classes.highlight}>by you</span>
            </h1>
            <p>Choose your favorite recipe and cook it yourself. It is easy and fun!</p>
            <p className={classes.cta}>
                <Link href={"/meals/share"}>
                    Share Your Favorite Recipe
                </Link>
            </p>
        </header>
        <main className={classes.main}>
            {meals && <MealsGrid meals={meals}/>}
        </main>
    </>

}