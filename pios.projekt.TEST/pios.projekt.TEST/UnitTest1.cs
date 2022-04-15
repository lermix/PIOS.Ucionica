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



	}
}