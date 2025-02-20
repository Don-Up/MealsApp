import sql from "better-sqlite3"
import slugify from "slugify";
import xss from "xss";
import * as fs from "node:fs";

// Create a connection to the database 'meals.db'
const db = sql("meals.db")

/**
 * Retrieve all meal records from the database
 *
 * This function queries the 'meals' table in the database to fetch all meal records.
 * It uses the 'prepare' method of the database to compile the SQL query and the 'all' method to execute the query and retrieve all results.
 *
 * @returns {Array} An array containing all meal records
 */
export async function getMeals(timeout = 2000) {
    try {
        // Simulate a delay if necessary
        if (timeout > 0) {
            await new Promise(resolve => setTimeout(resolve, timeout));
        }

        // throw new Error("Database connection timed out");

        // Execute the database query
        const result = db.prepare("SELECT * FROM meals").all();
        return result;
    } catch (error) {
        console.error("Error fetching meals:", error);
        throw error; // Re-throw the error after logging
    }
}

export function getMeal(slug) {
    try {
        // Execute the database query
        const result = db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
        return result;
    } catch (error) {
        console.error("Error fetching meals:", error);
        throw error; // Re-throw the error after logging
    }
}

/**
 * Asynchronously saves a meal object to the database and processes related information.
 *
 * @param {Object} meal - The meal object to be saved, containing properties such as title, instructions, and image.
 * @returns {Promise<void>} - No return value.
 *
 * This function performs the following tasks:
 * 1. Generates a slug for the meal object based on the title for URL friendliness.
 * 2. Sanitizes the cooking instructions to prevent XSS attacks.
 * 3. Saves the meal image to the specified directory and updates the image path in the meal object.
 * 4. Inserts the meal record into the database.
 */
export async function saveMeal(meal)
{
    console.log("Saving meal:", meal)
    // Generate a URL-friendly slug based on the meal title
    meal.slug = slugify(meal.title,  {lower: true})
    // Sanitize the cooking instructions to prevent XSS attacks
    meal.instructions = xss(meal.instruction)

    // Extract the file extension of the meal image
    const extension = meal.image.name.split(".").pop()
    // Construct the file name using the slug and extension
    const fileName = `${meal.slug}.${extension}`

    // Create a writable stream for the meal image
    const stream = fs.createWriteStream(`public/images/${fileName}`)
    // Convert the meal image to ArrayBuffer and then write it to the file
    const bufferedImage = await meal.image.arrayBuffer()
    stream.write(Buffer.from(bufferedImage), (error) => {
        if(error){
            throw new Error("Error saving image")
        }
    })

    // Update the image path in the meal object
    meal.image = `/images/${fileName}`

    // Prepare and execute the SQL statement to insert the meal record into the database
    db.prepare(
        `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
    ).run(meal);
}



