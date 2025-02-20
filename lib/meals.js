import sql from "better-sqlite3"

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


