using System.Threading.Tasks;
using AutoMapper;
using ProEventos.Application.Contratos;
using ProEventos.Application.Dtos;
using ProEventos.Domain;
using ProEventos.Persistence;

namespace ProEventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IEventoPersist _eventoPersist;
        private readonly IMapper _mapper;
        public EventoService(IGeralPersist geralPersist, IEventoPersist eventoPersist,IMapper mapper)
        {
            _geralPersist = geralPersist;
            _eventoPersist = eventoPersist;
            _mapper = mapper;
            
        }
        public async Task<EventoDto> AddEvento(EventoDto model)
        {
            try
            {
                var evento = _mapper.Map<Evento>(model);

                 _geralPersist.Add<Evento>(evento);

                 if (await _geralPersist.SaveChangeAsync()){

                     var eventoRetorno = await _eventoPersist.GetEventoAsyncById(evento.Id,false);

                     return _mapper.Map<EventoDto>(eventoRetorno);
                 }
                 return null;
            }
            catch (System.Exception ex)
            {
                
                throw new System.Exception(ex.Message);
            }       
        }
        public async Task<EventoDto> UpdateEvento(int eventoId, EventoDto model)
        {
            try
            {
                 var evento = await _eventoPersist.GetEventoAsyncById(eventoId,false);
                 if (evento==null) return null;

                 model.Id = evento.Id;
                 
                 _mapper.Map(model,evento);

                 _geralPersist.Update<Evento>(evento);

                 if (await _geralPersist.SaveChangeAsync()){

                     var eventoRetorno = await _eventoPersist.GetEventoAsyncById(evento.Id,false);

                     return _mapper.Map<EventoDto>(eventoRetorno);
                 }
                 return null;
            }
            catch (System.Exception ex)
            {
                throw new System.Exception(ex.Message);
            }
        }

        public async Task<bool> DeleteEvento(int eventoId)
        {
           try
           {
               var evento =await _eventoPersist.GetEventoAsyncById(eventoId,false);
               if(evento==null) throw new System.Exception("Evento não encontrado!");
               _geralPersist.Delete<Evento>(evento);
               

               return await _geralPersist.SaveChangeAsync();
           }
           catch (System.Exception ex)
           {
               
               throw new System.Exception(ex.Message);
           }
        }

        public async Task<EventoDto[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            try
            {
                 var eventos =await _eventoPersist.GetAllEventosAsync(includePalestrantes);
                 if (eventos==null) throw new System.Exception("Eventos não encontrados!");

                 var resultado= _mapper.Map<EventoDto[]>(eventos);
                 return resultado;
            }
            catch (System.Exception ex)
            {
                
                throw new System.Exception(ex.Message);
            }
        }

        public async Task<EventoDto[]> GetAllEventosAsyncByTema(string tema, bool includePalestrantes = false)
        {
            try
            {
                 var eventos =await _eventoPersist.GetAllEventosAsyncByTema(tema, includePalestrantes);
                 var resultado= _mapper.Map<EventoDto[]>(eventos);
                 return resultado;
            }
            catch (System.Exception ex)
            {
                
                throw new System.Exception(ex.Message);
            }
        }

        public async Task<EventoDto> GetEventoAsyncById(int eventoId, bool includePalestrantes = false)
        {
            try
            {
                 var evento = await _eventoPersist.GetEventoAsyncById(eventoId, includePalestrantes);
                 if(evento ==null) return null;

                 var resultado= _mapper.Map<EventoDto>(evento);
                 return resultado;
            }
            catch (System.Exception ex)
            {
                
               throw new System.Exception(ex.Message);
            }
        }

        
    }
}