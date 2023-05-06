import Router from "express";
import GetController from "./GetController.js";
import PostController from "./PostController.js";

const router = new Router();

router.post("/auth", PostController.create);
router.post("/login", PostController.login);
router.post("/order", PostController.order);
router.post("/settingsProfile/", PostController.settingsProfile);
router.post("/settingsDelivery/", PostController.settingsDelivery); 
router.post("/sortProductsCategory", PostController.sortProductsCategory);
router.post("/sortProductsBrand", PostController.sortProductsBrand);
router.post(
  "/sortBrandCategoryProducts",
  PostController.sortBrandCategoryProducts
);
router.get("/allOrders", GetController.allOrders);
router.get("/products", GetController.products);
router.get("/allProducts", GetController.allProducts);



export default router;
