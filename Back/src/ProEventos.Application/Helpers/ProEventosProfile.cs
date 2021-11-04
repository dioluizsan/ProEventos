using AutoMapper;
using ProEventos.Application.Dtos;
using ProEventos.Domain;

namespace ProEventos.Application.Helpers
{
    public class ProEventosProfile :Profile
    {
        public ProEventosProfile()
        {
            CreateMap<Evento,EventoDto>().ReverseMap();
            //Linha de cima substitue as 2 linhas abaixo
            //CreateMap<Evento,EventoDto>();
            //CreateMap<EventoDto,Evento>();
        }
    }
}