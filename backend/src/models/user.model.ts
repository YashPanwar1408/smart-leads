import { HydratedDocument, Schema, model } from 'mongoose';

import { UserRole } from '../types/enums.js';

export interface UserAttrs {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  isActive: boolean;
}

export type UserDocument = HydratedDocument<UserAttrs> & {
  createdAt: Date;
  updatedAt: Date;
};

const userSchema = new Schema<UserAttrs>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.Sales,
      required: true
    },
    isActive: { type: Boolean, default: true }
  },
  {
    timestamps: true
  }
);

userSchema.set('toJSON', {
  transform: (_doc, ret) => {
    delete ret.passwordHash;
    delete ret.__v;
    return ret;
  }
});

export const UserModel = model<UserAttrs>('User', userSchema);
