interface IMailConfig {
  driver: 'ethereal' | 'ses';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  /**
   * Email cadastrado na AWS SES
   */
  defaults: {
    from: {
      email: 'paulovmel@gmail.com',
      name: 'Paulo Victor',
    },
  },
} as IMailConfig;
