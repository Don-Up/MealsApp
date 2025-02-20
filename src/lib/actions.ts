'use server';

import {saveMeal} from './meals';
import {redirect} from "next/navigation";

function isInvalidText(text: any | null) {
    return !text || text.trim() === '';
}

/**
 * Asynchronously shares a meal.
 *
 * This function constructs a meal object from the provided form data and validates the input.
 * If the input is valid, it saves the meal information. If the input is invalid, it returns an error message.
 * After saving the meal information, it redirects to the "/meals" page.
 *
 * @param prevState The previous state, containing a message field (not used in the function, but may be used for interface display or logging).
 * @param formData The form data object, containing the meal information to be shared.
 * @returns A promise that resolves to an object containing a message field, indicating the result of the operation.
 */
export async function shareMeal(prevState: { message: string }, formData: FormData): Promise<{ message: string }> {
    // Construct a meal object from the form data
    const meal = {
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    };

    // Validate meal information
    if (
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator) ||
        isInvalidText(meal.creator_email) ||
        // Validate email format
        !(meal.creator_email?.toString().includes('@')) ||
        // Ensure the image is provided
        !meal.image ||
        // The image must be a string or a File object
        (typeof meal.image !== 'string' && !(meal.image instanceof File)) ||
        // If the image is a File object, its size must not be 0
        (meal.image instanceof File && meal.image.size === 0)
    ) {
        // Return an error message if any input is invalid
        return {
            message: 'Invalid input.',
        };
    }

    // Save the meal information
    await saveMeal(meal);
    // Redirect to the meal list page after saving
    redirect("/meals");
}
