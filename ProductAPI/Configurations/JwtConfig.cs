using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductAPI.Configurations
{
    public class JwtConfig
    {
        public string Secret { get; set; } = string.Empty;
    }
}