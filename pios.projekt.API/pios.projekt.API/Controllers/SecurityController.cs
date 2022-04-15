using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pios.projekt.API.Security;
using pios.projekt.models.Models;
using Settlement.API.Security;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace pios.projekt.API.Controllers
{
	[Route( "api/[controller]/[action]" )]
	[ApiController]
	public class SecurityController : Controller
	{
		private readonly JwtTokenService _tokenService;
		private readonly IClaimProvider _claimProvider;


		public SecurityController( JwtTokenService tokenService, IClaimProvider claimProvider)
		{
			_tokenService = tokenService;
			_claimProvider = claimProvider;
		}

		[HttpPost]
		[AllowAnonymous]
		public async Task<ActionResult> Login([FromBody] Login login)
		{
			try
			{
				List<Claim> claims = new List<Claim>();
				await Task.Run( () => claims = _claimProvider.GetRoles( login.Username, login.Password ) );

				if ( claims == null || claims.Count == 0 )
					return Unauthorized();
				else
					return Ok( _tokenService.CreateToken( claims ) );
			}
			catch ( Exception ex )
			{
				return StatusCode( StatusCodes.Status500InternalServerError, ex.Message );
			}

		}
	}
}
