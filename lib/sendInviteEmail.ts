import sgMail from '@sendgrid/mail';

const sendGridApiKey = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_FROM_EMAIL;
const replyToEmail = process.env.REPLY_TO_EMAIL;
const appBaseUrl =
  process.env.NEXT_PUBLIC_APP_URL || 'https://christmas-party-invitation-app.vercel.app';

if (!sendGridApiKey) {
  console.warn(
    'SENDGRID_API_KEY is not set. Invitation emails will not be sent until this is configured.'
  );
} else {
  sgMail.setApiKey(sendGridApiKey);
}

type SendInviteOptions = {
  email: string;
  firstName: string;
  lastName: string;
  inviteId: string;
};

export async function sendInviteEmail({
  email,
  firstName,
  lastName,
  inviteId,
}: SendInviteOptions) {
  if (!sendGridApiKey) {
    return;
  }

  const inviteUrl = `${appBaseUrl.replace(/\/$/, '')}/${inviteId}`;
  const fullName = `${firstName} ${lastName}`.trim();
  const subject = 'Christmas Disco Party II – Your Invitation';

  const html = `
  <!DOCTYPE html>
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Christmas Disco Party II – Your Invitation</title>
    <!--[if mso]>
    <noscript>
      <xml>
        <o:OfficeDocumentSettings>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    </noscript>
    <style type="text/css">
      table {border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;}
      td, th {border-collapse:collapse;}
    </style>
    <![endif]-->
  </head>
  <body style="margin:0;padding:0;background-color:#0B1220;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0B1220;padding:40px 0;font-family:Arial,Helvetica,sans-serif;">
      <tr>
        <td align="center" style="padding:0;">
          <!--[if mso]>
          <table width="560" cellpadding="0" cellspacing="0" border="0" style="background-color:#111a2a;padding:40px;">
          <![endif]-->
          <!--[if !mso]><!-->
          <table width="560" cellpadding="0" cellspacing="0" border="0" style="background-color:#111a2a;border-radius:18px;padding:40px;max-width:560px;width:100%;">
          <!--<![endif]-->
            <tr>
              <td align="center" style="padding:0 0 12px 0;">
                <h1 style="margin:0;font-size:28px;line-height:1.3;color:#00E6D2;font-weight:bold;font-family:Arial,Helvetica,sans-serif;">Christmas Disco Party II</h1>
                <p style="margin:8px 0 0 0;font-size:16px;color:#8da2c0;font-family:Arial,Helvetica,sans-serif;">A Christmas celebration party by KodeLab & Neyho</p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 0;">
                <p style="margin:0;font-size:16px;line-height:1.6;color:#dfe8ff;font-family:Arial,Helvetica,sans-serif;">
                  Hi ${fullName || 'there'},<br/><br/>
                  You are invited to join us for an unforgettable Christmas celebration party organised by <strong style="color:#ffffff;font-weight:bold;">KodeLab and Neyho</strong>.
                </p>
                <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
                  <tr>
                    <td align="center" style="padding:0;">
                      <!--[if mso]>
                      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${inviteUrl}" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="25%" stroke="f" fillcolor="#00ACBA">
                        <w:anchorlock/>
                        <center style="color:#0B1220;font-family:Arial,Helvetica,sans-serif;font-size:16px;font-weight:600;">Confirm Your Attendance</center>
                      </v:roundrect>
                      <![endif]-->
                      <!--[if !mso]><!-->
                      <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;border-radius:12px;background-color:#00ACBA;margin:0 auto;">
                        <tr>
                          <td align="center" valign="middle" style="padding:14px 32px;background-color:#00ACBA;border-radius:12px;">
                            <a href="${inviteUrl}" style="color:#0B1220;font-size:16px;font-weight:600;text-decoration:none;font-family:Arial,Helvetica,sans-serif;line-height:20px;display:block;">Confirm Your Attendance</a>
                          </td>
                        </tr>
                      </table>
                      <!--<![endif]-->
                    </td>
                  </tr>
                </table>
                <p style="margin:0;font-size:15px;line-height:1.6;color:#8da2c0;text-align:center;font-family:Arial,Helvetica,sans-serif;">
                  Date: <strong style="color:#ffffff;font-weight:bold;">04.12.2025. | 19:00h</strong><br/>
                  Address: <strong style="color:#ffffff;font-weight:bold;">Cebini ul. 35, Buzin | Restoran Stafas</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 0;border-top:1px solid #1a2332;text-align:center;">
                <p style="margin:0;font-size:14px;color:#65728c;font-family:Arial,Helvetica,sans-serif;">
                  We can&apos;t wait to celebrate with you!<br/>
                  <span style="color:#00E6D2;">KodeLab</span> & <span style="color:#00E6D2;">Neyho</span> Teams
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding-top:24px;border-top:1px solid #0f1520;text-align:center;">
                <p style="margin:0;font-size:12px;color:#4a5568;line-height:1.5;font-family:Arial,Helvetica,sans-serif;">
                  This is an automated message. Please do not reply to this email.<br/>
                  For inquiries, please contact us at <a href="mailto:info@kodelab.hr" style="color:#00E6D2;text-decoration:none;">info@kodelab.hr</a>.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;

  await sgMail.send({
    to: email,
    from: fromEmail,
    replyTo: replyToEmail,
    subject,
    html,
  });
}

