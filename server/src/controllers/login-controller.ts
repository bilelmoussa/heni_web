import { makeLoginVerify } from '../use-cases';
import { Response, Request } from 'express';
import { logIn, logOut } from '../shared/auth';
import { guest, auth } from '../middleware';

const loginController = async (req: Request, res: Response) => {
    try {
        guest(req);

        const user = await makeLoginVerify({email: req.body.email, password: req.body.password});

        logIn(req, user.id, user.email, user.fullName);

        res.status(200).json({success: true, fullName: user.fullName, email: user.email});
    } catch (err) {
        console.log(err);
        res.status(err.status || 500).json({success: false, message: err.message});
    }
}

const logOutController = async (req: Request, res: Response) => {
    try {
        auth(req);

        await logOut(req, res);
  
        res.status(200).json({success: true});
    } catch (err) {
        res.status(err.status || 500).json({success: false, message: err.message});
    }
}
  

export { loginController, logOutController };