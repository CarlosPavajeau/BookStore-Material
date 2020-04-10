using BookStore.Models.InputModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models.ViewModels
{
    public class UserViewModel : UserInputModel
    {
        public UserViewModel(User user)
        {
            Id = user.Id;
            Name = user.Name;
            Email = user.Email;
            Password = null;
        }

        public int Id { get; set; }
        public string Token { get; set; }
    }
}
