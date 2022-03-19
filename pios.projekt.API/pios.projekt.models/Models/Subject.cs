using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.models.Models
{
    public class Subject
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Student> studentsOnSubject { get; set; }
        public List<Teacher> teachersTeachingSubject { get; set; }

    }
}
