using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductAPI.Models.DTOs
{
    public class AuthResult
    {
        public string AspNetUserTokens { get; set; } = string.Empty;
        public Boolean Result { get; set; }
        public List<string> Errors { get; set; }
    }
}