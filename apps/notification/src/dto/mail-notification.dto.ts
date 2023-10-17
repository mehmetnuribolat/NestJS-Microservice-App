import { IsEmail, IsString } from 'class-validator';

export class MailNotificationDto {
  @IsEmail()
  email: string;

  @IsString()
  message: string;
}
