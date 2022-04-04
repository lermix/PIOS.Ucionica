using System.Collections.Generic;
using System.Security.Claims;

namespace pios.projekt.API.Security
{
	public class ClaimProvider : IClaimProvider
	{
		public List<Claim> GetRoles(string username, string password)
		{
			if ( username == "Admin" && password == "Admin" )
			{
				List<Claim> claims = new List<Claim> { new Claim( ClaimTypes.Name, username ) };
				claims.Add( new Claim( ClaimTypes.Role, "Admin" ) );
				claims.Add( new Claim( ClaimTypes.Role, "Teacher" ) );
				claims.Add( new Claim( ClaimTypes.Role, "Student" ) );
				return claims;
			}

			return new List<Claim>();
		}
	}
}
