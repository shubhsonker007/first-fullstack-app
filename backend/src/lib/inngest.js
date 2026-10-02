import { Inngest } from "inngest";
import mongoose from "mongoose";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "first-fullstack-app" });

const syncUser = inngest.createFunction(
  {
    id: "sync-user",
    triggers: {
      event: "clerk/user.created",
    },
  },
  async ({ event }) => {
    console.log(DB_URL);
    await mongoose.connect(DB_URL);

    const { id, email_addresses, first_name, image_url, last_name } =
      event.data;

    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      profileImage: image_url,
    };

    await User.create(newUser);
  },
);

const deleteUserFromDB = inngest.createFunction(
  {
    id: "delete-user-from-db",
    triggers: {
      event: "clerk/user.deleted",
    },
  },
  async ({ event }) => {
    console.log(DB_URL);
    await mongoose.connect(DB_URL);

    const { id } = event.data;

    await User.deleteOne({ clerkId: id });
  },
);

export const functions = [syncUser, deleteUserFromDB];
