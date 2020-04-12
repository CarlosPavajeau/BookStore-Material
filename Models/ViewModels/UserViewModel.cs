using BookStore.Models.InputModels;

namespace BookStore.Models.ViewModels
{
    public class UserViewModel : UserInputModel
    {
        public UserViewModel(User user)
        {
            Id = user.Id.ToString();
            Name = user.Name;
            Email = user.Email;
            Password = null;
        }

        public UserViewModel(ApplicationUser user)
        {
            Id = user.Id;
            Name = user.UserName;
            Email = user.Email;
            Password = null;
        }

        public string Id { get; set; }
        public string Token { get; set; }
    }
}
