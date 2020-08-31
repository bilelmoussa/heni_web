export type MessageType = {
    name: string,
    email: string,
    message: string,
    createdOn: number,
}

/**
 * Message
 */
export default class Message {
  public name: string;
  public email: string;
  public message: string;
  public createdOn: number;
  public seen: boolean;
  static error: string;

  /**
   * message class constructor
   * @param {MessageType} MessageInfo
   * @param {Function} messageValidate
   */
  constructor(
      MessageInfo: MessageType,
      messageValidate: Function,
  ) {
    this.name = MessageInfo.name
    this.email = MessageInfo.email;
    this.message = MessageInfo.message;
    this.seen = false;
    this.createdOn = MessageInfo.createdOn;

    Message.error = messageValidate({
      name: this.name,
      email: this.email,
      message: this.message,
      seen: this.seen,
      createdOn: this.createdOn,
    });

    if (Message.error) throw new Error(Message.error);

  }
}
