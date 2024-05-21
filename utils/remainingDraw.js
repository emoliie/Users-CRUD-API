const prisma = require("../config/prisma");

async function resetRemainingDraw() {
  const users = await prisma.user.findMany();
  const today = Date.now(); // me renvoie la date d'aujourd'hui en ms
  //console.log(today);

  users.forEach(async (user) => {
    let lastDraw = new Date(user.lastDraw).getTime();
    // console.log(lastDraw + 8.64e7);

    if (lastDraw + 8.64e7 <= today) { // dernier draw + 24h <= date d'aujourd'hui
      const reset = await prisma.user.update({
        where: { id: user.id },
        data: {
          remainingDraw: 5,
          canDraw: true,
          lastDraw: null,
        },
      });
      
    }

    //console.log(user);
  });
}

module.exports = { resetRemainingDraw };
