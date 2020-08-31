import { Router } from 'express';
import { messageController, messagesCountController, deleteMessageController, updateSeenMessageController, newMessagesCountController } from '../../controllers';

const router = Router();

router.post('/fetch-messages', async (req, res) => {
    await messageController(req, res);
})

router.post('/fetch-messages-count', async (req, res) => {
    await messagesCountController(req, res);
})

router.post('/delete-message', async (req, res) => {
    await deleteMessageController(req, res);
})

router.post('/update-seen-message', async (req, res) => {
    await updateSeenMessageController(req, res);
})

router.post('/fetch-new-messages-count', async (req, res) => {
    await newMessagesCountController(req, res);
})

export { router as message }
