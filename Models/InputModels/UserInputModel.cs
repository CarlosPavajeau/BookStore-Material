using BookStore.Models.EditModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BookStore.Models.InputModels
{
    public class UserInputModel : UserEditModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
