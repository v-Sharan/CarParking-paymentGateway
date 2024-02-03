import { connect } from "mongoose";

export const ConnectDB = (url: string) => {
  connect(url)
    .then(() => console.log("Database connected"))
    .catch((err: any) => console.log(err));
};
