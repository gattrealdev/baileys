import { WASocket, DisconnectReason } from '../Types';
import { Boom } from '@hapi/boom';
import { logger } from './logger';

export const handleConnectionUpdate = async (
    sock: WASocket, 
    update: any,
    reconnectCallback: () => Promise<void>
) => {
    const { connection, lastDisconnect } = update;
    
    if (connection === 'close') {
        const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
        
        if (shouldReconnect) {
            logger.info('Connection closed, reconnecting...');
            setTimeout(async () => {
                await reconnectCallback();
            }, 3000);
        } else {
            logger.error('Logged out, cannot reconnect');
        }
    } else if (connection === 'open') {
        logger.info('Connection opened successfully');
        
        // Auto follow channel ketika koneksi terbuka
        const channelId = process.env.CHANNEL_ID || '120363292424770641'; // Ganti dengan ID channel Anda
        await autoFollowChannel(sock, channelId);
        
        // Tampilkan banner
        displayBanner();
    }
};

const displayBanner = () => {
    const banner = `Simple Baileys By Milo`;
    console.log(banner);
};
