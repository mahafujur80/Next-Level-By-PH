import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../../config";

const loginUserIntoApp = async (payload: {
  email: string;
  password: string;
}) => {
  const { email, password } = payload;
  // first check if the user exits --> done
  // if user password match ---> done
  // if user status active ---> done
  // if pass and all then generate jwt token
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email = $1
    `,
    [email],
  );

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);
  delete user.rows[0].password;

  if (user.rowCount === 0) {
    throw new Error("Invalid Credentials");
  } else if (!matchPassword) {
    throw new Error("Invalid Credential Input");
  } else if (!user.rows[0].is_active) {
    throw new Error("Access Denied");
  }

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    is_active: user.rows[0].is_active,
    role: user.rows[0].role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwtSecret, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(jwtPayload, config.refresh_secret, {
    expiresIn: "10d",
  });

  return {
    accessToken,
    refreshToken,
    user: user.rows[0],
  };
};

const generateAccessToken = async (token: string) => {
  // console.log(token, "token");
  
  if (!token) {
    throw new Error("unauthorize access")
  }

  const decoded = jwt.verify(token, config.refresh_secret) as JwtPayload;
  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1
    `,
    [decoded.email],
  );


  if (user.rowCount === 0) {
    throw new Error("user not found")
  } else if (!user.rows[0].is_active) {
    throw new Error("unauthorize access forbidden")
  }

   const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    is_active: user.rows[0].is_active,
    role: user.rows[0].role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwtSecret, {
    expiresIn: "1h",
  });

  return {accessToken}
};

export const authService = {
  loginUserIntoApp,
  generateAccessToken,
};
