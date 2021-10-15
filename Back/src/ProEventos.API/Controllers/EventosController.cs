using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ProEventos.Persistence;
using ProEventos.Domain;
using ProEventos.Application.Contratos;
using Microsoft.AspNetCore.Http;


namespace ProEventos.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventosController : ControllerBase
    {
        private readonly IEventoService _eventoService; 

        public EventosController(IEventoService eventoService)
        {
            _eventoService = eventoService;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                var eventos = await _eventoService.GetAllEventosAsync(true);
                if(eventos==null) return NotFound("Nenhum evento encontrado!");
                return Ok(eventos);
            }
            catch (System.Exception ex)
            {
                
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar eventos. Erro:{ex.Message}");
            }
         
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
           try
           {
                var evento = await _eventoService.GetEventoAsyncById(id,true);
                if (evento == null) return NotFound("Evento não encontrado!");

                return Ok(evento);
           }
           catch (System.Exception ex)
            {
                
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar evento. Erro:{ex.Message}");
            }
        }

        [HttpGet("{tema}/tema")]
        public async Task<IActionResult> GetByTema(string tema)
        {
           try
           {
                var evento = await _eventoService.GetAllEventosAsyncByTema(tema,true);
                if (evento == null) return NotFound("Evento não encontrado!");

                return Ok(evento);
           }
          catch (System.Exception ex)
            {
                
               return this.StatusCode(StatusCodes.Status500InternalServerError,
                $"Erro ao tentar recuperar evento. Erro:{ex.Message}");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post(Evento model)
        {
            try
            {
                var evento = await _eventoService.AddEvento(model);
                if (evento==null) return BadRequest("Evento não adicionado!");

                return Ok(evento);
            }
            catch (System.Exception ex)
            {
                
                return this.BadRequest($"Erro ao tentar Adicionar evento. Erro:{ex.Message}");
            }
         
        }

        [HttpPut("(id)")]
        public async Task<IActionResult> Put(int id,Evento model)
        {
            
            try
            {
                 var evento = await _eventoService.UpdateEvento(id,model);
                 if(evento == null) return BadRequest("Erro ao tentar atualizar evento!");

                 return Ok(evento);

            }
            catch (System.Exception ex)
            {
                
                return this.BadRequest($"Erro ao tentar Atualizar evento. Erro:{ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id){
            try
            {
                 var evento =await _eventoService.DeleteEvento(id);
                if(evento)
                {
                    return Ok("Deletado");
                }
                else
                {
                    return BadRequest("Evento não deletado!");   
                }
            }
            catch (System.Exception ex)
            {
                
                return this.BadRequest($"Erro ao tentar deletar evento. Erro:{ex.Message}");
            }
            
        }

    }
}
