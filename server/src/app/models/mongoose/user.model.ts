import { default as mongoose, Schema, Document } from 'mongoose';
import { default as bcrypt } from 'bcrypt';
import { loggers } from 'winston';

interface ILocalProvider {
	password: string;
}

interface IFacebookProvider {
	id: string;
	token: string;
}

interface IProfile {
	firstName: string;
	lastName: string;
	avatar: string;
}

interface IUser extends Document {
	email: string;
	_createdAt: number;
	_modifiedAt: number;
	_deletedAt: number;

	localProvider?: ILocalProvider;
	facebookProvider?: IFacebookProvider;

	role: string;
	profile: IProfile;
}

const userSchema: Schema = new Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		_createdAt: {
			type: Number,
			required: true,
			default: Date.now(),
		},
		_modifiedAt: {
			type: Number,
			required: false,
			default: null,
		},
		_deletedAt: {
			type: Number,
			required: false,
			default: null,
		},
		localProvider: {
			password: {
				type: String,
				required: false,
			}
		},
		facebookProvider: {
			id: {
				type: String,
				required: false,
			},
			token: {
				type: String,
				required: false,
			},
		},
		role: {
			type: String,
			enum: ['user', 'administrator'],
			default: 'user',
		},
		profile: {
			firstName: String,
			lastName: String,
			avatar: String,
		}
	}
);

userSchema.pre('save', function (next){
	const user : IUser = this as IUser;

	if (!user.isModified('localProvider.password'))
	return next();
	try {
		return bcrypt.genSalt(10, (errSalt, salt) => {
			if (errSalt) throw errSalt;

			bcrypt.hash(user.localProvider.password, salt, (errorHash, hash) => {
				if (errorHash) throw errorHash;

				user.localProvider.password = hash;
				return next();
			}); 
		});
	} catch (error) {
		return next(error);
	}
});

const User = mongoose.model<IUser>('user', userSchema);

export {
	IUser,
	User,
	userSchema,
}