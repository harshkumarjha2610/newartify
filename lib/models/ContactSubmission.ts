import mongoose, { Schema, model, models } from "mongoose";

const ContactSubmissionSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    consent: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactSubmission =
  models.ContactSubmission || model("ContactSubmission", ContactSubmissionSchema);

export default ContactSubmission;
