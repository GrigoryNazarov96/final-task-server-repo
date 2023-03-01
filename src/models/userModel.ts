import mongoose, { Model, Types } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser {
  _id: string | Types.ObjectId;
  name: string;
  email: string;
  role: 'user' | 'admin';
  password: string;
  isBlocked: boolean;
  registeredAt: Date;
}

export interface IUserMethods {
  correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
}

export type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    name: {
      type: String,
      required: [true, 'Please enter your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide the password'],
      select: false,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

userSchema.pre('save', async function (next): Promise<void> {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

userSchema.method(
  'correctPassword',
  async function (candidatePassword: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
  },
);

const User = mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
