import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import * as FormData from 'form-data';

dotenv.config();

const authToken = `Basic ${Buffer.from(
  `api:${process.env.MAILGUN_API_KEY}`
).toString('base64')}`;

type EmailProps = {
  subject: string;
  to: string;
  html: string;
};

const sendQuestionnaireEmail = async ({ subject, to, html }: EmailProps) => {
  const form = new FormData();

  const endpoint = `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`;

  form.append('from', `WBYOC <wbyoc@officialsconnection.org>`);
  form.append('to', to);
  form.append('subject', subject);
  form.append('html', html);

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: form,
      headers: {
        Authorization: authToken,
      },
    });

    const data = await response.json();

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

type Camper = {
  firstName: string;
  email: string;
};

const campersList = [
  {
    firstName: 'Sean',
    lastName: 'Hasenstein',
    email: 'seanhasenstein@gmail.com',
  },
];

function generateHtml(firstName: string) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>2021 WBYOC Kaukauna Camp Questionnaire</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <style type="text/css">
        /* CLIENT_SPECIFIC STYLES */
        body,
        table,
        td,
        a {
          -webkit-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
        }
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
  
        /* RESET STYLES */
        img {
          border: 0;
          height: auto;
          line-height: 100%;
          outline: none;
          text-decoration: none;
        }
        table {
          border-collapse: collapse !important;
        }
        body {
          height: 100% !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
        }
      </style>
    </head>
    <body
      id="body"
      style="
        margin: 0 !important;
        padding: 0 !important;
      "
    >
      <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        role="presentation"
        width="100%"
      >
        <tr>
          <td align="left" style="padding: 0 10px 0 0">
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                color: #222222;
                font-family: 'Arial', 'Helvetica', sans-serif;
                margin: 0;
                padding: 0;
              "
            >
              <tr>
                <td style="padding: 9px 0; font-family: 'Arial', 'Helvetica', sans-serif;">
                  Hi ${firstName},
                </td>
              </tr>
              <tr>
                <td style="padding: 9px 0; font-family: 'Arial', 'Helvetica', sans-serif;">
                  Thanks again for attending the 2021 Kaukauna Camp. We would appreciate it if you would fill out this short questionnaire based on your camp experience.
                </td>
              </tr>
              <tr>
                <td style="padding: 9px 0; font-family: 'Arial', 'Helvetica', sans-serif;">
                  <a href="https://officialsconnection.org/post-camp-questionnaire?camp=kaukauna">Questionnaire Link</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 9px 0; font-family: 'Arial', 'Helvetica', sans-serif;">
                  Have a great summer,
                </td>
              </tr>
              <tr>
                <td style="padding: 9px 0 0; font-family: 'Arial', 'Helvetica', sans-serif; font-weight: bold;">Tom Rusch</td>
              </tr>
              <tr>
                <td style="font-family: 'Arial', 'Helvetica', sans-serif;">WBYOC Director</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

function sendEmail(campers: Camper[]) {
  campers.forEach(c => {
    sendQuestionnaireEmail({
      subject: `2021 Kaukauna Camp Questionnaire ***TEST [${Date.now()}]***`,
      to: c.email,
      html: generateHtml(c.firstName),
    });
  });
}

sendEmail(campersList);
