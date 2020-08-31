export type File = {
    id: string,
};

export type Files = File[];

export interface CloudinaryInitialStateState {
    uploadedPhotos: Files
}

export interface CloudinaryStateAction {
    uploadedPhoto: File
}

export const UPDATE_UPLOADED_PHOTO = 'UPDATE_UPLOADED_PHOTO';

interface IUploadPhotoAction {
    type: typeof UPDATE_UPLOADED_PHOTO;
    payload: CloudinaryStateAction
}

export type CloudinaryActionTypes = IUploadPhotoAction;