const nodeMailer = require('nodemailer');
const inLineCss = require('nodemailer-juice');
const account = require('../../config/google.account.json');

// 이메일 코드 발급 함수
exports.createEmailCode = async () => {
  const min = Math.ceil(12340);
  const max = Math.floor(99999);
  return Math.floor(Math.random() * (max - min)) + min;
};

exports.sendEmailCode = (email, code) => {
  const transporter = nodeMailer.createTransport({ // 보내는 사람 설정
    service: 'gmail',
    port: 587,
    host: 'smtp.gmail.com',
    secure: false,
    requireTLS: true,
    auth: {
      user: account.email,
      pass: account.pw,
    },
  });

  transporter.use('compile', inLineCss());

  const mailOption = { // 이메일 내용
    from: account.email,
    to: email,
    subject: 'DGSW-SODA 회원가입 인증 코드',
    html: `<html>
    <head>
    </head>
  <body >
    <div style="
        width: 700px;
        height: 500px;
        margin: 150px auto;
        border: 1px solid #E5EBF7;
        background-color: #E5EBF7;">
      <div style="
        text-align: center;
        margin: -25px auto;
        width: 700px;
        height: 100px;
        background-color: #50a6f2;
        font-size: 25px;
        font-weight: 500;">
        <p style="color: #ffffff;">DGSW-SODA</p>
        <p style="color: #ffffff;">회원가입 인증 코드</p>
      </div>
      <div style="
        margin: 80px 30px 0px 30px;
        font-weight: 400;
        font-size: 25px;">
        DGSW-SODA 등록을 완료하려면 등록 페이지에 코드를 입력하세요.
      </div>
      <div style="
          font-size: 17px;
          margin: 40px 0px 0px 30px;">
        DGSW-SODA는 "대소고 소통의 다리"의 약자로 학교 내에 대나무 숲, 커뮤니티 팀빌딩 등 다양한 기능들을 제공 합니다.
      </div>
      <div style="
        font-size: 35px;
        margin: 50px 0px 0px 295px;">
        ${code}
      </div>
      <div style="
        font-size: 17px;
        margin: 50px 0px 0px 30px;">
        등록을 원하지 않을 경우 이 전자 메일은 삭제하셔도 좋습니다. 감사합니다.
      </div>
    </div>
    <div>
      <p style="margin: -130px 0px 0px 470px;">Team: TakeUp</p>
      <p style="margin: 15px 0px 0px 470px;">Service: DGSW-SODA</p>
      <p style="margin: 15px 0px 0px 470px;">Affiliation: 대구소프트웨어고등학교</p>
    </div>
  </body>
  </html>
  `,
  };

  // 이메일 보내기
  transporter.sendMail(mailOption, (err, info) => {
    if (err) { console.log(err); throw new Error(err); } else {
      console.log('Message sent : ', info);
    }
  });
};
