import { Response, Request } from 'express';
import { auth } from '../middleware';

const getUserInfoController = async (req: Request, res: Response) => {
    try {
        auth(req);

        console.log(req.session);

        res.status(200).json({success: true});
    } catch (err) {
        res.status(err.status || 500).json({success: false, message: err.message});
    }
}

export { getUserInfoController };