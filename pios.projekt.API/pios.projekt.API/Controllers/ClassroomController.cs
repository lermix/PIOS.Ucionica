using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pios.projekt.models.Inteface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pios.projekt.API.Controllers
{
	[Route( "api/[controller]/[action]" )]
	[ApiController]
	public class ClassroomController : ControllerBase
	{
		private IClassroomService classroomService;

		public ClassroomController(IClassroomService classroomService)
		{
			this.classroomService = classroomService;
		}

		[HttpGet]
		public async Task<IActionResult> GetProcess() => Ok( await classroomService.GetStudents() );
	}
}
