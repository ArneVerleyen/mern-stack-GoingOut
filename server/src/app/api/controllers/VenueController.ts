import { NextFunction, Request, Response } from 'express';

import { IVenue, Venue, venueSchema } from '../../models/mongoose';

class VenueController {
	
	index = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const venues = await Venue.find().sort({ _createdAt: -1 }).exec();
			return res.status(200).json(venues);
		} catch (err) {
			next(err);
		}
	};

	show = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;

			const venue = await Venue.findById(id);
			res.status(200).json(venue);
		} catch (err) {
			next(err);
		}
	};
}

export default VenueController;
