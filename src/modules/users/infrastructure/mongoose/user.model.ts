import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { compareValue, hashValue } from "../../../../utils/bcrypt";

export type UserWithoutPassword = Omit<UserDocument, "password">;
export interface UserDocument extends mongoose.Document {
  _id: ObjectId;
  name: string;
  surname: string;
  email: string;
  isActive: boolean;
  profilePicture?: string | null;
  password: string;
  mustChangePassword: boolean;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  favourites: mongoose.Types.ObjectId[];
  role: string;

  comparePassword(val: string): boolean;
  omitPassword(): UserWithoutPassword;
}

const userSchema = {
  name: { type: String, required: true, trim: true },
  surname: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  mustChangePassword: { type: Boolean, default: true },
  profilePicture: { type: String, default: null },
  role: { type: String, default: "ADMIN" },
  lastLogin: { type: Date, default: null },
  isActive: { type: Boolean, default: true },
};
const schema = new Schema<UserDocument>(userSchema);

schema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = hashValue(this.password);
  next();
});

schema.methods.comparePassword = function (value: string) {
  return compareValue(value, this.password);
};

schema.methods.omitPassword = function () {
  const { password, ...user } = this.toObject();
  return user;
};

const UserModel = mongoose.model<UserDocument>("User", schema);
export default UserModel;
