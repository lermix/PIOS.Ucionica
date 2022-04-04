using System.Collections.Generic;
using System.Security.Claims;

namespace pios.projekt.API.Security
{
	public interface IClaimProvider
	{
		List<Claim> GetRoles(string username, string password);

	}
}
