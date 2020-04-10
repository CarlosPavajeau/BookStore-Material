using BookStore.Data;
using BookStore.Models;
using BookStore.Models.EditModels;
using BookStore.Models.InputModels;
using BookStore.Models.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Books
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookViewModel>>> GetBooks()
        {
            return (await _context.Books.Select(book => new BookViewModel(book)).ToListAsync());
        }

        // GET: api/Books/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookViewModel>> GetBook(int id)
        {
            Book book = await _context.Books.FindAsync(id);

            if (book == null)
            {
                return NotFound();
            }

            return new BookViewModel(book);
        }

        // GET: api/Books/Offers
        [HttpGet("[action]")]
        public async Task<ActionResult<IEnumerable<BookViewModel>>> Offers()
        {
            return await _context.Books.Where(b => b.Offer == true).
                    Select(book => new BookViewModel(book)).
                    ToListAsync();
        }

        // PUT: api/Books/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBook(int id, BookEditModel editModel)
        {
            Book book = _context.Books.Find(id);

            if (book is null)
                return NotFound();

            book.Title = editModel.Title;
            book.Language = editModel.Language;
            book.Description = editModel.Description;
            book.CoverPage = editModel.CoverPage;
            book.Author = editModel.Author;
            book.AmazonLink = editModel.AmazonLink;
            book.Price = editModel.Price;
            book.Offer = editModel.Offer;

            _context.Entry(book).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(true);
        }

        // POST: api/Books
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<BookViewModel>> PostBook(BookInputModel model)
        {
            Book book = new Book
            {
                Title = model.Title,
                Language = model.Language,
                Description = model.Description,
                CoverPage = model.CoverPage,
                Price = model.Price,
                AmazonLink = model.AmazonLink,
                Author = model.Author,
                Offer = model.Offer
            };
            _context.Books.Add(book);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBook", new { id = book.Id }, book);
        }

        // DELETE: api/Books/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BookViewModel>> DeleteBook(int id)
        {
            Book book = await _context.Books.FindAsync(id);
            if (book == null)
            {
                return NotFound();
            }

            _context.Books.Remove(book);
            await _context.SaveChangesAsync();

            return new BookViewModel(book);
        }

        private bool BookExists(int id)
        {
            return _context.Books.Any(e => e.Id == id);
        }
    }
}
