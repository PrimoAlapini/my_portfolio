export function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function sanitizeReplyHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/ on\w+\s*=\s*(["']).*?\1/gi, '')
    .replace(/javascript:/gi, '')
}

export function replyEmailTemplate(content: string, recipientName: string) {
  return `
    <div style="margin:0;padding:32px 16px;background:#f1f5f2;font-family:Arial,sans-serif;color:#243126;">
      <div style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 8px 28px rgba(51,102,59,.12);">
        <div style="padding:30px 32px;background:#33663b;text-align:center;">
          <div style="width:54px;height:54px;margin:0 auto 14px;border-radius:50%;background:#f4b400;color:#33663b;font-size:28px;line-height:54px;">✦</div>
          <div style="color:#ffffff;font-size:21px;font-weight:700;">The Rezah</div>
          <div style="margin-top:6px;color:#dcebdd;font-size:13px;">Développement web & solutions digitales</div>
        </div>
        <div style="padding:34px 32px;line-height:1.7;font-size:15px;">
          <p style="margin:0 0 22px;">Bonjour ${escapeHtml(recipientName)},</p>
          ${content}
          <p style="margin:28px 0 0;">Cordialement,<br><strong style="color:#33663b;">Rezah</strong></p>
        </div>
        <div style="padding:18px 32px;background:#f8faf8;color:#708073;text-align:center;font-size:12px;">
          Ce message vous est envoyé depuis le portfolio de The Rezah.
        </div>
      </div>
    </div>
  `
}
