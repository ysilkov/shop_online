import Auth from "./components/auth.js";
import Order from "./components/order.js";
import Products from "./components/productsMongoDB.js";

class PostController {
  async create(req, res) {
    try {
      const { fullName, email, password } = req.body;
      const auth = await Auth.createUser(fullName, email, password);
      return res.json({
        fullName: auth.fullName,
        email: auth.email,
        token: auth.token,
        id: auth.id
      });
    } catch (e) {
      return res.status(500).json(e.message);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const {
        token,
        email: userEmail,
        fullName,
        id,
        phone,
        address
      } = await Auth.loginUser(email, password);
      return res.json({ token, email: userEmail, fullName, id, phone: phone, address: address });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
  async settingsProfile(req, res){
    try {
      const { fullName, email, password, id } = req.body;
      const updateProfile = await Auth.updateUser(fullName, email, password, id);
      return res.json({ email: updateProfile.email, fullName: updateProfile.fullName, message: updateProfile.message });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
  async settingsDelivery(req, res){
    try {
      const { phone, address, id } = req.body;
      const updateProfile = await Auth.addInfoToUser(phone, address, id );
      return res.json({ phone: updateProfile.phone, address: updateProfile.address, message: updateProfile.message });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
  async order(req, res) {
    try {
      const { id, email, fullName, phone, delivery, address, order, timeCreate } = req.body;
      const orderProducts = await Order.createOrder(
        id,
        email,
        fullName,
        phone,
        delivery,
        address,
        order,
        timeCreate
      );
      return res.json({
        message: `You have placed an order for items. You order number ${orderProducts._id}.`,
      });
    } catch (e) {
      return res.status(400).json(e.message);
    }
  }
  
  async sortProductsCategory(req, res) {
    try {
      const { category } = req.body;
      const products = await Products.find({ category: category }).limit(
        req.query.limit
      );
      return res.json(products);
    } catch (e) {
      return res.status(400).json({ message: `There are no products` });
    }
  }
  async sortProductsBrand(req, res) {
    try {
      const { brand } = req.body;
      const products = await Products.find({ brand: brand }).limit(
        req.query.limit
      );
      return res.json(products);
    } catch (e) {
      return res.status(400).json({ message: `There are no products` });
    }
  }
  async sortBrandCategoryProducts(req, res) {
    try {
      const { brand, category } = req.body;
      const products = await Products.find({ brand: brand })
        .sort({ category: 1 })
        .find({ category: category })
        .limit(req.query.limit);
      return res.json(products);
    } catch (e) {
      return res.status(400).json({ message: `There are no products` });
    }
  }
}

export default new PostController();
