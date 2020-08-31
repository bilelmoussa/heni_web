const makeGetNewMessagesCount = (countNewMsgs: Function) => {
    return async () => {
        const newMsgsCount = await countNewMsgs();

        return newMsgsCount;
    }
}

export default makeGetNewMessagesCount;