using BookStore.Models.InputModels;

namespace BookStore.Models.ViewModels
{
    public class BookViewModel : BookInputModel
    {
        public BookViewModel(Book book)
        {
            Id = book.Id;
            Title = book.Title;
            Language = book.Language;
            Description = book.Description;
            CoverPage = book.CoverPage;
            Price = book.Price;
            AmazonLink = book.AmazonLink;
            Author = book.Author;
            Offer = book.Offer;
        }

        public int Id { get; set; }
    }
}
