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

        public IMongoCollection<Subject> subjects { get; }
        public IMongoCollection<TimetableRow> timetableRow { get; }

        public IMongoCollection <Exam> exams { get; }

        public IMongoCollection<Question> questions { get; }

        public IMongoCollection<ExamResult> examResults { get; }


        public ClassroomContext(ILogger<ClassroomContext> logger, IOptions<ContextSettings> settings)
        {
            MongoClient client = null;
            if (settings.Value.MongoClientSettings != null)
                client = new MongoClient(settings.Value.MongoClientSettings);
            else
                client = new MongoClient(settings.Value.ConnectionString);

            if (client != null)
            {
                database = client.GetDatabase(settings.Value.Database);
                if (database != null)
                {
                    students = database.GetCollection<Student>("Students");
                    teachers = database.GetCollection<Teacher>("Teachers");
                    schoolClasses = database.GetCollection<SchoolClass>("Classrooms");
                    subjects = database.GetCollection<Subject>("Subjects");
                    timetableRow = database.GetCollection<TimetableRow>("TimetableRows");
                    exams = database.GetCollection<Exam>("Exams");
                    questions = database.GetCollection<Question>("Questions");
                    examResults = database.GetCollection<ExamResult>("ExamResults");
                }
            }

            this.logger = logger;
        }

        public async Task InitializeIndexes()
        {
            if (students != null)
            {
                var uniqueIndexModel = new CreateIndexModel<Student>(
                    Builders<Student>.IndexKeys.Combine(
                        Builders<Student>.IndexKeys.Descending(x => x.Id)),
                new CreateIndexOptions<Student>() { Unique = true });
                try
                {
                    await students.Indexes.CreateOneAsync(uniqueIndexModel);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, ex.Message);
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

            if (subjects != null)
            {
                var uniqueIndexModel = new CreateIndexModel<Subject>(
                    Builders<Subject>.IndexKeys.Combine(
                        Builders<Subject>.IndexKeys.Descending(x => x.Id)),
                new CreateIndexOptions<Subject>() { Unique = true });
                try
                {
                    await subjects.Indexes.CreateOneAsync(uniqueIndexModel);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, ex.Message);
                }
            }

            if ( timetableRow != null )
            {
                var uniqueIndexModel = new CreateIndexModel<TimetableRow>(
                    Builders<TimetableRow>.IndexKeys.Combine(
                        Builders<TimetableRow>.IndexKeys.Descending( x => x.Id ) ),
                new CreateIndexOptions<TimetableRow>() { Unique = true } );
                try
                {
                    await timetableRow.Indexes.CreateOneAsync( uniqueIndexModel );
                }
                catch ( Exception ex )
                {
                    logger.LogError( ex, ex.Message );
                }
            }
            if (exams != null)
            {
                var uniqueIndexModel = new CreateIndexModel<Exam>(
                    Builders<Exam>.IndexKeys.Combine(
                        Builders<Exam>.IndexKeys.Descending(x => x.Id)),
                new CreateIndexOptions<Exam>() { Unique = true });
                try
                {
                    await exams.Indexes.CreateOneAsync(uniqueIndexModel);
                }
                catch (Exception ex)
                {
                    logger.LogError(ex, ex.Message);
                }
            }

        }
    }
}
