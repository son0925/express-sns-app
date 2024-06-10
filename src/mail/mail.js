const mailer = require('nodemailer');
const welcome = require('./welcom_template');
const goodbye = require('./goodbye_template');

const getEmailData = (to, name, template) => {
  let data = null;
  switch(template) {
    case 'welcome':
      data = {
        from: '보내는 사람 이름',
        to: to,
        subject: `Hello ${name}`,
        html: welcome()
      }
      break;
    
    case 'goodbye':
      data = {
        from: '보내는 사람 이름',
        to: to,
        subject: `GoodBye ${name}`,
        html: goodbye()
      }
      break;
    
    default:
      data;
      break;
  }
  return data;
}

const sendMail = (to, name, type) => {
  const transporter = mailer.createTransport({
    service: 'Gmail',
    auth: {
      user: '유저 이메일',
      pass: '구글에서 새로 생성한 아이디'
    }
  })
  
  const mail = getEmailData(to, name, type);
  transporter.sendMail(mail, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Email Sent successfully');
    }
    transporter.close();
  })
}


module.exports = sendMail;