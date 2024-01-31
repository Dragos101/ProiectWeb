using Microsoft.AspNetCore.Mvc;
using mir_backend.Data;
using Newtonsoft.Json;
using System.Xml.Linq;


namespace mir_backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MigrationController : Controller
    {
        private readonly MigrationDbContext _db;
        public MigrationController(MigrationDbContext context)
        {
            _db = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var sparqlQuery = @"
            PREFIX ex: <http://www.semanticweb.org/web-proj/MIR#>
            SELECT ?migration ?working ?thumbnailUrl ?politicFactors ?migrationDescription ?calamity ?longitude ?latitude ?category
            WHERE {
              ?migration a ex:Migration ;
                         ex:hasContext ?context ;
                         ex:hasLocation ?location ;
                         ex:hasType ?type .
             
              ?context ex:working ?working ;
                       ex:thumbnailUrl ?thumbnailUrl ;
                       ex:politicFactors ?politicFactors ;
                       ex:description ?migrationDescription ;
                       ex:calamity ?calamity .
           
              ?location ex:longitude ?longitude ;
                        ex:latitude ?latitude .
            
              ?type ex:category ?category .
            }";
            var xmlResult = await _db.ExecuteSparqlQueryAsync(sparqlQuery);

            // Parse the XML result
            var doc = XDocument.Parse(xmlResult);
            XNamespace ns = "http://www.w3.org/2005/sparql-results#";

            var migrations = doc.Descendants(ns + "result").Select(result => new
            {
                MigrationDescription = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "migrationDescription")?.Element(ns + "literal")?.Value,
                Calamity = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "calamity")?.Element(ns + "literal")?.Value,
                Latitude = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "latitude")?.Element(ns + "literal")?.Value,
                MigrationUri = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "migration")?.Element(ns + "uri")?.Value,
                Working = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "working")?.Element(ns + "literal")?.Value,
                PoliticFactors = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "politicFactors")?.Element(ns + "literal")?.Value,
                Category = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "category")?.Element(ns + "literal")?.Value,
                ThumbnailUrl = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "thumbnailUrl")?.Element(ns + "literal")?.Value,
                Longitude = result.Elements(ns + "binding").FirstOrDefault(e => e.Attribute("name")?.Value == "longitude")?.Element(ns + "literal")?.Value,
            }).ToList();

            // Convert the list of objects to JSON
            var json = JsonConvert.SerializeObject(migrations, Formatting.Indented);

            return Ok(json);
        }
    }
}
