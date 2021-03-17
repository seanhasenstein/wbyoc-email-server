import * as dotenv from 'dotenv';
import fetch from 'node-fetch';
import * as FormData from 'form-data';
import htmlEmail from './templates/marketing/hs-3-17-21';

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

// MAKE SURE TO COMPILE TYPESCRIPT FIRST!
sendEmail({
  subject: `***TESTING*** 2021 Camp Registration Now Open`,
  mailingList: 'seanhasenstein@gmail.com',
  html: htmlEmail,
});

// 1. get template file (mjml)
// 2. create new instance of showdown.Converter()
// 3. read the MD file and put into variable
// 4. use converter.makeHtml to convert markdown into html
// 5. read the mjml template file
// 6. replace {{content}} in template file with converted MD
// 7. use mjml2Html to convert mjml (with converted MD) into html
