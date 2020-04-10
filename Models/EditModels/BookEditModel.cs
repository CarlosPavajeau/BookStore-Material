using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models.EditModels
{
    public class BookEditModel
    {
        public string Title { get; set; }
        public string Language { get; set; }
        public string Description { get; set; }
        public string CoverPage { get; set; }
        public decimal Price { get; set; }
        public Uri AmazonLink { get; set; }
        public string Author { get; set; }
        public bool Offer { get; set; }
    }
}
