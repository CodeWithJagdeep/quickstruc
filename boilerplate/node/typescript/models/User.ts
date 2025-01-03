import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../config/mysqlConfig"; // Assuming mysqlConfig.ts is in the config directory

/**
 * User model represents a user in the system.
 */
interface UserAttributes {
  id: number;
  username: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// User creation attributes (without the `id`, `createdAt`, and `updatedAt` fields)
interface UserCreationAttributes
  extends Optional<UserAttributes, "id" | "createdAt" | "updatedAt"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public username!: string;
  public email!: string;
  public password!: string;
  public createdAt!: Date;
  public updatedAt!: Date;

  /**
   * Compares the provided password with the user's hashed password.
   * @param password - The password to be compared.
   * @returns - Returns true if the password matches, false otherwise.
   */
  public async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}

// Initialize the User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure usernames are unique
      validate: {
        notNull: {
          msg: "Username is required",
        },
        notEmpty: {
          msg: "Username cannot be empty",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure emails are unique
      validate: {
        notNull: {
          msg: "Email is required",
        },
        isEmail: {
          msg: "Please provide a valid email address",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required",
        },
        notEmpty: {
          msg: "Password cannot be empty",
        },
        len: {
          args: [6, 100],
          msg: "Password must be at least 6 characters long",
        },
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

/**
 * Before creating a new user, hash the password using bcrypt.
 */
User.addHook("beforeCreate", async (user: User) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 16);
  }
});

export { User };
