using System.Collections.Generic;
using System.Security.Claims;

namespace pios.projekt.API.Security
{
	public class ClaimProvider : IClaimProvider
	{
		public List<Claim> GetRoles(string username, string password)
		{
			throw new System.NotImplementedException();
		}
	}
}
