import { Request, Response } from "express";
import { CreateUserDto } from "../dto/create-user.dto";
import { createUser } from "../service/user.service";

export const registerUser = async (req: Request, res: Response) => {
  const result = CreateUserDto.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ error: result.error.format() });
  }

  try {
    const user = await createUser(result.data);
    return res.status(201).json({ message: "User created", user });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
