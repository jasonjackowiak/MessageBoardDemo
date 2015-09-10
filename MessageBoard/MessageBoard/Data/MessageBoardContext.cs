using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace MessageBoard.Data
{
    public class MessageBoardContext : DbContext
    {
        public MessageBoardContext()
            : base("DefaultConnection")
        {
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;

            //Database.SetInitializer(new CreateDatabaseIfNotExists<MessageBoardContext>());
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<MessageBoardContext, MessageBoardsMigrationConfiguration>());
        }

        public DbSet<Topic> Topics { get; set; }
        public DbSet<Reply> Replies { get; set; }

        public DbSet<Point> Points { get; set; }
        public DbSet<CharacterClass> CharacterClasses { get; set; }
        public DbSet<CharacterAttribute> CharacterAttributes { get; set; }
        public DbSet<Character> Characters { get; set; }
    }
}