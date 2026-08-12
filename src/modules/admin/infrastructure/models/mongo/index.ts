import { ObjectId } from "mongodb";
import mongoose, { Schema } from "mongoose";
import { compareValue, hashValue } from "../../../../../utils/bcrypt";

export interface AdminDocument extends mongoose.Document {
  _id: ObjectId;
  login: string;
  password: string;
  isActive: boolean;
  isSuperAdmin: boolean;
  mustChangePassword: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;

  comparePassword(value: string): boolean;
  omitPassword(): AdminWithoutPassword;
}

export type AdminWithoutPassword = Omit<AdminDocument, "password">;

const adminSchema = {
  login: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  password: {
    type: String,
    required: true,
  },

  mustChangePassword: {
    type: Boolean,
    default: true,
  },

  isActive: {
    type: Boolean,
    default: true,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },

  lastLogin: {
    type: Date,
    default: null,
  },
};

const schema = new Schema<AdminDocument>(adminSchema, {
  timestamps: true,
});

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
  const { password, ...admin } = this.toObject();

  return admin;
};

const AdminModel = mongoose.model<AdminDocument>("Admin", schema);

export default AdminModel;
