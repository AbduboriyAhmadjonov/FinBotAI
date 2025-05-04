import { Context } from 'telegraf';
import { Op } from 'sequelize';
import User from '../../db/models/user.model.js';

interface AdminContext extends Context {
  user?: {
    isAdmin: boolean;
  };
}

export async function statsCommand(ctx: AdminContext) {
  if (!ctx.user?.isAdmin) {
    return ctx.reply('This command is for admins only.');
  }

  try {
    const totalUsers = await User.count();
    const todayUsers = await User.count({
      where: {
        createdAt: {
          [Op.gte]: new Date(new Date().setHours(0, 0, 0, 0)),
        },
      },
    });
    const activeUsers = await User.count({
      where: {
        lastActive: {
          [Op.gte]: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    });

    const message = `📊 Statistics:

👥 Total users: ${totalUsers}
🆕 New users today: ${todayUsers}
✅ Active users (24h): ${activeUsers}`;

    return ctx.reply(message);
  } catch (error) {
    console.error('Error getting stats:', error);
    return ctx.reply('Failed to get statistics.');
  }
}

export default statsCommand;
