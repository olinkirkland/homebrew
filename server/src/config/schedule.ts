import cron from 'node-cron';
import Blacklist from '../models/Blacklist';

export async function startScheduledTasks() {
    // Schedule a task to run every day at midnight
    cron.schedule('0 0 * * *', async () => {
        try {
            // Delete expired tokens from the blacklist
            await Blacklist.deleteMany({ expiresAt: { $lt: new Date() } });
            console.log('Expired tokens cleaned up');
        } catch (error) {
            console.error('Error during cleanup of expired tokens:', error);
        }
    });
}
