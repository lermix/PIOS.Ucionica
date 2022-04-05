using pios.projekt.DAL.Datatabse;
using pios.projekt.models.Inteface;
using pios.projekt.models.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using MongoDB.Driver.Linq;
using MongoDB.Driver;

namespace pios.projekt.DAL
{
	public class ClassroomRepository : IClassroomRepository
	{
		private IClassroomContext context;

		public ClassroomRepository(IClassroomContext context)
		{
			this.context = context;
		}

		public async Task<Student> AddStudent(Student student)
		{
			ReplaceOneResult result;
			switch ( context.students.Find( x => x.Id == student.Id ).CountDocuments() )
			{
				case 0:
					await context.students.InsertOneAsync( student );
					break;
				case 1:
					var filter = Builders<Student>.Filter.Eq( "_id", student.Id );
					result = await context.students.ReplaceOneAsync( filter, student );
					break;
				default:
					throw new Exception( "Multiple processes with same ID found" );
			}

			return await Task.FromResult( student );
		}

		public async Task<Teacher> AddTeacher(Teacher teacher)
		{

			ReplaceOneResult result;
			switch ( context.teachers.Find( x => x.Id == teacher.Id ).CountDocuments() )
			{
				case 0:
					await context.teachers.InsertOneAsync( teacher );
					break;
				case 1:
					var filter = Builders<Teacher>.Filter.Eq( "_id", teacher.Id );
					result = await context.teachers.ReplaceOneAsync( filter, teacher );
					break;
				default:
					throw new Exception( "Multiple processes with same ID found" );
			}

			return await Task.FromResult( teacher );
		}

		public async Task<List<Student>> GetStudents() => await context.students.AsQueryable().ToListAsync();

		public async Task<SchoolClass> AddSchoolClass(SchoolClass schoolClass)
		{

			ReplaceOneResult result;
			switch ( context.schoolClasses.Find( x => x.Id == schoolClass.Id ).CountDocuments() )
			{
				case 0:
					await context.schoolClasses.InsertOneAsync( schoolClass );
					break;
				case 1:
					var filter = Builders<SchoolClass>.Filter.Eq( "_id", schoolClass.Id );
					result = await context.schoolClasses.ReplaceOneAsync( filter, schoolClass );
					break;
				default:
					throw new Exception( "Multiple processes with same ID found" );
			}

			return await Task.FromResult( schoolClass );
		}



		public async Task<SchoolClass> PutStudentsInClass(List<Student> students, int schoolclassId)
		{

			SchoolClass schoolClass1 = context.schoolClasses.AsQueryable().FirstOrDefault( x => x.Id == schoolclassId );
			if ( schoolClass1 == null )
			{
				return null;
			}
			schoolClass1.students.AddRange( students );
			await AddSchoolClass( schoolClass1 );
			return await Task.FromResult( schoolClass1 );

		}

		public async Task<Subject> AddSubjects(Subject subjects)
		{
			ReplaceOneResult result;
			switch ( context.subjects.Find( x => x.Id == subjects.Id ).CountDocuments() )
			{
				case 0:
					await context.subjects.InsertOneAsync( subjects );
					break;
				case 1:
					var filter = Builders<Subject>.Filter.Eq( "_id", subjects.Id.ToString() );
					result = await context.subjects.ReplaceOneAsync( filter, subjects );
					break;
				default:
					throw new Exception( "Multiple processes with same ID found" );
			}

			return await Task.FromResult( subjects );
		}

		public async Task<Student> AddSubjectsToStudent(List<Subject> subjects, int studentId)
		{
			Student student = context.students.AsQueryable().FirstOrDefault( x => x.Id == studentId );
			if ( student == null )
			{
				return null;
			}
			student.subjects.AddRange( subjects );
			return await Task.FromResult( student );
		}

		public async Task<Teacher> AddSchoolclassesToTeacher(List<SchoolClass> schoolClasses, int teacherId)
		{
			Teacher teacher = context.teachers.AsQueryable().FirstOrDefault( x => x.Id == teacherId );
			if ( teacher == null )
			{
				return null;
			}
			teacher.schoolClasses.AddRange( schoolClasses );
			return await Task.FromResult( teacher );
		}

		public async Task<Student> DeleteSubjectFromStudent(int studentId, int subjectId)
		{
			Student student = context.students.AsQueryable().FirstOrDefault( x => x.Id == studentId );
			if ( student == null )
			{
				return null;
			}
			foreach ( Subject subject in student.subjects )
			{
				if ( subject.Id == subjectId )
				{
					student.subjects.Remove( subject );
				}
			}

			//student.subjects = student.subjects.where(x => x.Id != subjectId);            
			return await Task.FromResult( student );
		}

