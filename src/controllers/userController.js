const userService = require('../services/userService');

class UserController {
   handleCreateUser = async (req, res) => {
      try {
         const user = await userService.createUser(req.body);
         return res.status(200).json(user);
      } catch (e) {
         return res.status(500).json({ message: e.message });
      }
   }
}

module.exports = new UserController();
