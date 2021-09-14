import { Router } from "express";
import sessionController from "./controllers/SessionController";
import UserController from "./controllers/UserController";
import RoleController from "./controllers/RoleController";
import PermissionController from "./controllers/PermissionController";
import ProductController from "./controllers/ProductController";

import { is } from "./midllewares/permission"

const router = Router();

// USERS
router.post("/users", UserController.create);
router.get("/users", UserController.index);
//SESSIONS
router.post("/sessions", sessionController.create);
// ROLES
router.post("/roles", RoleController.create);
router.get("/roles", RoleController.index);
// PERMISSIONS
router.post("/permissions", PermissionController.create);
router.get("/permissions", PermissionController.index)
// PRODUCTS
router.post("/products", is(["ROLE_ADMIN"]), ProductController.create);
router.get("/products", is(["ROLE_ADMIN", "ROLE_USER"]), ProductController.index);
router.post("/products/:id", is(["ROLE_ADMIN", "ROLE_USER"]), ProductController.show);


export { router };
