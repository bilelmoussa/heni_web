import { Router } from 'express';
import { verifyOpenSessionController } from '../../controllers'

const router = Router();

router.post('/verifyOpenSession', (req, res) => {
    verifyOpenSessionController(req, res);
})

export { router as verifyOpenSession }