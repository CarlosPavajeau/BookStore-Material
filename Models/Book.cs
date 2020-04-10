using System;

namespace BookStore.Models
{
    public class Book
    {
        public int Id { get; set; }
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
