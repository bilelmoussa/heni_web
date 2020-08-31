import { addUser } from '../use-cases';
import { Response, Request } from 'express';
import { guest } from '../middleware';
import {ADMIN_EMAIL, ADMIN_PASSWORD} from '../config'
import {getAllUsers} from '../data-access/user-db'

const addAdmin = async () => {
    try {
        const users = await getAllUsers();

        if(users.length === 0){
            await addUser({
                firstName: 'bilel',
                lastName: 'moussa',
                role: 1,
                email: ADMIN_EMAIL || 'admin@gmail.com',
                password: ADMIN_PASSWORD || 'secret',
                repeatPassword:  ADMIN_PASSWORD || 'secret',
                date: new Date()
            });
        }
    } catch (err) {
        console.log(err);
    }
}

addAdmin();

const addUserController = async (req: Request, res: Response) => {
    try {
        guest(req);

        await addUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            role: 0,
            email: req.body.email,
            password: req.body.password,
            repeatPassword:  req.body.repeatPassword,
            date: req.body.date
        });

        res.status(200).json({success: true});
    } catch (err) {
        res.status(err.status || 500).json({success: false, message: err.message})
    }
}

export { addUserController };