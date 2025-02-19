import classes from "./index.module.css"
import MealItem, {MealItemProps} from "@/components/meals/item";

export default function MealsGrid({meals}: { meals: MealItemProps[] }) {
    return <ul className={classes.meals}>
        {meals.map(meal => (<li key={meal.id}>
            <MealItem {...meal}/>
        </li>))}
    </ul>
}