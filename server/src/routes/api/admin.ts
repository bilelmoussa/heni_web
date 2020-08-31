import { Router } from 'express';
import { getUserInfoController} from '../../controllers';

const router = Router();

router.post('/getUserInfo', async (req, res) => {
  await getUserInfoController(req, res);
})

export { router as admin }
