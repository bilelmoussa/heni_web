import { BadRequest } from '../../errors';

const idVerification = (checkId: Function) => {
    return async (id: string) => {
        const idValidation = checkId({
            id: id
        });

        if(idValidation) {
            throw new BadRequest('bad id');
        }
    }
}

export default idVerification;