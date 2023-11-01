using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using ProductAPI.Configurations;
using ProductAPI.Models.DTOs;

namespace ProductAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class AuthManagementController : ControllerBase
    {
        private readonly ILogger<AuthManagementController> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtConfig _jwtConfig;
        public AuthManagementController(ILogger<AuthManagementController> logger,
               UserManager<IdentityUser> userManager,
               IOptionsMonitor<JwtConfig> _optionsMonitor)
        {
            _logger = logger;
            _userManager = userManager;
            _jwtConfig = _optionsMonitor.CurrentValue;
        }

        [HttpPost]
        [Route(template: "Register")]
        public async Task<IActionResult> Register([FromBody] UserRegistrationRequestDto requestDto)
        {
            if (ModelState.IsValid)
            {
                var emailExist = await _userManager.FindByEmailAsync(requestDto.Email);

                if (emailExist != null)
                    return BadRequest(error: "email alerady exist");

                var newUser = new IdentityUser()
                {
                    Email = requestDto.Email,
                    UserName = requestDto.Email
                };

                var isCreated = await _userManager.CreateAsync(newUser, requestDto.Password);

                if (isCreated.Succeeded)
                {
                    var token = GenerateJwtToken(newUser);

                    return Ok(new RegistrationRequestResponse()
                    {
                        Result = true,
                        Token = token
                    });
                }

                return BadRequest(isCreated.Errors.Select(x => x.Description).ToList());

            }

            return BadRequest(error: "Invalid request payload");
        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> Login([FromBody] UserLoginRequestDto requestDto)
        {
            if (ModelState.IsValid)
            {
                var existingUser = await _userManager.FindByEmailAsync(requestDto.Email);

                if (existingUser == null)
                {
                    return BadRequest("Invalid authentication");
                }

                var isPasswordValid = await _userManager.CheckPasswordAsync(existingUser, requestDto.Password);

                if (isPasswordValid)
                {
                    var token = GenerateJwtToken(existingUser);

                    return Ok(new LoginRequestResponse()
                    {
                        Result = true,
                        Token = token
                    });
                }
                else
                {
                    return BadRequest("Invalid authentication");
                }
            }
            else
            {
                return BadRequest("Invalid request data");
            }
        }




        private string GenerateJwtToken(IdentityUser user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtConfig.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new []
                {
                    new Claim(type:"Id", value:user.Id),
                    new Claim(type:JwtRegisteredClaimNames.Sub, value:user.Email),
                    new Claim(type:JwtRegisteredClaimNames.Email, value:user.Email),
                    new Claim(type:JwtRegisteredClaimNames.Jti, value:Guid.NewGuid().ToString())

                }),
                Expires = DateTime.UtcNow.AddHours(4),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                algorithm: SecurityAlgorithms.HmacSha512)
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            var jwtToken = jwtTokenHandler.WriteToken(token);
            return jwtToken;
        }

    }
}