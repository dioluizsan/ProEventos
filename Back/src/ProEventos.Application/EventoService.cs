using System.Threading.Tasks;
using ProEventos.Application.Contratos;
using ProEventos.Domain;
using ProEventos.Persistence;

namespace ProEventos.Application
{
    public class EventoService : IEventoService
    {
        private readonly IGeralPersist _geralPersist;
        private readonly IEventoPersist _eventoPersist;
        public EventoService(IGeralPersist geralPersist, IEventoPersist eventoPersist)
        {
            _geralPersist = geralPersist;
            _eventoPersist = eventoPersist;
            
        }
        public async Task<Evento> AddEvento(Evento model)
        {
            try
            {
                 _geralPersist.Add<Evento>(model);

                 if (await _geralPersist.SaveChangeAsync()){

                     return await _eventoPersist.GetEventoAsyncById(model.Id,false);
                 }
                 return null;
            }
            catch (System.Exception ex)
            {
                
                throw new System.Exception(ex.Message);
            }       
        }
        public async Task<Evento> UpdateEvento(int eventoId, Evento model)
        {
            try
            {
                 var evento = await _eventoPersist.GetEventoAsyncById(eventoId,false);
                 if (evento==null) return null;

                 model.Id = eventoId;

                 _geralPersist.Update<Evento>(model);

                 if (await _geralPersist.SaveChangeAsync()){
                     return await _eventoPersist.GetEventoAsyncById(model.Id,false);
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

        public Task<Evento[]> GetAllEventosAsync(bool includePalestrantes = false)
        {
            throw new System.NotImplementedException();
        }

        public Task<Evento[]> GetAllEventosAsyncByTema(string tema, bool includePalestrantes = false)
        {
            throw new System.NotImplementedException();
        }

        public Task<Evento> GetEventoAsyncById(int EventoId, bool includePalestrantes = false)
        {
            throw new System.NotImplementedException();
        }

        
    }
}