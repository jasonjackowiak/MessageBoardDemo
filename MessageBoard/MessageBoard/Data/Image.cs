using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MessageBoard.Data
{
    public class Image
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }


        [NotMapped]
        public HttpPostedFileBase Attachment { get; set; }
    }
}