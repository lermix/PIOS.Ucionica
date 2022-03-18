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
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ClassroomController : ControllerBase
    {
        private IClassroomService classroomService;

        public ClassroomController(IClassroomService classroomService)
        {
            this.classroomService = classroomService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStudents() => Ok(await classroomService.GetStudents());

        [HttpPost]
        public async Task<IActionResult> AddStudent(Student student) => Ok(await classroomService.AddStudent(student)); 

        [HttpGet]
        public async Task<IActionResult> GetTeachers() => throw new NotImplementedException();

        [HttpPost]
        public async Task<IActionResult> AddTeacher(Teacher teacher) => Ok(await classroomService.AddTeacher(teacher));

        [HttpGet]
        public async Task<IActionResult> GetClasses() => throw new NotImplementedException();

        [HttpPost]
        public async Task<IActionResult> AddClass(SchoolClass schoolClass) => throw new NotImplementedException();

        [HttpGet]
        public async Task<IActionResult> GetSubjects() => throw new NotImplementedException();

        [HttpPost]
        public async Task<IActionResult> AddSubject(Subject subject) => throw new NotImplementedException();

        [HttpGet]
        public async Task<IActionResult> AddSubjectToTecher(Teacher teacher, Subject subject) => throw new NotImplementedException();

        [HttpPost]
        public async Task<IActionResult> AddStudentInClass(Student student, SchoolClass schoolClass) => throw new NotImplementedException();
    }
}
