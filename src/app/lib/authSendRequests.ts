export async function sendVerificationRequest({
  to,
  from,
  url,
  codeDigits,
}: {
  to: string;
  from: string;
  url: string;
  codeDigits: string;
}) {
  const { host } = new URL(url);
  const apiKey = process.env.AUTH_RESEND_KEY;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: `Sign in to ${host}`,
      html: html({ url, host, codeDigits }),
      text: text({ url, host, codeDigits }),
    }),
  });

  if (!res.ok)
    throw new Error('Resend error: ' + JSON.stringify(await res.json()));
}

function html(params: { url: string; host: string; codeDigits: string }) {
  const { url, host, codeDigits } = params;

  const escapedHost = host.replace(/\./g, '&#8203;.');

  const brandColor = '#346df1';
  const color = {
    background: '#f9f9f9',
    text: '#444',
    mainBackground: '#fff',
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: '#fff',
  };

  return `
<body style="background: ${color.background};">
  <table width="100%" border="0" cellspacing="20" cellpadding="0"
    style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center"
        style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        Sign in to <strong>${escapedHost}</strong>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}">
            Code: ${codeDigits}

            
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center"
        style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
        If you did not request this email you can safely ignore it.
      </td>
    </tr>
  </table>
</body>
`;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({
  url,
  host,
  codeDigits,
}: {
  url: string;
  host: string;
  codeDigits: string;
}) {
  return `Your code: ${codeDigits}} ${host}\n${url}\n\n`;
}
