import { Context } from 'telegraf';

module.exports = async (ctx: Context) => {
  const message = `🔍 Bot bo'yicha yordam:
  
  /start - Botni qayta ishga tushirish
  /help - Yordam olish
  /menu - Asosiy menyu
  /settings - Sozlamalar
  
  Qo'shimcha yordam uchun: ☎️ Aloqa bo'limidan foydalaning.`;

  return ctx.reply(message);
};
