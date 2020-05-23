import mongoose, { Schema, Document, PaginateModel } from 'mongoose';
import { default as mongoosePaginate } from 'mongoose-paginate';
import { default as slug } from 'slug';
import { IUser } from './user.model';
import { IEvent } from './event.model';

interface IAgenda extends Document {
	
	_userId: IUser['_id'];
	
	_eventIds: Array<IEvent['_id']>;
	slug: string;
	

  _createdAt: number;
  _modifiedAt: number;
  _deletedAt: number;

  slugify(): void;
}

interface IAgendaModel extends PaginateModel<IAgenda> {}

const agendaSchema: Schema = new Schema(
  {
		_userId: {
			type: Schema.Types.ObjectId,
			ref:'User',
			required: true,
		},
		_eventIds:{
			type:[ Schema.Types.ObjectId],
			ref: 'Event',
			required: false,
		},
		slug: {
			type: String,
			required: true,
			lowercase: true,
			unique: false,
		},
    _createdAt: { type: Number, required: true, default: Date.now() },
    _modifiedAt: { type: Number, required: false, default: null },
    _deletedAt: { type: Number, required: false, default: null },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

agendaSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

agendaSchema.pre<IAgenda>('validate', function(next) {
  if (!this.slug) {
    this.slugify();
  }
  return next();
});

agendaSchema.virtual('event', {
  ref: 'Event',
  localField: '_eventIds',
  foreignField: '_id',
  justOne: false,
});

const Agenda = mongoose.model<IAgenda, IAgendaModel>(
  'Agenda',
  agendaSchema,
);

export { IAgenda, Agenda };
