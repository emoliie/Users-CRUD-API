// controllers = ce que font les routes

const prisma = require("../config/prisma");
const { hashPassword, comparePassword } = require("../utils/bcrypt");

class UsersController {
  // INDEX : Read all users
  async index(req, res) {
    try {
      const users = await prisma.user.findMany(); // === SELECT * FROM User
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  // STORE : Create a new user
  async store(req, res) {
    const body = req.body;
    //console.log(body);
    try {
      const encryptedPassword = await hashPassword(body.password);
      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          password: encryptedPassword,
        },
      });

      return res.status(201).json(user);
    } catch (e) {
      //console.log(e);
      return res.status(500).json({ message: e.message });
    }
  }

  //SHOW : Read a specific user
  async show(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  // UPDATE : Modify a specific user
  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: body,
      });

      return res.status(200).json(updatedUser);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  // DELETE : Delete a specific user
  async delete(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(204).json();
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new UsersController();
