using Microsoft.AspNetCore.Mvc;
using mir_backend.Data;
using mir_backend.Models.DTO;
using mir_backend.Repositories.Implementation;
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
        public async Task<IActionResult> GetAll()
        {
            var allMigrations = await this.migrationService.getAllAsync();

            // Parse the XML result
            var migrations = FromXmlToJson(allMigrations);

            // Convert the list of objects to JSON
            var json = JsonConvert.SerializeObject(migrations, Formatting.Indented);

            return Ok(json);
        }

        private List<MigrationResponseDto> FromXmlToJson(string allMigrations)
        {
            var doc = XDocument.Parse(allMigrations);
            XNamespace ns = "http://www.w3.org/2005/sparql-results#";

            var migrations = doc.Descendants(ns + "result").Select(result => new MigrationResponseDto
            {
                UserId = Guid.TryParse(result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "userId")?.Element(ns + "literal")?.Value, out Guid guid) ? guid : Guid.Empty,
                Description = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "migrationDescription")?.Element(ns + "literal")?.Value,
                Calamity = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "calamity")?.Element(ns + "literal")?.Value,
                Working = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "working")?.Element(ns + "literal")?.Value == "true" ? "Yes" : "No", // Adjust based on your Working property type
                PoliticFactors = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "politicFactors")?.Element(ns + "literal")?.Value,
                Category = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "category")?.Element(ns + "literal")?.Value,
                ThumbnailUrl = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "thumbnailUrl")?.Element(ns + "literal")?.Value,
                Season = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "season")?.Element(ns + "literal")?.Value,
                Longitude = float.TryParse(result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "longitude")?.Element(ns + "literal")?.Value, out float lon) ? lon : 0,
                Latitude = float.TryParse(result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "latitude")?.Element(ns + "literal")?.Value, out float lat) ? lat : 0
            }).ToList();

            return migrations;
        }

    }
}
