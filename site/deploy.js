const FtpDeploy = require('ftp-deploy')
const ftpDeploy = new FtpDeploy()
require('dotenv').config();

console.log('ftp start');
ftpDeploy.deploy({
  user: process.env.FTP_USER,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  localRoot: __dirname + '/public',
  remoteRoot: '/',
  include: ['*', '**/*'],
  deleteRemote: false,
  forcePasv: true
})
  .then(res => {
    console.log('ftp finished', res)
  })
  .catch(err => console.log(err))
