using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;

namespace MessageBoard.Data
{
    public class MessageBoardsMigrationConfiguration : DbMigrationsConfiguration<MessageBoardContext>
    {
        public MessageBoardsMigrationConfiguration()
        {
            this.AutomaticMigrationDataLossAllowed = true;
            this.AutomaticMigrationsEnabled = true;
        }

        protected override void Seed(MessageBoardContext context)
        {
            base.Seed(context);

//#if DEBUG
//            if (context.CharacterClasses.Count() == 0)
//            {
//                var asian = new CharacterClass()
//                {
//                    Name = "Asian",
//                    Description = "Good at Math and Table Tennis",
//                    Attributes = new List<CharacterAttribute>()
//                    {
//                        new CharacterAttribute()
//                        {
//                            Description = "Mathematics",
//                            Type = "Passive Skill"
//                        },
//                        new CharacterAttribute()
//                        {
//                            Description = "Gets 25% discount",
//                            Type = "Spell"
//                        }
//                    }
//                };
//            }

//            context.SaveChanges();
//        }
//#endif

        }
    }
}
