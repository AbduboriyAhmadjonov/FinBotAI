// // src/keyboards/main.js
// // const { Markup } = require('telegraf');
import { Markup } from 'telegraf';

// export const mainKeyboard = {
//   mainMenu: Markup.keyboard([
//     ['📋 Buyurtma berish', '🛒 Savatcha'],
//     ["ℹ️ Ma'lumot", '☎️ Aloqa'],
//   ]).resize(),

//   contactRequest: Markup.keyboard([
//     [Markup.button.contactRequest('📱 Telefon raqamni yuborish')],
//   ]).resize(),

//   removeKeyboard: Markup.removeKeyboard(),

//   inlineBackButton: Markup.inlineKeyboard([Markup.button.callback('◀️ Orqaga', 'back')]),
// };

export function mainKeyboard() {
  return Markup.keyboard([
    ['💰 Add Expense', '💸 Add Income'],
    ['📊 Reports', '📈 Budget'],
    ['⚙️ Settings', '❓ Help'],
  ])
    .resize()
    .selective();
}
