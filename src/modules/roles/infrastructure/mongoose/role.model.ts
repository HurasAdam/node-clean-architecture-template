import mongoose, { Document, Schema } from "mongoose";
import { PermissionType } from "../../constants/permissions";

export interface RoleDocument extends Document {
  name: string;
  permissions: Array<PermissionType>;
  iconKey: string;
  labelColor: string;
}

const roleSchema = {
  name: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
  },

  permissions: {
    type: [String],
    required: true,
    default: [],
  },
  iconKey: {
    type: String,

    required: true,
    default: "FaEye",
  },
  labelColor: {
    type: String,

    required: true,
    default: "blue",
  },
};

const schema = new Schema<RoleDocument>(roleSchema, {
  timestamps: true,
});

const RoleModel = mongoose.model<RoleDocument>("Role", schema);
export default RoleModel;
