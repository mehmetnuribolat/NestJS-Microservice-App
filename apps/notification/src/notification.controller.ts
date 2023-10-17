import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { MailNotificationDto } from './dto';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UsePipes(new ValidationPipe())
  @EventPattern('send_email_notification')
  sendEmailNotification(@Payload() data: MailNotificationDto) {
    this.notificationService.sendEmailNotification(data);
  }
}
