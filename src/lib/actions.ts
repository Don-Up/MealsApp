'use server';

import {saveMeal} from './meals';
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

// function isInvalidText(text) {
//   return !text || text.trim() === '';
// }
//
// export async function shareMeal(prevState, formData) {
//   const meal = {
//     title: formData.get('title'),
//     summary: formData.get('summary'),
//     instructions: formData.get('instructions'),
//     image: formData.get('image'),
//     creator: formData.get('name'),
//     creator_email: formData.get('email'),
//   };
//
//   if (
//     isInvalidText(meal.title) ||
//     isInvalidText(meal.summary) ||
//     isInvalidText(meal.instructions) ||
//     isInvalidText(meal.creator) ||
//     isInvalidText(meal.creator_email) ||
//     !meal.creator_email.includes('@') ||
//     !meal.image ||
//     meal.image.size === 0
//   ) {
//     return {
//       message: 'Invalid input.',
//     };
//   }
//
//   await saveMeal(meal);
//   revalidatePath('/meals');
//   redirect('/meals');
// }

export async function shareMeal(formData: FormData){
  console.log(formData.get('title'))
  console.log(formData.get('summary'))
  console.log(formData.get('instructions'))
  console.log(formData.get('image'))
  console.log(formData.get('name'))
  console.log(formData.get('email'))

  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  }

  await saveMeal(meal)
  redirect("/meals")
}