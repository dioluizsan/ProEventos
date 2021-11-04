using System.ComponentModel.DataAnnotations;

namespace ProEventos.Application.Dtos
{
    public class EventoDto
    {
        public int Id { get; set; }
        public string Local { get; set; }
       
        public string DataEvento { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [MinLength(3,ErrorMessage = "O campo {0} deve ter no minimo 4 caracteres.")]
        [MaxLength(50,ErrorMessage = "O campo {0} deve ter no maximo 50 caracteres.")]
        // alternativa para as duas linhas acima
        //[StringLength(50,MinLength =3,ErrorMessage = "O campo {0} deve ter entre 3 a 50 caracteres.")]
        public string Tema { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [Display(Name = "Quantidade de Pessoas")]
        [Range(1, 120000, ErrorMessage ="{0} deve ser entre 1 e 120000")]
        public int QtdPessoas { get; set; }
        
        [RegularExpression(@".*\.(gif|jpe?g|bmp|png)$",
                            ErrorMessage ="Não é uma imagem válida. (gif, jpg, jpe, bmp ou png) ")]
        public string ImagemURL { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [Phone(ErrorMessage ="O numero de {0} é inválido.")]
        public string Telefone { get; set; }

        [Required(ErrorMessage = "O campo {0} é obrigatório")]
        [Display(Name = "e-mail")]
        [EmailAddress(ErrorMessage ="O endereço de {0} é invalido")]
        public string Email { get; set; }
    }
}