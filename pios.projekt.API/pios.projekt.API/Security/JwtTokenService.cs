using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using pios.projekt.models.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Settlement.API.Security
{
	public class JwtTokenService
	{
		private readonly IConfiguration _config;

		public JwtTokenService(IConfiguration config)
		{
			_config = config;
		}
		public VerifiedUser CreateToken(List<Claim> claims)
		{
			var key = new SymmetricSecurityKey( Encoding.UTF8.GetBytes( _config["TokenKey"] ) );
			var creds = new SigningCredentials( key, SecurityAlgorithms.HmacSha256Signature );

			var tokenDescriptor = new SecurityTokenDescriptor
			{
				Subject = new ClaimsIdentity( claims ),
				Expires = DateTime.Now.AddDays( 1 ),
				SigningCredentials = creds,
				
			};

			var tokenHandler = new JwtSecurityTokenHandler();
			var token = tokenHandler.CreateToken( tokenDescriptor );

			var tokenUser = new VerifiedUser
			{
				Username = claims.FirstOrDefault(x => x.Type == ClaimTypes.Name).Value,
				Roles = string.Join( ",", claims.Where( x => x.Type == ClaimTypes.Role ).Select( x => x.Value ).ToList() ),
				Token = tokenHandler.WriteToken( token )
			};

			return tokenUser;
		}
	}
}
