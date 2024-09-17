import User, { IUser } from '../models/User';
import { logger } from '../utils/logger';

/**
 * Fetches a user by their ID.
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<IUser | null>} - A promise that resolves to the user if found, otherwise null.
 */
export async function getUserById(id: string): Promise<IUser | null> {
    const user = await User.findById(id);
    return user || null;
}

/**
 * Fetches multiple users by their IDs.
 * @param {string[]} ids - An array of user IDs to fetch.
 * @returns {Promise<IUser[]>} - A promise that resolves to an array of users.
 */
export async function getUsersByIds(ids: string[]): Promise<IUser[]> {
    const users = await User.find({ id: { $in: ids } });
    return users;
}

/**
 * Deletes a user.
 * @param {IUser} user - The user to delete.
 * @returns {Promise<{ success: boolean, message?: string }>} - A promise that resolves to an object indicating success or failure.
 */
export async function deleteUser(user: IUser): Promise<{ success: boolean; message?: string }> {
    try {
        await User.deleteOne({ id: user.id });
        logger.info('User deleted', { id: user.id, username: user.username });
    }
    catch (error) {
        logger.error('Error deleting user', { id: user.id, username: user.username, error });
        return {
            success: false,
            message: 'An error occurred while deleting the user'
        };
    }

    return { success: true, message: 'User deleted' };
}

/**
 * Updates a user's profile.
 * @param {string} id - The ID of the user to update.
 * @param {Partial<IUser>} newProfile - The new profile data for the user.
 * @returns {Promise<IUser | null>} - A promise that resolves to the updated user if found, otherwise null.
 */
export async function updateProfile(
    id: string,
    newProfile: Partial<IUser>
): Promise<IUser | null> {
    /* ... */
    return null;
}