import classes from "./page.module.css"
import Link from "next/link";
import MealsGrid from "@/components/meals";
import {getMeals} from "@/lib/meals";
import {MealItemProps} from "@/components/meals/item";
import {Suspense} from "react";
import type {Metadata} from "next";

export const metadata: Metadata = {
    title: "All Meals",
    description: "Browse the delicious meals shared by our vibrant community.",
};

async function Meals(){
    const meals: MealItemProps[] = await getMeals()
    return <MealsGrid meals={meals}/>
}

export default function MealsPage() {


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
            <Suspense fallback={<div className={classes.loading}>Fetching meals...</div>}>
                <Meals/>
            </Suspense>
        </main>
    </>

}