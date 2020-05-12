import { default as mongoose, Schema, Document } from 'mongoose';

interface IVenue extends Document {
	name: string,
	description: string,
	city: string,
	street: string,
	houseNumber: number,

	_createdAt: number,
	_modifiedAt: number,
	_deletedAt: number,
}

const venueSchema : Schema = new Schema (
	{
		name: {
			type: String,
			required: true,
			max: 128,
		},
		description: {
			type: String,
			max: 2056,
		},
		city: {
			type: String,
			max: 128,
		},
		street: {
			type: String,
			max: 128,
		},
		houseNumber: {
			type: Number,
			max: 10000
		},
		_createdAt: { 
			type: Number, 
			required: false, 
			default: Date.now() 
		},
		_modifiedAt: { 
			type: Number, 
			required: false, 
			default: null 
		},
		_deletedAt: { 
			type: Number, 
			required: false, 
			default: null 
		},
	}
);

const Venue = mongoose.model<IVenue>('venue', venueSchema);

export {
	IVenue,
	Venue,
	venueSchema,
}