using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pios.projekt.API
{
    public interface IJwtAuthenticatinManager
    {
        string Authenticate(string username, string password);
    }
}
