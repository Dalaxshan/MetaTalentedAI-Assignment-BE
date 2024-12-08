import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export interface UserModel extends Document {
  id: string;
  name: string;
  email: string;
}
