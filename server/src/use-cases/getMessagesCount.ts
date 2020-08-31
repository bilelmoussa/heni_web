const makeGetMessagesCount = (countMsgs: Function) => {
    const getMsgs = async () => {
        const numbers = await countMsgs();

        return numbers;
    }

    return getMsgs;
}

export default makeGetMessagesCount;