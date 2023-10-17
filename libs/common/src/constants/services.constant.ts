export class ServiceSettings {
  public static AUTHENTICATION_SERVICE = {
    serviceName: 'authentication',
    queueName: 'authentication',
  };

  public static PAYMENT_SERVICE = {
    serviceName: 'payment',
    queueName: 'payments',
  };

  public static NOTIFICATION_SERVICE = {
    serviceName: 'notification',
    queueName: 'notifications',
  };
}
