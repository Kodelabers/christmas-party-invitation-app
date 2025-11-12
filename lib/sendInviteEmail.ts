import sgMail from '@sendgrid/mail';

const sendGridApiKey = process.env.SENDGRID_API_KEY;
const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'invitations@codemas2025.com';
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
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0B1220;padding:40px 0;font-family:Arial,sans-serif;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#111a2a;border-radius:18px;padding:40px;color:#ffffff;box-shadow:0 20px 60px rgba(0,0,0,0.25);">
          <tr>
            <td align="center" style="padding-bottom:12px;">
              <h1 style="margin:0;font-size:28px;line-height:1.3;color:#00E6D2;">Christmas Disco Party II</h1>
              <p style="margin:8px 0 0;font-size:16px;color:#8da2c0;">A Christmas celebration party by KodeLab & Neyho</p>
            </td>
          </tr>
          <tr>
            <td style="padding:24px 0;">
              <p style="margin:0;font-size:16px;line-height:1.6;color:#dfe8ff;">
                Hi ${fullName || 'there'},<br/><br/>
                You are invited to join us for an unforgettable Christmas celebration party organised by <strong>KodeLab and Neyho</strong>.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;">
                <tr>
                  <td align="center">
                    <!--[if mso]>
                    <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${inviteUrl}" style="height:48px;v-text-anchor:middle;width:240px;" arcsize="25%" stroke="f" fillcolor="#00ACBA">
                      <w:anchorlock/>
                      <center style="color:#0B1220;font-family:Arial,sans-serif;font-size:16px;font-weight:600;">Confirm Your Attendance</center>
                    </v:roundrect>
                    <![endif]-->
                    <!--[if !mso]><!-->
                    <table cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate;border-spacing:0;border-radius:12px;background:#00ACBA;">
                      <tr>
                        <td align="center" valign="middle" style="padding:14px 32px;background:#00ACBA;border-radius:12px;">
                          <a href="${inviteUrl}" style="color:#0B1220;font-size:16px;font-weight:600;text-decoration:none;font-family:Arial,sans-serif;line-height:20px;display:block;">Confirm Your Attendance</a>
                        </td>
                      </tr>
                    </table>
                    <!--<![endif]-->
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:15px;line-height:1.6;color:#8da2c0;text-align:center;">
                Date: <strong>04.12.2025. | 19:00h</strong><br/>
                Address: <strong>Cebini ul. 35, Buzin | Restoran Stafas</strong>
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding-top:32px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;">
              <p style="margin:0;font-size:14px;color:#65728c;">
                We can&apos;t wait to celebrate with you!<br/>
                <span style="color:#00E6D2;">KodeLab</span> & <span style="color:#00E6D2;">Neyho</span> Teams
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
  `;

  await sgMail.send({
    to: email,
    from: fromEmail,
    subject,
    html,
  });
}

