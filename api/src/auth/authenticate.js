import dotenv from "dotenv";
import EmployeeModel from "../models/employee.js";
import { passwordEncryptor, passwordchecker } from "../helper/encrypted.js";
import jwt from "jsonwebtoken";
dotenv.config({ path: "../../.env" });

const mapEmployeeToResponse = (employee) => {
  const { department, first_name, id, role, email, profileImage, phone_num } = employee;
  return { department, first_name, id, role, email, profileImage,phone_num };
};

export const authenticate = async (req, res) => {
  const { email, password } = req.body;
  console.log(password, email);
  if (
    email === undefined ||
    password === undefined ||
    email === null ||
    password === null
  ) {
    return res
      .status(400)
      .json({
        success: false,
        data: null,
        message: `Email and password is required`,
      });
  }
  try {
    const existingEmployee = await EmployeeModel.employeeIsAvailable(email);
    const isCorrect = passwordchecker(password, existingEmployee.password);
    if (!isCorrect)
      return res
        .status(400)
        .json({
          success: false,
          data: null,
          message: `Wrong email or password`,
        });

    const accessToken = accessTokenGenerator(existingEmployee);
    const refreshToken = RefreshTokenGenerator(existingEmployee);
    const employeeData = mapEmployeeToResponse(existingEmployee);
    return res
      .status(200)
      .json({
        success: true,
        data: { ...employeeData, accessToken, refreshToken },
        message: `your token has been successfully generated`,
      });
  } catch (error) {
    return res
      .status(400)
      .json({ succes: false, data: null, message: `Error occured ${error}` });
  }
};

export const accessTokenGenerator = (employee) => {
  return jwt.sign({ employee }, process.env.SERVER_KEY, {
    expiresIn: "1h",
  });
};

export const RefreshTokenGenerator = (employee) => {
  return jwt.sign({ employee }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};
export const tokenRefresh = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(400)
      .json({
        success: false,
        data: null,
        message: "Refresh token is required",
      });
  }

  try {
    const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const { employee } = data;

    const newAccessToken = accessTokenGenerator(employee);
    const employeeData = mapEmployeeToResponse(existingEmployee);

    return res.status(200).json({
      success: true,
      data: { ...employeeData, accessToken: newAccessToken },
      message: "Access token has been refreshed",
    });
  } catch (err) {
    return res.status(403).json({
      success: false,
      data: null,
      message: `Invalid refresh token ${err}`,
    });
  }
};
