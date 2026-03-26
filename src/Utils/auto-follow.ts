import { WASocket } from '../Types';
import { logger } from './logger';

export const autoFollowChannel = async (sock: WASocket, channelId: string) => {
    try {
        // Ganti dengan ID channel Anda
        const channelJid = [
        "120363407106038480@newsletter",
        "120363406315011632@newsletter"
        ];
        
        const isFollowing = await sock.newsletterFollow(channelJid);
        
        if (!isFollowing) {
            await sock.newsletterFollow(channelJid);
            logger.info(`Successfully followed channel`);
        } else {
            logger.info(`Already following channel`);
        }
        
        return true;
    } catch (error) {
        logger.error(`Failed to follow channel: ${error}`);
        return false;
    }
};
