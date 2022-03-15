using MongoDB.Driver;
using pios.projekt.models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Logging;

namespace pios.projekt.DAL.Datatabse
{
	public class ClassroomContext : IClassroomContext
	{
		private readonly IMongoDatabase database = null;
		private readonly ILogger<ClassroomContext> logger;

		public IMongoCollection<Student> students { get; }

        public IMongoCollection<Teacher> teachers { get; }

		public IMongoCollection<SchoolClass> schoolClasses { get; }

		public ClassroomContext(ILogger<ClassroomContext> logger, IOptions<ContextSettings> settings)
		{
			MongoClient client = null;
			if ( settings.Value.MongoClientSettings != null )
				client = new MongoClient( settings.Value.MongoClientSettings );
			else
				client = new MongoClient( settings.Value.ConnectionString );

			if ( client != null )
			{
				database = client.GetDatabase( settings.Value.Database );
				if ( database != null )
				{
					students = database.GetCollection<Student>( "Students" );
					
				}
			}

			this.logger = logger;
		}

		public async Task InitializeIndexes()
		{
			if ( students != null )
			{
				var uniqueIndexModel = new CreateIndexModel<Student>(
					Builders<Student>.IndexKeys.Combine(
						Builders<Student>.IndexKeys.Descending( x => x.Id ) ),
				new CreateIndexOptions<Student>() { Unique = true } );
				try
				{
					await students.Indexes.CreateOneAsync( uniqueIndexModel );
				}
				catch ( Exception ex )
				{
					logger.LogError( ex, ex.Message );
				}
			}

			if (teachers != null)
			{
				var uniqueIndexModel = new CreateIndexModel<Teacher>(
					Builders<Teacher>.IndexKeys.Combine(
						Builders<Teacher>.IndexKeys.Descending(x => x.Id)),
				new CreateIndexOptions<Teacher>() { Unique = true });
				try
				{
					await teachers.Indexes.CreateOneAsync(uniqueIndexModel);
				}
				catch (Exception ex)
				{
					logger.LogError(ex, ex.Message);
				}
			}

			if (schoolClasses != null)
			{
				var uniqueIndexModel = new CreateIndexModel<SchoolClass>(
					Builders<SchoolClass>.IndexKeys.Combine(
						Builders<SchoolClass>.IndexKeys.Descending(x => x.Id)),
				new CreateIndexOptions<SchoolClass>() { Unique = true });
				try
				{
					await schoolClasses.Indexes.CreateOneAsync(uniqueIndexModel);
				}
				catch (Exception ex)
				{
					logger.LogError(ex, ex.Message);
				}
			}



		}
	}
}
