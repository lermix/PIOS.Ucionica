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

		#region Students

		[HttpGet]
        public async Task<IActionResult> GetStudents() => Ok(await classroomService.GetStudents());
        [HttpPost]
        public async Task<IActionResult> AddStudent(Student student) => Ok(await classroomService.AddStudent(student));
        [HttpPost]
        public async Task<IActionResult> DeleteStudent([FromQuery] int studentId) => Ok( await classroomService.DeleteStudent( studentId ) );

        #endregion

        #region Teacher

        [HttpGet]
        public async Task<IActionResult> GetTeachers() => Ok( await classroomService.GetTeachers() );
        [HttpPost]
        public async Task<IActionResult> AddTeacher(Teacher teacher) => Ok( await classroomService.AddTeacher( teacher ) );
        [HttpPost]
        public async Task<IActionResult> DeleteTeacher([FromQuery] int teacherId) => Ok( await classroomService.DeleteTeacher( teacherId ) );

        #endregion

        #region SchoolClass

        [HttpGet]
        public async Task<IActionResult> GetSchoolClasses() => Ok( await classroomService.GetSchoolClasses() );
        [HttpPost]
        public async Task<IActionResult> AddClass(SchoolClass schoolClass) => Ok( await classroomService.AddSchoolClass( schoolClass ) );
        [HttpPost]
        public async Task<IActionResult> DeleteClassroom([FromQuery] int classroomId) => Ok( await classroomService.DeleteClassroom( classroomId ) );

        #endregion

        #region Subjects

        [HttpGet]
        public async Task<IActionResult> GetSubjects() => Ok( await classroomService.GetSubjects() );
        [HttpPost]
        public async Task<IActionResult> AddSubject(Subject subject) => Ok( await classroomService.AddSubject( subject ) );
        [HttpPost]
        public async Task<IActionResult> DeleteSubject([FromQuery] int subjectId) => Ok( await classroomService.DeleteSubject( subjectId ) );

        #endregion

        #region Exams

        [HttpGet]
        public async Task<IActionResult> GetExams() => Ok( await classroomService.GetExams() );
        [HttpPost]
        public async Task<IActionResult> DeleteExam(int examId) => Ok( await classroomService.DeleteExam( examId ) );
        [HttpPost]
        public async Task<IActionResult> AddExam(Exam exam) => Ok( await classroomService.AddExam( exam ) );

        #endregion

        #region Questions

        [HttpGet]
        public async Task<IActionResult> GetQuestions() => Ok( await classroomService.GetQuestions() );
        [HttpPost]
        public async Task<IActionResult> AddQuestion(Question question) => Ok( await classroomService.AddQuestion( question ) );
        [HttpPost]
        public async Task<IActionResult> DeleteQuestion(int questionId) => Ok( await classroomService.DeleteQuestion( questionId ) );

        #endregion

        #region ExamResul

        [HttpGet]
        public async Task<IActionResult> GetExamResults() => Ok( await classroomService.GetExamResults() );
        [HttpPost]
        public async Task<IActionResult> AddExamResult(ExamResult examResult) => Ok( await classroomService.AddExamResult( examResult ) );
        [HttpPost]
        public async Task<IActionResult> DeleteExamResult(int examResultId) => Ok( await classroomService.DeleteExamResult( examResultId ) );

        #endregion

        #region Helper

        [HttpGet]
        public async Task<IActionResult> AddSubjectsToTeacher(List<Subject> subjects, int teacherId) => Ok( await classroomService.AddSubjectsToTeacher( subjects, teacherId ) );

        [HttpPost]
        public async Task<IActionResult> PutStudentsInClass(List<Student> students, int schoolclassId) => Ok( await classroomService.PutStudentsInClass( students, schoolclassId ) );

        [HttpPost]
        public async Task<IActionResult> AddSubjectsToStudent(List<Subject> subjects, int studentId) => Ok( await classroomService.AddSubjectsToStudent( subjects, studentId ) );

        [HttpPost]
        public async Task<IActionResult> AddSchoolclassesToTeacher(List<SchoolClass> schoolClasses, int teacherId) => Ok( await classroomService.AddSchoolclassesToTeacher( schoolClasses, teacherId ) );

        [HttpGet]
        public async Task<IActionResult> GetStudentsSubjects(int studentId) => Ok( await classroomService.GetStudentsSubjects( studentId ) );

        [HttpPost]
        public async Task<IActionResult> DeleteStudentFromSchoolclass(int studentId, int schoolClassId) => Ok( await classroomService.DeleteStudentFromSchoolclass( studentId, schoolClassId ) );

        [HttpPost]
        public async Task<IActionResult> DeleteSubjectFromStudent(int studentId, int subjectId) => Ok( await classroomService.DeleteSubjectFromStudent( studentId, subjectId ) );

        [HttpPost]
        public async Task<IActionResult> AddTimetableRow(TimetableRow timetableRow, int ClassroomId) => Ok( await classroomService.AddTimetableRow( timetableRow, ClassroomId ) );

        [HttpPost]
        public async Task<IActionResult> DeleteTimetableRow(TimetableRow timetableRow, int ClassroomId) => Ok( await classroomService.DeleteTimetableRow( timetableRow, ClassroomId ) );

        [HttpPost]
        public async Task<IActionResult> AddStudentsToExam(List<Student> students, int examId) => Ok( await classroomService.AddStudentsToExam( students, examId ) );

        #endregion







    }
}
