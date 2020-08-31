import { BadRequest } from '../errors'

type args = {
    uploadImage: (image: any) => Promise<any>
}

const makeSaveImages = ({uploadImage}: args) => {
    return async (files: any[]) => {
        if(files.length > 3) {
            throw new BadRequest('max Files length is 3');
        }
    
        const urls = await Promise.all(
            files.map(async (file) => {
                const res = await uploadImage(file);
    
                return {src: res.url}
            })
        )
            
        return urls;
      
    }
}

export default makeSaveImages;
