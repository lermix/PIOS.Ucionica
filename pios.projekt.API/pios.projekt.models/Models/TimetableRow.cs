namespace pios.projekt.models.Models
{
    public class TimetableRow
    {
        public int Id { get; set; }
		public int ClassroomId { get; set; }
		public int FromHour { get; set; }
        public int ToHour { get; set; }
        public Subject Monday { get; set; }
        public Subject Tuesday { get; set; }
        public Subject Wednesday { get; set; }
        public Subject Thursday { get; set; }
        public Subject Friday { get; set; }
    }
}
