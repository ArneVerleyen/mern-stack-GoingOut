import { NextFunction, Response, Request } from 'express';
import { Message, IMessage } from '../../models/mongoose';
import { loggers } from 'winston';

class MessageController {
	public index = async (req: Request, res: Response, next: NextFunction): Promise <any> => {
		const messages: Array <IMessage> = await Message.find().exec();
		return res.status(200).json({ messages });
	}

	public show = async (req: Request, res: Response, next: NextFunction): Promise <any> => {
		try {
		const { id } = req.params;
		const message: IMessage = await Message.findById(id).exec();

		return res.status(200).json( message );
		} catch (error) {
			console.log(error);
		}
	}
}

export default MessageController;