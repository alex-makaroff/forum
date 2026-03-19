import fetch from "node-fetch";

const TELEGRAM_API = "https://api.telegram.org/bot";

export async function sendTelegramMessage(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set. Message skipped.");
    return false;
  }

  try {
    const response = await fetch(`${TELEGRAM_API}${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Telegram API Error: ${response.status} ${errorText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return false;
  }
}

export function formatBookingMessage(data: any): string {
  return `
<b>🆕 БРОНИРОВАНИЕ СТОЛА</b>

<b>Дата:</b> ${data.date}
<b>Время:</b> ${data.time}
<b>Гостей:</b> ${data.guests}

<b>Имя:</b> ${data.name}
<b>Телефон:</b> ${data.phone}
${data.comment ? `<b>Комментарий:</b> ${data.comment}` : ""}

<i>Источник: Website FORUM</i>
  `.trim();
}

export function formatOrderMessage(data: any): string {
  const itemsList = data.items
    .map(
      (item: any) =>
        `- ${item.name} ${item.variant ? `(${item.variant})` : ""} × ${item.quantity} — ${item.total} ₽`
    )
    .join("\n");

  const paymentMethodText = data.contact.paymentMethod === "cash" ? "Наличными курьеру" : "Картой курьеру";

  return `
<b>🥘 НОВЫЙ ЗАКАЗ</b>

<b>Имя:</b> ${data.contact.name}
<b>Телефон:</b> ${data.contact.phone}
${data.contact.address ? `<b>Адрес:</b> ${data.contact.address}` : ""}
<b>Оплата:</b> ${paymentMethodText}
${data.contact.utensilsCount > 0 ? `<b>Приборов:</b> ${data.contact.utensilsCount}` : ""}
${data.contact.comment ? `<b>Комментарий:</b> ${data.contact.comment}` : ""}

<b>Состав заказа:</b>
${itemsList}

<b>ИТОГО:</b> ${data.total} ₽

<i>Источник: Website FORUM</i>
  `.trim();
}
