import { addProject } from '../use-cases';
import { Response, Request, NextFunction } from 'express';
import { auth } from '../middleware';
import { saveImages } from '../use-cases'
import { BadRequest } from '../errors'
const formidable = require('formidable')

const addProjectController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        auth(req);
        const form = formidable({
            multiples: true,
        });

        form.parse(req, async (err: any, fields: any, files: any) => {
            try {
                if (err) {
                    next(new BadRequest(err));
                    return;
                }
    
                if(!files.file || files.file.length < 1){
                    next(new BadRequest('0 files found'));
                    return;
                } 
                
                const urls = await saveImages(files.file);
        
                await addProject({
                    name: fields.name,
                    description: fields.description,
                    images: urls,
                    createdOn: Number(fields.createdOn),
                    modifiedOn: Number(fields.modifiedOn),
                });

                res.status(200).json({success: true});
            } catch(err) {
                next(err);
                return;
            }
        });

        //
    } catch(err) {
        next(err);
        return;
    }
}

export { addProjectController }
