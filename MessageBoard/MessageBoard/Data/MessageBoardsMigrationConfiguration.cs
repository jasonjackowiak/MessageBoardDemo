using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;

namespace MessageBoard.Data
{
    public class MessageBoardsMigrationConfiguration: DbMigrationsConfiguration<MessageBoardContext>
    {
        public MessageBoardsMigrationConfiguration()
        {
            this.AutomaticMigrationDataLossAllowed = false;
            this.AutomaticMigrationsEnabled = false;
        }

//        protected override void Seed(MessageBoardContext context)
//        {
//            base.Seed(context);

//#if DEBUG
//            if (context.Topics.Count() == 0)
//            {
//                var topic = new Topic()
//                {
//                    Title = "I love MVC",
//                    Created = DateTime.Now,
//                    Body = "I love ASP.NET MVC and I want everyone to know.",
//                    Replies = new List<Reply>()
//                    {
//                        new Reply()
//                        {
//                            Body = "Me too.",
//                            Created = DateTime.Now
//                        },
//                        new Reply()
//                        {
//                            Body = "Aww shucks :)",
//                            Created = DateTime.Now
//                        }
//                    }
//                };
//                context.Topics.Add(topic);

//                var anotherTopic = new Topic()
//                {
//                    Title = "I love other things!",
//                    Created = DateTime.Now,
//                    Body = "Because there's more to life than this.",
//                    Replies = new List<Reply>()
//                    {
//                        new Reply()
//                        {
//                            Body = "Me too.",
//                            Created = DateTime.Now
//                        },
//                        new Reply()
//                        {
//                            Body = "Not me.",
//                            Created = DateTime.Now
//                        }
//                    }
//                };
//                context.Topics.Add(topic);

//                context.SaveChanges();
//            }
//#endif
//        }
    }
}