using Azure.Core;
using Microsoft.AspNetCore.Mvc;
using mir_backend.Models.DTO;
using mir_backend.Repositories.Interface;
using Newtonsoft.Json;
using System.Xml.Linq;


namespace mir_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MigrationController : Controller
    {
        private readonly IMigrationRepository migrationService;

        public MigrationController(IMigrationRepository migrationService)
        {
            this.migrationService = migrationService;
        }

        [HttpGet]
        [Route("/migrations")]
        public async Task<IActionResult> GetAll()
        {
            var allMigrations = await this.migrationService.getAllAsync();

            // Parse the XML result
            var migrations = FromXmlToJson(allMigrations);

            // Convert the list of objects to JSON
            var json = JsonConvert.SerializeObject(migrations, Formatting.Indented);

            return Ok(json);
        }

        [HttpGet]
        [Route("/user/{userId}/migrations")]
        public async Task<IActionResult> GetAllMigrationsForUser([FromRoute] Guid userId)
        {
            var allMigrations = await this.migrationService.getUserMigrations(userId);

            var migrations = FromXmlToJson(allMigrations);

            var json = JsonConvert.SerializeObject(migrations, Formatting.Indented);
            
            return Ok(json);
        }

        [HttpDelete]
        [Route("/migration/{migrationId}")]
        public async Task<IActionResult> DestroyMigration([FromRoute] Guid migrationId)
        {
            try
            {
                var result = await this.migrationService.deleteMigration(migrationId);

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost]
        [Route("/migration")]
        public async Task<IActionResult> CreateMigration([FromBody] MigrationRequestDto request)
        {
            // manipulate obj to create migration + other relationships
            var newMigrationLocation = new MigrationLocationDto()
            {
                Id = Guid.NewGuid(),
                Latitude = request.Latitude,
                Longitude = request.Longitude,
                City = request.City,
                Country = request.Country
            };

            var newMigrationType = new MigrationTypeDto()
            {
                Id = Guid.NewGuid(),
                Category = request.Category,
            };

            var newMigrationContex = new MigrationContextDto()
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                PoliticFactors = request.PoliticFactors,
                Calamity = request.Calamity,
                Description = request.Description,
                Season = request.Season,
                Working = request.Working,
                ThumbnailUri = request.ThumbnailUrl
            };

            var newMigration = new MigrationDto()
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                MigrationContextId = newMigrationContex.Id,
                MigrationLocationId = newMigrationLocation.Id,
                MigrationTypeId = newMigrationType.Id
            };


            // send to service to create
            try
            {
                var response = await migrationService.createMigration(newMigration, newMigrationContex, newMigrationType, newMigrationLocation);

                if (response != null)
                {
                    return Ok(response);
                }

                return BadRequest();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        
        [HttpGet]
        [Route("/migration/{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            // Fetch the migration from the backend using the id
            var migration = await migrationService.getByIdAsync(id);

            if (migration == null)
            {
                return NotFound();
            }

            // Parse the XML result
            var migrationJSON = FromXmlToJson(migration);
            
            // Convert the migration object to JSON
            var json = JsonConvert.SerializeObject(migrationJSON, Formatting.Indented);

            //JSON to the frontend
            return Ok(json);
        }

        [HttpPut]
        [Route("/migration/{id}")]
        public async Task<IActionResult> EditMigration([FromRoute]Guid id, [FromBody]MigrationRequestDto request){
            try{
                var result = await migrationService.updateMigration(id, request);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        private List<MigrationResponseDto> FromXmlToJson(string allMigrations)
        {
            var doc = XDocument.Parse(allMigrations);
            XNamespace ns = "http://www.w3.org/2005/sparql-results#";

            var migrations = doc.Descendants(ns + "result").Select(result => new MigrationResponseDto
            {
                Id = Guid.TryParse(result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "id")?.Element(ns + "literal")?.Value, out Guid id) ? id: Guid.Empty,
                UserId = Guid.TryParse(result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "userId")?.Element(ns + "literal")?.Value, out Guid guid) ? guid : Guid.Empty,
                Description = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "migrationDescription")?.Element(ns + "literal")?.Value,
                Name = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "name")?.Element(ns + "literal")?.Value,
                Calamity = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "calamity")?.Element(ns + "literal")?.Value,
                Working = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "working")?.Element(ns + "literal")?.Value == "true" ? "Yes" : "No", // Adjust based on your Working property type
                PoliticFactors = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "politicFactors")?.Element(ns + "literal")?.Value,
                Category = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "category")?.Element(ns + "literal")?.Value,
                ThumbnailUrl = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "thumbnailUrl")?.Element(ns + "literal")?.Value,
                Season = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "season")?.Element(ns + "literal")?.Value,
                Country = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "country")?.Element(ns + "literal")?.Value,
                City = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "city")?.Element(ns + "literal")?.Value,
                Longitude = float.TryParse(result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "longitude")?.Element(ns + "literal")?.Value, out float lon) ? lon : 0,
                Latitude = float.TryParse(result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "latitude")?.Element(ns + "literal")?.Value, out float lat) ? lat : 0
            }).ToList();

            return migrations;
        }

    }
}
