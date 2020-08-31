import { isLoggedIn } from '../shared/auth';
import { Response, Request } from 'express';

const verifyOpenSessionController = (req: Request, res: Response) => {
    if(isLoggedIn(req)){
        res.status(200).json({loggedIn: true, email: req.session?.email, fullName: req.session?.fullName});
    }else{
        res.status(200).json({loggedIn: false});
    }
}

export { verifyOpenSessionController };