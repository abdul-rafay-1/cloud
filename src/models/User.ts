import { PutCommand, GetCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../config/dynamodb";
import bcrypt from "bcryptjs";

export interface IUser {
  username: string;
  email: string;
  password: string;
}

export class UserModel {
  private tableName = "Users";

  async create(user: IUser): Promise<IUser> {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(user.password, 10);
    
    const params = {
      TableName: this.tableName,
      Item: {
        ...user,
        password: hashedPassword
      }
    };

    await docClient.send(new PutCommand(params));
    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const params = {
      TableName: this.tableName,
      Key: {
        email: email
      }
    };

    const result = await docClient.send(new GetCommand(params));
    return result.Item as IUser || null;
  }

  // Add more methods as needed
}

export default new UserModel();