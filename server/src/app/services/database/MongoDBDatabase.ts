import { default as mongoose, Connection } from 'mongoose';
import { default as faker } from 'faker';
// eigen imports
import { ILogger } from "../logging";
import { IConfig } from "../Config";
import { IMessage, Message, IUser, User, Post, IPost } from '../../models/mongoose';

class MongoDBDatabase {
	private config: IConfig;
	private logger: ILogger;
	private db: Connection;

	private users: Array <IUser>;
	private posts: Array <IPost>;

	constructor (logger: ILogger, config: IConfig) {
		this.logger = logger;
		this.config = config;
		
		this.posts = [];
		this.users = [];
		
	};

	public connect (): Promise <any> {
		return new Promise <any> ((resolve, reject) => {
			mongoose.connect(this.config.mongoDBConnection,{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			})
			.then(data => {
				this.db = mongoose.connection;

				this.logger.info('Connected to MongoDB database', {})

				resolve(true);
			})
			.catch(error => {
				this.logger.error('Can\'t connect to the database!', error);
				reject(error);
			});
		});
	};

	public disConnect (): Promise <any> {
		return new Promise <any> ((resolve, reject) => {
			this.db.close(true)
			.then(data => {
				resolve(data);
			})
			.catch(error => {
				this.logger.error('Can\'t disconnect from the database!', error);
				reject(error);
			});
		});
	};

	private messageCreate = async (body: string ) => {
		const message = new Message({ body });
		
		try {
			const newMessage = await message.save();

			this.logger.info(`Message created with id ${newMessage._id}`, {})
		}
		catch(error) {
			this.logger.error('An error occurred whilst generating a message!', error);
		}

	};

	private createMessages = async () => {
		await Promise.all([
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
			(async () => this.messageCreate(faker.lorem.paragraph()))(),
		]);
	};

	private userCreate = async (email: string, password: string, 
		role: string, firstName: string, lastName: string, avatar: string) => {
			const userDetail = {
				email,
				localProvider: {
					password
				},
				role,
				profile: {
					firstName,
					lastName,
					avatar
				}
		};

		const user: IUser = new User(userDetail);

		try {
			const createdUser = await user.save();
			this.users.push(createdUser);

			this.logger.info(`User created with id: ${createdUser._id}.`, {});
		} catch (err) {
			this.logger.error(`An error occurred when creating a user ${err}!`, {err});
		}
	};

	private createUsers = async () => {
		const promises = [];

		this.userCreate(
			'arneverl@student.arteveldehs.be',
			'2468',
			'administrator',
			'Arne',
			'Verleyen',
			'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/28379571_1337089683058557_2119606842872933977_n.jpg?_nc_cat=107&_nc_sid=85a577&_nc_ohc=tW5Xsq3L3S0AX_V1PZn&_nc_ht=scontent-bru2-1.xx&oh=1defea6efe998620d8a584428fb404ba&oe=5EDD6A4E'
		);

		for (let i = 0; i < 30; i++) {
			const gender = Math.round(Math.random());
			promises.push(this.userCreate(faker.internet.email(), 'nmdgent007', 'user', faker.name.firstName(gender),
			faker.name.lastName(gender), faker.internet.avatar()));
		}

		await Promise.all(promises)
	};

	private postCreate = async (
		title: string,
		synopsis: string,
		body: string
		) => {
			const postDetail = {
				title,
				synopsis,
				body
		};

		const post: IPost = new Post(postDetail);

		try {
			const createdPost = await post.save();
			this.posts.push(createdPost);

			this.logger.info(`Post created with id: ${createdPost._id}.`, {});
		} catch (err) {
			this.logger.error(`An error occurred when creating a post ${err}!`, {err});
		}
	};

	private createPosts = async () => {
		const promises = [];

			for (let i = 0; i < 30; i++) {
				promises.push(this.postCreate(
					faker.lorem.sentence(),
					faker.lorem.paragraph(),
					`<p>${ faker.lorem.paragraphs(10, '</p><p>') }</p>`,
				)
			);
		}

		await Promise.all(promises)
	};
	

	

	public seed = async () => {
		const messages = Message.estimatedDocumentCount().exec()
		.then(async count => {
			if (count === 0) {
				await this.createMessages();
			} 
			return Message.find().exec();
		});
		// console.log(messages);
		this.users = await User.estimatedDocumentCount().exec().then(async (count) => {
			if (count === 0) {
				await this.createUsers();
			}
			return User.find().exec()	
		});

		this.posts = await Post.estimatedDocumentCount().exec().then(async (count) => {
			if (count === 0) {
				await this.createPosts();
			}
			return Post.find().exec()	
		});
	};
}

export default MongoDBDatabase;