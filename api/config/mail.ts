/**
 * Config source: https://git.io/JvgAf
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import Env from '@ioc:Adonis/Core/Env'
import { MailerConfigContract } from '@ioc:Adonis/Addons/Mail'

const mailConfig: MailerConfigContract = {
  /*
  |--------------------------------------------------------------------------
  | Default mailer
  |--------------------------------------------------------------------------
  |
  | The following mailer will be used to send emails, when you don't specify
  | a mailer
  |
  */
  mailer: 'smtp',

  /*
  |--------------------------------------------------------------------------
  | Mailers
  |--------------------------------------------------------------------------
  |
  | You can define or more mailers to send emails from your application. A
  | single `driver` can be used to define multiple mailers with different
  | config.
  |
  | For example: Postmark driver can be used to have different mailers for
  | sending transactional and promotional emails
  |
  */
  mailers: {
    smtp: {
      driver: 'smtp',
      host: Env.get('SMTP_HOST', '127.0.0.1') as string,
      port: Number(Env.get('SMTP_PORT', '587')),
      auth: {
        type: 'login',
        user: Env.get('SMTP_USER', 'user') as string,
        pass: Env.get('SMTP_PASS', 'pass') as string,
      },
    },
  },
}

export default mailConfig
