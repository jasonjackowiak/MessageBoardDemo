﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MessageBoard.Data
{
    public class CharacterClass
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public ICollection<CharacterAttribute> Attributes { get; set; }
        public ICollection<Character> Characters { get; set; }
    }
}

//Chef
//good at food
//blabla