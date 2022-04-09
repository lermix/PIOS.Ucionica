using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace pios.projekt.models.Models
{
    public class Question
    {
        public int Id { get; set; }
        public int ExamId { get; set; }
        public string Name { get; set; }

        public string ExamQuestion { get; set; }

        public Dictionary<int, string> possibleAnswers { get; set; } = new Dictionary<int, string>();

        public int CorrectAnswer { get; set; }


    }
}
