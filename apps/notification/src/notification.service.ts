import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodeMailer from 'nodemailer';
import { MailNotificationDto } from './dto';

@Injectable()
export class NotificationService {
  constructor(private readonly configService: ConfigService) {}

  private readonly mailSender = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: this.configService.get('SMTP_USER'),
      clientId: this.configService.get('GOOGLE_OAUTH_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_OAUTH_CLIENT_SECRET'),
      refreshToken: this.configService.get('GOOGLE_OAUTH_REFRESH_TOKEN'),
    },
  });

  async sendEmailNotification(mailNotification: MailNotificationDto) {
    await this.mailSender.sendMail({
      from: this.configService.get('SMTP_USER'),
      to: mailNotification.email,
      subject: 'Room-Booking Notification',
      text: mailNotification.message,
    });
  }
}
