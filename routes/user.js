import { createUser, getUser } from "../controllers/userController";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const userRouter = (router) => {
  router.post("/users", upload.single("photo"), createUser);

  router.get("/users/:id(\\d+)", getUser);
};

export default userRouter;
