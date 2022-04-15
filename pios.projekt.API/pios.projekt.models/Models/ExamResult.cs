namespace pios.projekt.models.Models
{
	public class ExamResult
	{
		public int Id { get; set; }
		public int studentId { get; set; }
		public int ExamId { get; set; }
		public int NumOfCorrectAnswers { get; set; }
	}
}
