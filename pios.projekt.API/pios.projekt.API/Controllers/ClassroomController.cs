using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pios.projekt.models.Inteface;
using pios.projekt.models.Models;
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
		public async Task<IActionResult> GetStudents() => Ok( await classroomService.GetStudents() );

		[HttpPost]
		public async Task<IActionResult> AddStudent() => Ok( await classroomService.AddStudent() );

		[HttpPost]
		public async Task<IActionResult> AddTeacher(Teacher teacher) => Ok(await classroomService.AddTeacher(teacher));
	}
}
