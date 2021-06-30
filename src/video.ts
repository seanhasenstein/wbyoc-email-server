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

type Game = {
  name: string;
  url: string;
};

const sendVideoLinksEmail = async ({ subject, to, html }: EmailProps) => {
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

function generateHtml(firstName: string, games: Game[]) {
  return `<!DOCTYPE html>
  <html lang="en">
    <head>
      <title>2021 WBYOC Kaukauna Camp Game Film</title>
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
          <td align="left" style="padding: 0 9px 0 0">
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
                  Hey ${firstName},
                </td>
              </tr>
              ${
                games.length > 1
                  ? `
                <tr>
                  <td style="padding: 9px 0; font-family: 'Arial', 'Helvetica', sans-serif;">
                    Here are the links to your filmed games:
                  </td>
                </tr>
              `
                  : `
                <tr>
                  <td style="padding: 9px 0; font-family: 'Arial', 'Helvetica', sans-serif;">
                    Here is the link to your filmed game:
                  </td>
                </tr>
              `
              }
              ${games
                .map(
                  g => `
                <tr>
                  <td style="padding: 9px 0; font-family: 'Arial', 'Helvetica', sans-serif;"><a href="${g.url}">${g.name}</a></td>
                </tr>
              `
                )
                .join('')}
                <tr>
                <td style="padding: 9px 0; font-family: 'Arial', 'Helvetica', sans-serif;">
                  We hope you enjoyed the camp and were able to take away some great things both on and off of the court.
                </td>
              </tr>
              <tr>
                <td style="padding: 9px 0; font-family: 'Arial', 'Helvetica', sans-serif;">
                  We hope to see you next year!
                </td>
              </tr>
              <tr>
                <td style="padding: 9px 0 0 0; font-family: 'Arial', 'Helvetica', sans-serif; font-weight: bold;">Tom Rusch</td>
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

// const campersData = [
//   {
//     firstName: 'Jeff',
//     lastName: 'Schwoerer',
//     email: 'schwoerer.jeff@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 3pm',
//         url: 'https://youtu.be/iHtHm7s8ca8',
//       },
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 7pm',
//         url: 'https://youtu.be/v6NJ8f4G5IU',
//       },
//     ],
//   },
//   {
//     firstName: 'Rick',
//     lastName: 'Porath',
//     email: 'rick.porath1979@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 3pm',
//         url: 'https://youtu.be/iHtHm7s8ca8',
//       },
//     ],
//   },
//   {
//     firstName: 'Austin',
//     lastName: 'Edge',
//     email: 'aedge@hgsd.k12.wi.us',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 3pm',
//         url: 'https://youtu.be/iHtHm7s8ca8',
//       },
//     ],
//   },
//   {
//     firstName: 'Jim',
//     lastName: 'Delabreau',
//     email: 'jcdelebreau@outlook.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 3pm',
//         url: 'https://youtu.be/syG5CyQ9_sM',
//       },
//     ],
//   },
//   {
//     firstName: 'Jerry',
//     lastName: 'Delabreau',
//     email: 'j_dele82@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 3pm',
//         url: 'https://youtu.be/syG5CyQ9_sM',
//       },
//     ],
//   },
//   {
//     firstName: 'Bob',
//     lastName: 'Broeckel',
//     email: 'rbroeckel1970@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 3pm',
//         url: 'https://youtu.be/syG5CyQ9_sM',
//       },
//     ],
//   },
//   {
//     firstName: 'Mark',
//     lastName: 'Skibba',
//     email: 'mark@markskibba.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 4pm',
//         url: 'https://youtu.be/h2QCFX5vxSM',
//       },
//     ],
//   },
//   {
//     firstName: 'Lee',
//     lastName: 'Fiedorowicz',
//     email: 'reflee910254@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 4pm',
//         url: 'https://youtu.be/h2QCFX5vxSM',
//       },
//     ],
//   },
//   {
//     firstName: 'Nick',
//     lastName: 'Pilsner',
//     email: 'npils518@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 4pm',
//         url: 'https://youtu.be/33IiKFb6I6s',
//       },
//     ],
//   },
//   {
//     firstName: 'Connor',
//     lastName: 'Ellenbecker',
//     email: 'connorellenbecker@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 4pm',
//         url: 'https://youtu.be/33IiKFb6I6s',
//       },
//     ],
//   },
//   {
//     firstName: 'Paul',
//     lastName: 'White',
//     email: '1dawgl317@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 4pm',
//         url: 'https://youtu.be/33IiKFb6I6s',
//       },
//     ],
//   },
//   {
//     firstName: 'Logan',
//     lastName: 'Kinyon',
//     email: 'logankinyon9@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 5pm',
//         url: 'https://youtu.be/Om8jFPT0RgU',
//       },
//     ],
//   },
//   {
//     firstName: 'Rick',
//     lastName: 'Roedell',
//     email: 'rickroedell@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 5pm',
//         url: 'https://youtu.be/Om8jFPT0RgU',
//       },
//     ],
//   },
//   {
//     firstName: 'Adam',
//     lastName: 'Scheuneman',
//     email: 'a_scheunemann@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 5pm',
//         url: 'https://youtu.be/Om8jFPT0RgU',
//       },
//     ],
//   },
//   {
//     firstName: 'Terri',
//     lastName: 'Byrd',
//     email: 'byrdsnest4me@centurytel.net',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 5pm',
//         url: 'https://youtu.be/4cPXg_qpVuU',
//       },
//     ],
//   },
//   {
//     firstName: 'Susan',
//     lastName: 'Caldwell',
//     email: 'susancaldwell1984@icloud.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 5pm',
//         url: 'https://youtu.be/4cPXg_qpVuU',
//       },
//     ],
//   },
//   {
//     firstName: 'James',
//     lastName: 'Byrd',
//     email: 'jbyrd@deforestschools.org',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 5pm',
//         url: 'https://youtu.be/4cPXg_qpVuU',
//       },
//     ],
//   },
//   {
//     firstName: 'Tim',
//     lastName: 'Marquart',
//     email: 'tjm@aol.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 6pm',
//         url: 'https://youtu.be/_mEs6d2Jup8',
//       },
//     ],
//   },
//   {
//     firstName: 'Tommie',
//     lastName: 'Williams',
//     email: 'tdubgb@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 6pm',
//         url: 'https://youtu.be/_mEs6d2Jup8',
//       },
//     ],
//   },
//   {
//     firstName: 'Brad',
//     lastName: 'Baumgart',
//     email: 'bradvbaumgart@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 6pm',
//         url: 'https://youtu.be/_mEs6d2Jup8',
//       },
//     ],
//   },
//   {
//     firstName: 'Ben',
//     lastName: 'Dieck',
//     email: 'mrdieck@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 6pm',
//         url: 'https://youtu.be/mQ20J_F9UoA',
//       },
//     ],
//   },
//   {
//     firstName: 'Larissa',
//     lastName: 'Cerveny',
//     email: 'cervenylarissa@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 6pm',
//         url: 'https://youtu.be/mQ20J_F9UoA',
//       },
//     ],
//   },
//   {
//     firstName: 'Geoffry',
//     lastName: 'Krentz',
//     email: 'geoffreyk5022@hotmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 6pm',
//         url: 'https://youtu.be/mQ20J_F9UoA',
//       },
//     ],
//   },
//   {
//     firstName: 'Kari',
//     lastName: 'Marquardt',
//     email: 'kari.marquardt@saukprairieschools.org',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Court 1 @ 7pm',
//         url: 'https://youtu.be/v6NJ8f4G5IU',
//       },
//     ],
//   },
//   {
//     firstName: 'Terry',
//     lastName: 'VerStraate',
//     email: 'terry.verstraate@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ Noon',
//         url: 'https://youtu.be/B0mHH2Vuq34',
//       },
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 2pm',
//         url: 'https://youtu.be/BMS4uv4HcNQ',
//       },
//     ],
//   },
//   {
//     firstName: 'Ryan',
//     lastName: 'Rusch',
//     email: 'rrusch15@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ Noon',
//         url: 'https://youtu.be/B0mHH2Vuq34',
//       },
//     ],
//   },
//   {
//     firstName: 'Quinton',
//     lastName: 'Greer',
//     email: 'q_l_g@hotmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ Noon',
//         url: 'https://youtu.be/B0mHH2Vuq34',
//       },
//     ],
//   },
//   {
//     firstName: 'Dan',
//     lastName: 'Vechert',
//     email: 'dvechart@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 2pm',
//         url: 'https://youtu.be/BMS4uv4HcNQ',
//       },
//     ],
//   },
//   {
//     firstName: 'Tom',
//     lastName: 'Young',
//     email: 'jyoung27@new.rr.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 2pm',
//         url: 'https://youtu.be/BMS4uv4HcNQ',
//       },
//     ],
//   },
//   {
//     firstName: 'Pat',
//     lastName: 'Tschimperle',
//     email: 'tschimperle@aol.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 2pm',
//         url: 'https://youtu.be/lKNdYwgJ380',
//       },
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 4pm',
//         url: 'https://youtu.be/v5fiFBlqWcY',
//       },
//     ],
//   },
//   {
//     firstName: 'Mark',
//     lastName: 'Veeser',
//     email: 'mwveez@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 2pm',
//         url: 'https://youtu.be/lKNdYwgJ380',
//       },
//     ],
//   },
//   {
//     firstName: 'Chad',
//     lastName: 'Hahn',
//     email: 'cmhjordan23@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 2pm',
//         url: 'https://youtu.be/lKNdYwgJ380',
//       },
//     ],
//   },
//   {
//     firstName: 'Bryan',
//     lastName: 'McKy',
//     email: 'bmcky@starkhomes.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 3pm',
//         url: 'https://youtu.be/UgP1LtOZPxI',
//       },
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 6pm',
//         url: 'https://youtu.be/PtzuIr3G3xw',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ 11am',
//         url: 'https://youtu.be/0Yq4e1PxkQE',
//       },
//     ],
//   },
//   {
//     firstName: 'Doug',
//     lastName: 'Krause',
//     email: 'douglaskrause@hotmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 3pm',
//         url: 'https://youtu.be/UgP1LtOZPxI',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ 11am',
//         url: 'https://youtu.be/0Yq4e1PxkQE',
//       },
//     ],
//   },
//   {
//     firstName: 'Joseph',
//     lastName: 'Foster',
//     email: 'jfoster4.jf@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 3pm',
//         url: 'https://youtu.be/UgP1LtOZPxI',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ 1pm',
//         url: 'https://youtu.be/Y1sPokIxawg',
//       },
//     ],
//   },
//   {
//     firstName: 'Pat',
//     lastName: 'Geigel',
//     email: 'bbpackers1919@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 3pm',
//         url: 'https://youtu.be/HhdO19aq4es',
//       },
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 6pm',
//         url: 'https://youtu.be/PtzuIr3G3xw',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ 11am',
//         url: 'https://youtu.be/0Yq4e1PxkQE',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ 1pm',
//         url: 'https://youtu.be/Y1sPokIxawg',
//       },
//     ],
//   },
//   {
//     firstName: 'Charles',
//     lastName: 'Organ',
//     email: 'cmc2organ@att.net',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 3pm',
//         url: 'https://youtu.be/HhdO19aq4es',
//       },
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 6pm',
//         url: 'https://youtu.be/PtzuIr3G3xw',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ 1pm',
//         url: 'https://youtu.be/Y1sPokIxawg',
//       },
//     ],
//   },
//   {
//     firstName: 'Julie',
//     lastName: 'Phillips',
//     email: 'juliephillipsdpt@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 3pm',
//         url: 'https://youtu.be/HhdO19aq4es',
//       },
//     ],
//   },
//   {
//     firstName: 'Michael',
//     lastName: 'Graber',
//     email: 'grabes_3_13@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 4pm',
//         url: 'https://youtu.be/v5fiFBlqWcY',
//       },
//     ],
//   },
//   {
//     firstName: 'Todd',
//     lastName: 'Plahmer',
//     email: 'meteormap@msn.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Friday Session - Main Court @ 4pm',
//         url: 'https://youtu.be/h2QCFX5vxSM',
//       },
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 4pm',
//         url: 'https://youtu.be/v5fiFBlqWcY',
//       },
//     ],
//   },
//   {
//     firstName: 'Nathan',
//     lastName: 'Krause',
//     email: 'nate.krause11@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 4pm',
//         url: 'https://youtu.be/FRuWMUEJ50c',
//       },
//     ],
//   },
//   {
//     firstName: 'Tim',
//     lastName: 'Mittelstadt',
//     email: 'timothy.mittelstadt@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 4pm',
//         url: 'https://youtu.be/FRuWMUEJ50c',
//       },
//     ],
//   },
//   {
//     firstName: 'Steve',
//     lastName: 'Krause',
//     email: 'skeats68@sbcglobal.net',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 4pm',
//         url: 'https://youtu.be/FRuWMUEJ50c',
//       },
//     ],
//   },
//   {
//     firstName: 'Carl',
//     lastName: 'Birch',
//     email: 'cbirch711@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 5pm',
//         url: 'https://youtu.be/MbQxgfpU8EE',
//       },
//     ],
//   },
//   {
//     firstName: 'Matt',
//     lastName: 'Schneider',
//     email: 'matt.schneebs@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 5pm',
//         url: 'https://youtu.be/MbQxgfpU8EE',
//       },
//     ],
//   },
//   {
//     firstName: 'Brett',
//     lastName: 'Thieme',
//     email: 'brett.thieme@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 5pm',
//         url: 'https://youtu.be/MbQxgfpU8EE',
//       },
//     ],
//   },
//   {
//     firstName: 'John',
//     lastName: 'Brey',
//     email: 'johnbrey1@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 5pm',
//         url: 'https://youtu.be/lb8i6XBg9sM',
//       },
//     ],
//   },
//   {
//     firstName: 'Chris',
//     lastName: 'Wazny',
//     email: 'chris.wazny@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 5pm',
//         url: 'https://youtu.be/lb8i6XBg9sM',
//       },
//     ],
//   },
//   {
//     firstName: 'Stephanie',
//     lastName: 'Bonikowske',
//     email: 's.wengelski@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 5pm',
//         url: 'https://youtu.be/lb8i6XBg9sM',
//       },
//     ],
//   },
//   {
//     firstName: 'Nathan',
//     lastName: 'Stein',
//     email: 'nate.stein12@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 6pm',
//         url: 'https://youtu.be/6jvcknTg4is',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Court 1 @ 1pm',
//         url: 'https://youtu.be/tu7RivuzwsU',
//       },
//     ],
//   },
//   {
//     firstName: 'Lucas',
//     lastName: 'Solum',
//     email: 'ljsolum@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Main Court @ 6pm',
//         url: 'https://youtu.be/6jvcknTg4is',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Court 1 @ 1pm',
//         url: 'https://youtu.be/tu7RivuzwsU',
//       },
//     ],
//   },
//   {
//     firstName: 'Brad',
//     lastName: 'Wazny',
//     email: 'bradywazny23@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 7pm',
//         url: 'https://youtu.be/fdMAWmQyJ2U',
//       },
//     ],
//   },
//   {
//     firstName: 'Dayne',
//     lastName: 'Jacobson',
//     email: 'daynejacobson3@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Saturday Session - Court 1 @ 7pm',
//         url: 'https://youtu.be/fdMAWmQyJ2U',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ Noon',
//         url: 'https://youtu.be/bxh9kLgva_w',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Court 1 @ 2pm',
//         url: 'https://youtu.be/K3CSNNM9qmo',
//       },
//     ],
//   },
//   {
//     firstName: 'Scott',
//     lastName: 'Anderson',
//     email: 'smanders42000@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ Noon',
//         url: 'https://youtu.be/bxh9kLgva_w',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Court 1 @ 2pm',
//         url: 'https://youtu.be/K3CSNNM9qmo',
//       },
//     ],
//   },
//   {
//     firstName: 'Trent',
//     lastName: 'Anderson',
//     email: 'tkanderson403@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ Noon',
//         url: 'https://youtu.be/bxh9kLgva_w',
//       },
//       {
//         name: 'Kaukauna Sunday Session - Court 1 @ 2pm',
//         url: 'https://youtu.be/K3CSNNM9qmo',
//       },
//     ],
//   },
//   {
//     firstName: 'Rory',
//     lastName: 'Schultz',
//     email: 'schultz.grory@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Sunday Session - Court 1 @ Noon',
//         url: 'https://youtu.be/MgZCvAx7dRU',
//       },
//     ],
//   },
//   {
//     firstName: 'Scott',
//     lastName: 'Fuhrmann',
//     email: 'scottf1223@aol.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Sunday Session - Court 1 @ Noon',
//         url: 'https://youtu.be/MgZCvAx7dRU',
//       },
//     ],
//   },
//   {
//     firstName: 'Amos',
//     lastName: 'Anderson',
//     email: 'amosanderson1@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Sunday Session - Court 1 @ 1pm',
//         url: 'https://youtu.be/tu7RivuzwsU',
//       },
//     ],
//   },
//   {
//     firstName: 'Al',
//     lastName: 'Sprague',
//     email: 'alcarrr2002@yahoo.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ 2pm',
//         url: 'https://youtu.be/Nsp_-TsiEGA',
//       },
//     ],
//   },
//   {
//     firstName: 'Joe',
//     lastName: 'Gruse',
//     email: 'jgruse3@new.rr.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ 2pm',
//         url: 'https://youtu.be/Nsp_-TsiEGA',
//       },
//     ],
//   },
//   {
//     firstName: 'Jerry',
//     lastName: 'Daggs',
//     email: 'jeryn.jeryn@gmail.com',
//     filmedGames: [
//       {
//         name: 'Kaukauna Sunday Session - Main Court @ 2pm',
//         url: 'https://youtu.be/Nsp_-TsiEGA',
//       },
//     ],
//   },
// ];

const campersData = [
  {
    firstName: 'Sean',
    lastName: 'Hasenstein',
    email: 'seanhasenstein@gmail.com',
    filmedGames: [
      {
        name: 'Kaukauna Sunday Session - Main Court @ 2pm',
        url: 'https://youtu.be/Nsp_-TsiEGA',
      },
    ],
  },
];

function sendEmails() {
  campersData.forEach(c => {
    sendVideoLinksEmail({
      subject: `2021 Kaukauna Camp Game Film ***TEST [${Date.now()}]***`,
      to: c.email,
      html: generateHtml(c.firstName, c.filmedGames),
    });
  });
}

sendEmails();
