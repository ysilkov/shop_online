import Products from "./components/productsMongoDB.js";
import orderMongoDB from "./components/orderMongoDB.js";

class GetController {
  async products(req, res) {
    try {
      const products = await Products.find()
        .sort({ id: 1 })
        .limit(req.query.limit);
      return res.json(products);
    } catch (e) {
      return res.status(400).json({ message: `There are no products` });
    }
  }
  async allProducts(req, res) {
    try {
      const products = await Products.find();
      return res.json(products);
    } catch (e) {
      return res.status(400).json({ message: `There are no products` });
    }
  }
  async allOrders(req, res){
    const id = req.query.id;
    try{
        const orders = await orderMongoDB.find({id: id})
       if(orders.length < 1){
            return res.json({ message: `There are no orders` })
        }else{
            return res.json({orders: orders})
        } 
    } catch (e) {
        return res.status(400).json({ message: `Some problem occurred while fetching orders` });
    }
}
}
export default new GetController();
