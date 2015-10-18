using System;
using System.Diagnostics;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;

namespace MessageBoard.Services
{
    public class EmailService : IIdentityMessageService
    {
        public async Task SendAsync(IdentityMessage message)
        {
            await ConfigSMTPasync(message);
        }

        private async Task ConfigSMTPasync(IdentityMessage message)
        {

            var email = new MailMessage(new MailAddress
                ("test@nothing.com", "do not reply"), new MailAddress(message.Destination))
            {
                Subject = message.Subject,
                Body = message.Body,
                IsBodyHtml = true
            };

            // Plug in your email service here to send an email.
            var credentialUserName = "info@ourdoamin.com";
            var sentFrom = "noreply@ourdoamin.com";
            var pwd = "ourpassword";

            // Configure the client:
            var client = new SmtpClient("mail.ourdoamin.com");
            client.Port = 25;
            client.DeliveryMethod = System.Net.Mail.SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;

            // Creatte the credentials:
            var credentials = new System.Net.NetworkCredential(credentialUserName, pwd);
            client.EnableSsl = false;
            client.Credentials = credentials;

            //Send
            await client.SendMailAsync(email);

        }
    }
}