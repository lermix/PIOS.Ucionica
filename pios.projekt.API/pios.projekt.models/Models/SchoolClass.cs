using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.models.Models
{
    public class SchoolClass
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public List<Student> students { get; set; } = new List<Student>();
        public List<TimetableRow> timetableRows { get; set; } = new List<TimetableRow>();

    }
}
