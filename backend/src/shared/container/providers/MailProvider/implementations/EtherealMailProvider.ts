import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private cliente: Transporter;

  constructor() {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.cliente = transporter;
    });
  }

  public async sendMail(to: string, body: string): Promise<void> {
    const message = await this.cliente.sendMail({
      from: 'Equipe GoBarber <equipe@gobarber.com.br>',
      to,
      subject: '[GoBarber] Recuperação de senha',
      html: body,
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
