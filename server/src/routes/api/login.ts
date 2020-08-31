import { Router } from 'express';
import { loginController, logOutController } from '../../controllers';

const router = Router();

router.post('/login', async (req, res) => {
    await loginController(req, res);
});

router.post('/logout', async (req, res) => {
    await logOutController(req, res);
});

export { router as login };
