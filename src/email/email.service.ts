import { Injectable } from '@nestjs/common';
import Mail from 'nodemailer/lib/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private nodemailerTransporter: Mail;

  constructor(private configService: ConfigService) {
    this.nodmailerTransporter = createTransport({
      service: configService.get<string>('EMAIL_SERVICE'),
      auth: {
        user: configService.get<string>('EMAIL_USER'),
        password: configService.get<string>('EMAIL_PASSWORD'),
      },
    });
  }

  async sendEmail(options) {
    // 여기 작성 필요
  }
}
