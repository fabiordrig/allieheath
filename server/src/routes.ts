import { Request, Response, Router } from "express";
import multer from "multer";
import os from "os";
import { db } from "./db";

const router = Router();

const upload = multer({ dest: os.tmpdir() });

router.get("/users", (req: Request, res: Response) => {
  const users = db.prepare("SELECT * FROM users").all();

  res.json({
    users: users,
  });
});

router.post("/users", (req: Request, res: Response) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    res.sendStatus(400);
    return;
  }

  const validEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!validEmailRegex.test(req.body.email)) {
    res.status(400).send({
      error: "Invalid email",
    });
    return;
  }
  const dateOfBirth = !!req.body.dateOfBirth ? req.body.dateOfBirth : null;
  const phoneNumber = !!req.body.phoneNumber ? req.body.phoneNumber : null;

  if (
    db.prepare("SELECT * FROM users WHERE email = @email").get({
      email: req.body.email,
    })
  ) {
    res.status(400).send({
      error: "Email already exists",
    });
    return;
  }

  const user = db
    .prepare(
      "INSERT INTO users (first_name, last_name, email, date_of_birth, phone_number) VALUES (@firstName, @lastName, @email, @dateOfBirth, @phoneNumber)",
    )
    .run({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      dateOfBirth,
      phoneNumber,
    });

  res.json({
    id: user.lastInsertRowid,
  });
});

router.post(
  "/users/bulk",
  upload.single("file"),
  (req: Request, res: Response) => {
    const file = req.file;

    console.log(file);

    res.sendStatus(200);
  },
);

export default router;
