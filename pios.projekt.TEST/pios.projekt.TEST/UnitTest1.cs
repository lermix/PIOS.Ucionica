using Newtonsoft.Json;
using NUnit.Framework;
using pios.projekt.models.Models;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.TEST
{
	public class Tests
	{

		[Test]
		public void GetStudentsTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri( "https://localhost:44354/api/Classroom/" );
			client.DefaultRequestHeaders.Accept.Add( new MediaTypeWithQualityHeaderValue( "application/json" ) );


			var response = client.GetAsync( "GetStudents" ).Result;
			Console.WriteLine( response.StatusCode );
			Assert.AreEqual( HttpStatusCode.OK, response.StatusCode );
		}

		[Test]
		public void AddAndDeleteStudentTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri( "https://localhost:44354/api/Classroom/" );
			client.DefaultRequestHeaders.Accept.Add( new MediaTypeWithQualityHeaderValue( "application/json" ) );


			Student student = new Student
			{
				Id = -10,
				Name = "Test",
				subjects = new List<Subject>(),
				Surname = "test",
			};

			HttpContent content = new StringContent( JsonConvert.SerializeObject( student ), Encoding.UTF8, "application/json" );			
			var response = client.PostAsync( "AddStudent", content ).Result;			
			Assert.AreEqual( HttpStatusCode.OK, response.StatusCode );			
			Assert.AreEqual( JsonConvert.SerializeObject(student).ToLower(), response.Content.ReadAsStringAsync().Result.ToLower());


			response = client.PostAsync( $"DeleteStudent?studentId={-10}", new StringContent( "" ) ).Result;
			Assert.AreEqual( HttpStatusCode.OK, response.StatusCode );
			Assert.AreEqual( 1, Convert.ToInt32(response.Content.ReadAsStringAsync().Result) );

		}


		[Test]
		public void GetExamsTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			var response = client.GetAsync("GetExams").Result;
			Console.WriteLine(response.StatusCode);
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
		}

		[Test]
		public void AddAndDeleteExamTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			Exam exam = new Exam
			{
				Id = -10,
				Name = "Test",
				Students = new List<Student>(),
				Teacher= new Teacher(),
				Subject = new Subject(),
				Date = new DateTime(),
				Questions = new List<Question>(),
			};

			HttpContent content = new StringContent(JsonConvert.SerializeObject(exam), Encoding.UTF8, "application/json");
			var response = client.PostAsync("AddExam", content).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(JsonConvert.SerializeObject(exam).ToLower(), response.Content.ReadAsStringAsync().Result.ToLower());


			response = client.PostAsync($"DeleteExam?examId={-10}", new StringContent("")).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(1, Convert.ToInt32(response.Content.ReadAsStringAsync().Result));

		}

		[Test]
		public void GetExamResultTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			var response = client.GetAsync("GetExamResult").Result;
			Console.WriteLine(response.StatusCode);
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
		}

		[Test]
		public void AddAndDeleteExamResultTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			ExamResult examResult = new ExamResult
			{
				Id = -10,
				studentId = -10,
				examId=-10,
				NumOfCorrectAnswers = 1,
			};

			HttpContent content = new StringContent(JsonConvert.SerializeObject(examResult), Encoding.UTF8, "application/json");
			var response = client.PostAsync("AddExamResult", content).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(JsonConvert.SerializeObject(examResult).ToLower(), response.Content.ReadAsStringAsync().Result.ToLower());


			response = client.PostAsync($"DeleteExamResult?examResultId={-10}", new StringContent("")).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(1, Convert.ToInt32(response.Content.ReadAsStringAsync().Result));

		}

		[Test]
		public void GetQuestionTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri( "https://localhost:44354/api/Classroom/" );
			client.DefaultRequestHeaders.Accept.Add( new MediaTypeWithQualityHeaderValue( "application/json" ) );


			var response = client.GetAsync( "GetQuestions" ).Result;
			Console.WriteLine( response.StatusCode );
			Assert.AreEqual( HttpStatusCode.OK, response.StatusCode );
		}

		[Test]
		public void AddAndDeleteSQuestionTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri( "https://localhost:44354/api/Classroom/" );
			client.DefaultRequestHeaders.Accept.Add( new MediaTypeWithQualityHeaderValue( "application/json" ) );


			Question question = new Question
			{
				Id = -10,
				ExamId = -10,
				Name = "Test",
				ExamQuestion = "Test",
				possibleAnswers = new List<KeyValue>(),
				CorrectAnswer = 1,
			};

			HttpContent content = new StringContent( JsonConvert.SerializeObject( question ), Encoding.UTF8, "application/json" );			
			var response = client.PostAsync( "AddQuestion", content ).Result;			
			Assert.AreEqual( HttpStatusCode.OK, response.StatusCode );			
			Assert.AreEqual( JsonConvert.SerializeObject(question).ToLower(), response.Content.ReadAsStringAsync().Result.ToLower());


			response = client.PostAsync( $"DeleteSQuestion?questionId={-10}", new StringContent( "" ) ).Result;
			Assert.AreEqual( HttpStatusCode.OK, response.StatusCode );
			Assert.AreEqual( 1, Convert.ToInt32(response.Content.ReadAsStringAsync().Result) );

		}

		[Test]
		public void GetSchoolClassesTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			var response = client.GetAsync("GetSchoolClasses").Result;
			Console.WriteLine(response.StatusCode);
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
		}

		[Test]
		public void AddAndDeleteSchoolClassTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			SchoolClass schoolClass = new SchoolClass
			{
				Id = -10,
				Name = "Test",
				students = new List<Student>(),
				timetableRow = new List<TimetableRow>(),
			};

			HttpContent content = new StringContent(JsonConvert.SerializeObject(schoolClass), Encoding.UTF8, "application/json");
			var response = client.PostAsync("AddSchoolClass", content).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(JsonConvert.SerializeObject(schoolClass).ToLower(), response.Content.ReadAsStringAsync().Result.ToLower());


			response = client.PostAsync($"DeleteSchoolClass?schoolClassId={-10}", new StringContent("")).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(1, Convert.ToInt32(response.Content.ReadAsStringAsync().Result));

		}

		[Test]
		public void GetSubjectsTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			var response = client.GetAsync("Getubjects").Result;
			Console.WriteLine(response.StatusCode);
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
		}

		[Test]
		public void AddAndDeleteSubjectTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			Subject subject = new Subject
			{
				Id = -10,
				Name = "Test",
				studentsOnSubject = new List<Student>(),
				teachersTeachingSubject = new List<Teacher>(),
			};

			HttpContent content = new StringContent(JsonConvert.SerializeObject(subject), Encoding.UTF8, "application/json");
			var response = client.PostAsync("AddSubject", content).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(JsonConvert.SerializeObject(subject).ToLower(), response.Content.ReadAsStringAsync().Result.ToLower());


			response = client.PostAsync($"DeleteSubject?subjectId={-10}", new StringContent("")).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(1, Convert.ToInt32(response.Content.ReadAsStringAsync().Result));

		}

		[Test]
		public void GetTeachersTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			var response = client.GetAsync("GetTeachers").Result;
			Console.WriteLine(response.StatusCode);
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
		}

		[Test]
		public void AddAndDeleteTeacherTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			Teacher teacher = new Teacher
			{
				Id = -10,
				Name = "Test",
				Surname = "Test",
				subjects = new List<Subject>(),
				schoolClasses = new List<TiSchoolClass>(),
			};

			HttpContent content = new StringContent(JsonConvert.SerializeObject(teacher), Encoding.UTF8, "application/json");
			var response = client.PostAsync("AddTeacher", content).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(JsonConvert.SerializeObject(teacher).ToLower(), response.Content.ReadAsStringAsync().Result.ToLower());


			response = client.PostAsync($"DeleteTeacher?teacherId={-10}", new StringContent("")).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(1, Convert.ToInt32(response.Content.ReadAsStringAsync().Result));

		}

		[Test]
		public void GetTimetableRowsTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			var response = client.GetAsync("GetTimetableRows").Result;
			Console.WriteLine(response.StatusCode);
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
		}

		[Test]
		public void AddAndDeleteTimetableRowTest()
		{
			HttpClient client = new HttpClient();
			client.BaseAddress = new Uri("https://localhost:44354/api/Classroom/");
			client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


			TimetableRow timetableRow = new TimetableRow
			{
				Id = -10,
				FromHour = 8,
				ToHour = 9,
				Monday = new TimetableItem(),
				Tuesday = new TimetableItem(),
				Wednesday = new TimetableItem(),
				Thursday = new TimetableItem(),
				Friday = new TimetableItem(),
			};

			HttpContent content = new StringContent(JsonConvert.SerializeObject(timetableRow), Encoding.UTF8, "application/json");
			var response = client.PostAsync("AddTimetableRow", content).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(JsonConvert.SerializeObject(timetableRow).ToLower(), response.Content.ReadAsStringAsync().Result.ToLower());


			response = client.PostAsync($"DeleteTimetableRow?timetableRowId={-10}", new StringContent("")).Result;
			Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);
			Assert.AreEqual(1, Convert.ToInt32(response.Content.ReadAsStringAsync().Result));

		}







	}
}