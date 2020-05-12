import { default as mongoose, Schema, Document } from 'mongoose';

interface IEvent extends Document {
	title: string,
	description: string,
	location: string,
	city: string,
	street: string,
	houseNumber: number,
	tags: string,
	category: string,
	picture: string,
	duration: number,
	price: number,
	date: Date,
	venue: string,
	_createdAt: number,
	_modifiedAt: number,
	_deletedAt: number,
}

const eventSchema: Schema = new Schema (
	{	
		title : {
			type: String,
			required: true,
			max: 128,
		},
		description: {
			type: String,
			required: true,
			max: 2056,
		},
		location: {
			type: String,
			required: true,
			max: 128,
		},
		street: {
			type: String,
			requiered: true,
			max: 128,
		},
		city:{
			type: String,
			required: true,
			max: 128,
		},
		houseNumber: {
			type: Number,
			required: false,
		},
		tags: {
			type: String,
			required: false,
			max: 2056,
		},
		category: {
			type: String,
			enum: ['Music','Seminar','Conference','Trade show', 'Workshop','Party','Gala','Food&Drink'],
		},
		picture: {
			type: String,
			required: false,
		},
		duration: {
			type: Number,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		date: {
			type: Date,
			required: true,
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

const Event = mongoose.model<IEvent>('event', eventSchema);

export {
	IEvent,
	eventSchema,
	Event,
}