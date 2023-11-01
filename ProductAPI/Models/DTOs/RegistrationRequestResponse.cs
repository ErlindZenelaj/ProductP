using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductAPI.Models.DTOs
{
    public class RegistrationRequestResponse : AuthResult
    {
        public string Token { get; internal set; }
    }
}