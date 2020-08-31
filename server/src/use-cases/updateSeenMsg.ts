import { makeIdValidation } from '../validation';

const makeUpdateSeenMsg = (updateSeenMsg: Function) => {
  return async (ids: any) => {

      await ids.forEach((id: any) => {
        makeIdValidation(id);
        updateSeenMsg(id);
      })
    
      return {updated: true};
  };
};

export default makeUpdateSeenMsg;