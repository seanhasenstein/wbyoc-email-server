import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import * as FormData from 'form-data';
import htmlEmail from './templates/marketing/archive/2022/hs-3-20-22';

dotenv.config();

interface SendEmailArgs {
  subject: string;
  mailingList: unknown;
  html: string;
}

const authToken = `Basic ${Buffer.from(
  `api:${process.env.MAILGUN_API_KEY}`
).toString('base64')}`;

const sendEmail = async ({ subject, mailingList, html }: SendEmailArgs) => {
  const form = new FormData();

  const endpoint = `https://api.mailgun.net/v3/${process.env.MAILGUN_DOMAIN}/messages`;

  form.append('from', `WBYOC <wbyoc@officialsconnection.org>`);
  form.append('to', mailingList);
  form.append('bcc', 'wbyoc@officialsconnection.org');
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

// MAKE SURE TO COMPILE TYPESCRIPT BEFORE SENDING!
sendEmail({
  subject: `*** test email ${new Date().toISOString()} ***`,
  mailingList: 'seanhasenstein@gmail.com',
  html: htmlEmail,
});
