import { NextFunction, Request, Response } from 'express';

import { IEvent, Event, eventSchema } from '../../models/mongoose';

class EventController {
	
	index = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const events = await Event.find().sort({ _createdAt: -1 }).exec();
			return res.status(200).json(events);
		} catch (err) {
			next(err);
		}
	};

	show = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const event = await Event.findById(id);
			res.status(200).json(event);
		} catch (err) {
			next(err);
		}
	};
}

export default EventController;
