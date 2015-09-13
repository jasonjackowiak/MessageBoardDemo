using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MessageBoard.Data
{
    public class Point
    {
        public int Id { get; set; }
        public int Amount { get; set; }
        public string AwardedBy { get; set; } //This might change to string with name
        public string Challenge { get; set; }
        public DateTime Created { get; set; }
        public string Note { get; set; }

        public string CharacterAwardedTo { get; set; }
    }
}