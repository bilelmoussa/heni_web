import { Router } from 'express';
import { addUserController } from '../../controllers';

const router = Router();

router.post('/register', async (req, res) => {
    await addUserController(req, res);
}); 

export { router as register }
