using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MessageBoard.Data
{
    public class Character
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Created { get; set; }
        public int UserId { get; set; }

        public ICollection<Point> Points { get; set; }
    }
}

//Chef
//good at food
//blabla