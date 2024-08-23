import items from '../data/items.json';
import { logger } from '../utils/logger';

/**
 * Gets an item by its slug.
 * @param {string} slug - The slug of the item.
 * @returns {Item} The item object.
 */
export async function getItemBySlug(slug: string) {
    const item = items.find((item) => item.slug === slug);
    if (!item) return logger.error(`Item with slug not found`, { slug });
    return item;
}
