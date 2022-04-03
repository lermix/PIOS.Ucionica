namespace pios.projekt.models.Models
{
    public class TimetableRow
    {
        public int Id { get; set; }
		public int FromHour { get; set; }
        public int ToHour { get; set; }
        public TimetableItem Monday { get; set; }
        public TimetableItem Tuesday { get; set; }
        public TimetableItem Wednesday { get; set; }
        public TimetableItem Thursday { get; set; }
        public TimetableItem Friday { get; set; }
    }
}
