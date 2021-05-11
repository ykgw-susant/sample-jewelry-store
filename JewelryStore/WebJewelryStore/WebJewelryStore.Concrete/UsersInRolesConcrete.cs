using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using WebJewelryStore.Interface;
using WebJewelryStore.Models;
using WebJewelryStore.ViewModels;

namespace WebJewelryStore.Concrete
{
    public class UsersInRolesConcrete : IUsersInRoles
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public UsersInRolesConcrete(DatabaseContext context, IConfiguration config)
        {
            _context = context;
            _configuration = config;
        }

        public bool AssignRole(UsersInRoles usersInRoles)
        {
            _context.Add(usersInRoles);
            var result = _context.SaveChanges();
            if (result > 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool CheckRoleExists(UsersInRoles usersInRoles)
        {
            var result = (from userrole in _context.UsersInRoles
                          where userrole.UserId == usersInRoles.UserId && userrole.RoleId == usersInRoles.RoleId
                          select userrole).Count();

            return result > 0 ? true : false;
        }

        public List<AssignRolesViewModel> GetAssignRoles()
        {
            throw new NotImplementedException();
        }

        public bool RemoveRole(UsersInRoles usersInRoles)
        {
            var role = (from userrole in _context.UsersInRoles
                        where userrole.UserId == usersInRoles.UserId && userrole.RoleId == usersInRoles.RoleId
                        select userrole).FirstOrDefault();
            if (role != null)
            {
                _context.UsersInRoles.Remove(role);
                var result = _context.SaveChanges();

                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
      
    }
}