		public async Task<SchoolClass> DeleteStudentFromSchoolclass(int studentId, int schoolClassId)
		{
			SchoolClass schoolClass = context.schoolClasses.AsQueryable().FirstOrDefault( x => x.Id == schoolClassId );

			if ( schoolClass == null )
			{
				return null;
			}
			foreach ( Student student in schoolClass.students )
			{
				if ( student.Id == studentId )
				{
					schoolClass.students.Remove( student );
				}
			}

			//student.subjects = student.subjects.where(x => x.Id != subjectId);            
			return await Task.FromResult( schoolClass );
		}

		public async Task<List<SchoolClass>> GetSchoolClasses() => await context.schoolClasses.AsQueryable().ToListAsync();

		public async Task<List<Subject>> GetSubjects() => await context.subjects.AsQueryable().ToListAsync();

		public async Task<List<Teacher>> GetTeachers() => await context.teachers.AsQueryable().ToListAsync();

		public async Task<List<Subject>> GetStudentsSubjects(int studentId)
		{
			List<Subject> listOfSubjects = new List<Subject>();
			Student student = context.students.AsQueryable().FirstOrDefault( x => x.Id == studentId );
			if ( student == null )
			{
				return null;
			}
			foreach ( Subject subject in student.subjects )
			{
				listOfSubjects.Add( subject );
			}
			return await Task.FromResult( listOfSubjects );
		}

		public async Task<Teacher> AddSubjectsToTeacher(List<Subject> subjects, int teacherId)
		{
			Teacher teacher = context.teachers.AsQueryable().FirstOrDefault( x => x.Id == teacherId );
			if ( teacher == null )
			{
				return null;
			}
			foreach ( Subject subject in subjects )
			{
				teacher.subjects.Add( subject );
			}

			return await Task.FromResult( teacher );

		}

		public Task<TimetableRow> AddTimetableRow(TimetableRow timetableRow, int classroomId)
		{
			//var filter = Builders<SchoolClass>.Filter.Eq( "",  );
			//context.schoolClasses.fin
			return Task.FromResult( timetableRow );
		}

		public Task<TimetableRow> DeleteTimetableRow(TimetableRow timetableRow, int classroomId)
		{
			//var filter = Builders<SchoolClass>.Filter.Eq( "",  );

			//context.timetableRow.DeleteOne( filter );
			return Task.FromResult( timetableRow );
		}

		public Task<int> DeleteClassroom(int classroomId) => Task.FromResult( (int) context.schoolClasses.DeleteOne( Builders<SchoolClass>.Filter.Eq( "_id", classroomId ) ).DeletedCount );

		public Task<int> DeleteStudent(int studentId)
		{
			List<SchoolClass> schoolClasses = context.schoolClasses.AsQueryable().Where( e => e.students.Any( s => s.Id == studentId ) ).ToList();
			schoolClasses.ForEach( e => e.students = e.students.Where( s => s.Id != studentId ).ToList() );
			foreach ( SchoolClass schoolClass in schoolClasses )
				context.schoolClasses.ReplaceOne( Builders<SchoolClass>.Filter.Eq( "_id", schoolClass.Id ), schoolClass );

			return Task.FromResult( (int) context.students.DeleteOne( Builders<Student>.Filter.Eq( "_id", studentId ) ).DeletedCount ); 
		}

		public Task<int> DeleteSubject(int subjectId)
		{
			List<Teacher> teachers = context.teachers.AsQueryable().Where( e => e.subjects.Any( s => s.Id == subjectId ) ).ToList();
			teachers.ForEach( e => e.subjects = e.subjects.Where( s => s.Id != subjectId ).ToList() );
			foreach ( Teacher teacher in teachers )
				context.teachers.ReplaceOne( Builders<Teacher>.Filter.Eq( "_id", teacher.Id ), teacher );

			return Task.FromResult( (int) context.subjects.DeleteOne( Builders<Subject>.Filter.Eq( "_id", subjectId ) ).DeletedCount );
		}

		public Task<int> DeleteTeacher(int teacherId) => Task.FromResult( (int) context.teachers.DeleteOne( Builders<Teacher>.Filter.Eq( "_id", teacherId ) ).DeletedCount );
	}
}
