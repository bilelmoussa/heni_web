import { Router } from 'express';
import { addProjectController } from '../../controllers';

const router = Router();

router.post('/add-project', async (req, res, next) => {
    await addProjectController(req, res, next);
});

export { router as project }
