import { CloudinaryInitialStateState, UPDATE_UPLOADED_PHOTO, CloudinaryActionTypes } from './types';

const initialState: CloudinaryInitialStateState = {
    uploadedPhotos: []
}

export function cloudinaryReducer(
    state = initialState,
    action: CloudinaryActionTypes
): CloudinaryInitialStateState {
    switch(action.type) {
        case UPDATE_UPLOADED_PHOTO: {
            let photoIndex = -1;

            const updatedPhotos = state.uploadedPhotos.map((photo, index) => {
                if (photo.id === action.payload.uploadedPhoto.id) {
                    photoIndex = index;
                    return { ...photo, ...action.payload.uploadedPhoto };
                }

                return photo;
            });

            let returnedVal = photoIndex !== -1 ? updatedPhotos : [action.payload.uploadedPhoto, ...updatedPhotos]

            return {
                uploadedPhotos: returnedVal
            };
        }
        default: 
            return state;
    }
}