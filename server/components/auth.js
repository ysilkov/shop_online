import AuthMongoDB from "../components/authMongoDB.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};
class ErrorMessage{
   constructor(message){
      this.message = message;
      this.name = "Error"
   }
}
class Auth {
  static async createUser(fullName, email, password) {
    try {
      const candidate = await AuthMongoDB.findOne({ email });
      if (candidate) {
        throw new ErrorMessage(
          "User didn't registrant"
        );
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = await AuthMongoDB.create({
        fullName,
        email,
        password: hashPassword,
      });
      const token = generateAccessToken(user._id);
      return { token: token, email, fullName: user.fullName, id: user._id  };
    } catch (e) {
      throw new ErrorMessage(e);
    }
  }

  static async loginUser(email, password) {
    try {
      const user = await AuthMongoDB.findOne({ email });
      if (!user) {
        throw new ErrorMessage (`User ${email} didn't find`);
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
       throw new ErrorMessage("The password is not valid");
      }
      const token = generateAccessToken(user._id);
      return { token: token, email, fullName: user.fullName, id: user._id, phone: user.phone, address: user.address };
    } catch (e) {
      if(!e){
         throw new ErrorMessage("An error occurred");
      }
      throw new ErrorMessage(e);
    }
  }
  static async updateUser(fullName, email, password, id) {
    try {
      const hashPassword = bcrypt.hashSync(password, 7);
      const updatedUser = await AuthMongoDB.findOneAndUpdate(
        { _id: id },
        { fullName, email, password: hashPassword },
        { new: true }
      );
      return { email: updatedUser.email, fullName: updatedUser.fullName, message: "Profile data changed successfully" };
    } catch (e) {
      if (!e) {
        throw new ErrorMessage("An error occurred");
      }
      throw new ErrorMessage(e);
    }
  }
  static async addInfoToUser(phone, address, id) {
    try {
      const updatedUser = await AuthMongoDB.findOneAndUpdate(
        { _id: id },
        { phone, address },
        { new: true }
      );
      return { phone: updatedUser.phone, address: updatedUser.address, message: "Delivery data changed successfully" };
    } catch (e) {
      if (!e) {
        throw new ErrorMessage("An error occurred");
      }
      throw new ErrorMessage(e);
    }
  }
}

export default Auth;
