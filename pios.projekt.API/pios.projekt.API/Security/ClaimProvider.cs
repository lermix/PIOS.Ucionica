using MongoDB.Driver;
using pios.projekt.DAL.Datatabse;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;

namespace pios.projekt.API.Security
{
	public class ClaimProvider : IClaimProvider
	{
		private IClassroomContext context;

		public ClaimProvider(IClassroomContext context)
		{
			this.context=context;
		}

		public List<Claim> GetRoles(string username, string password)
		{
			if ( username == "Admin" && password == "Admin" )
			{
				List<Claim> claims = new List<Claim> { new Claim( ClaimTypes.Name, username ) };
				claims.Add( new Claim( ClaimTypes.SerialNumber, "-1" ) );
				claims.Add( new Claim( ClaimTypes.Role, "Admin" ) );
				claims.Add( new Claim( ClaimTypes.Role, "Teacher" ) );
				claims.Add( new Claim( ClaimTypes.Role, "Student" ) );
				return claims;
			}

			if ( context.teachers.AsQueryable().Any(e =>e.Name == username && e.Surname == password) )
			{
				int id = context.teachers.AsQueryable().FirstOrDefault( e => e.Name == username && e.Surname == password ).Id;
				List<Claim> claims = new List<Claim> { new Claim( ClaimTypes.Name, username ) };
				claims.Add( new Claim( ClaimTypes.SerialNumber, id.ToString() ) );
				claims.Add( new Claim( ClaimTypes.Role, "Teacher" ) );

				return claims;
			}

			if ( context.students.AsQueryable().Any( e => e.Name == username && e.Surname == password ) )
			{
				int id = context.students.AsQueryable().FirstOrDefault( e => e.Name == username && e.Surname == password ).Id;

				List<Claim> claims = new List<Claim> { new Claim( ClaimTypes.Name, username ) };
				claims.Add( new Claim( ClaimTypes.SerialNumber, id.ToString() ) );
				claims.Add( new Claim( ClaimTypes.Role, "Student" ) );

				return claims;
			}



			return new List<Claim>();
		}
	}
}
