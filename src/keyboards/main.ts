import { Markup } from 'telegraf';

export function mainKeyboard() {
  return Markup.keyboard([
    ['💰 Add Expense', '💸 Add Income'],
    ['📊 Reports', '📈 Budget'],
    ['⚙️ Settings', '❓ Help'],
  ])
    .resize()
    .selective();
}

export function contactRequestKeyboard() {
  return Markup.keyboard([[Markup.button.contactRequest('📱 Share Phone Number')]]).resize();
}

export function removeKeyboard() {
  return Markup.removeKeyboard();
}

export function backButton() {
  return Markup.inlineKeyboard([Markup.button.callback('◀️ Back', 'back')]);
}
